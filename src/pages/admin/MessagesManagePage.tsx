import { useState } from 'react'
import { Search, Eye, Trash2, Loader2, Mail, Phone, Building, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { useMessages, useMessagesMutations } from '@/hooks/useSupabase'
import type { Message } from '@/types/database'

export function MessagesManagePage() {
  const { data: messagesList, loading, refetch } = useMessages()
  const { update, remove, loading: mutating } = useMessagesMutations()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const filteredMessages = (messagesList || []).filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleMarkRead = async (id: string, isRead: boolean) => {
    try {
      await update(id, { is_read: !isRead })
      refetch()
    } catch (err) {
      console.error('更新失败:', err)
      alert('更新失败，请重试')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await remove(id)
      setDeleteConfirm(null)
      refetch()
    } catch (err) {
      console.error('删除失败:', err)
      alert('删除失败，请重试')
    }
  }

  const unreadCount = (messagesList || []).filter((m) => !m.is_read).length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">留言管理</h2>
          <p className="text-neutral-500">
            管理访客留言 {unreadCount > 0 && <span className="text-red-500">({unreadCount} 条未读)</span>}
          </p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="搜索留言..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <Card>
            <p className="text-center text-neutral-500 py-8">暂无留言</p>
          </Card>
        ) : (
          filteredMessages.map((message) => (
            <Card key={message.id} className={!message.is_read ? 'border-l-4 border-l-primary-500' : ''}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-neutral-900">{message.name}</h3>
                    {!message.is_read && (
                      <span className="px-2 py-0.5 text-xs bg-primary-500 text-white rounded-full">新</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-neutral-500 mb-3">
                    {message.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {message.phone}
                      </span>
                    )}
                    {message.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {message.email}
                      </span>
                    )}
                    {message.company && (
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {message.company}
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-700 line-clamp-2">{message.content}</p>
                  <p className="text-xs text-neutral-400 mt-2">
                    {new Date(message.created_at).toLocaleString('zh-CN')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedMessage(message)}
                    className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700"
                    title="查看详情"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMarkRead(message.id, message.is_read)}
                    className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-primary-500"
                    title={message.is_read ? '标记为未读' : '标记为已读'}
                  >
                    <Check className={`w-4 h-4 ${message.is_read ? 'text-green-500' : ''}`} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(message.id)}
                    className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-red-500"
                    title="删除"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title="留言详情"
        size="lg"
      >
        {selectedMessage && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-neutral-900">{selectedMessage.name}</h3>
              <span className="text-sm text-neutral-500">
                {new Date(selectedMessage.created_at).toLocaleString('zh-CN')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {selectedMessage.phone && (
                <div className="flex items-center gap-2 text-neutral-600">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span>{selectedMessage.phone}</span>
                </div>
              )}
              {selectedMessage.email && (
                <div className="flex items-center gap-2 text-neutral-600">
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <span>{selectedMessage.email}</span>
                </div>
              )}
              {selectedMessage.company && (
                <div className="flex items-center gap-2 text-neutral-600">
                  <Building className="w-4 h-4 text-neutral-400" />
                  <span>{selectedMessage.company}</span>
                </div>
              )}
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <h4 className="font-medium text-neutral-900 mb-2">留言内容</h4>
              <p className="text-neutral-700 whitespace-pre-wrap">{selectedMessage.content}</p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  handleMarkRead(selectedMessage.id, selectedMessage.is_read)
                  setSelectedMessage({ ...selectedMessage, is_read: !selectedMessage.is_read })
                }}
              >
                {selectedMessage.is_read ? '标记为未读' : '标记为已读'}
              </Button>
              <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                关闭
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="确认删除" size="sm">
        <p className="text-neutral-600">确定要删除这条留言吗？此操作无法撤销。</p>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
            取消
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            disabled={mutating}
          >
            {mutating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            确认删除
          </Button>
        </div>
      </Modal>
    </div>
  )
}