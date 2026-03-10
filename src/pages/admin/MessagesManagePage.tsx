import { useState } from 'react'
import { Search, Check, Trash2, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const mockMessages = [
  { id: '1', name: '张先生', phone: '13888888888', email: 'zhang@example.com', company: '某科技公司', content: '想了解贵公司的信息化咨询服务，请问可以提供详细的方案介绍吗？', isRead: false, date: '2024-03-15 10:30' },
  { id: '2', name: '李女士', phone: '13999999999', email: 'li@example.com', company: '某贸易公司', content: '请问可以提供定制化系统开发吗？我们公司需要一个ERP系统。', isRead: false, date: '2024-03-15 09:15' },
  { id: '3', name: '王经理', phone: '13666666666', email: 'wang@example.com', company: '某制造企业', content: '需要了解ERP系统升级服务，我们现有的系统已经使用5年了，需要升级改造。', isRead: true, date: '2024-03-14 16:45' },
  { id: '4', name: '陈总', phone: '13555555555', email: 'chen@example.com', company: '某金融公司', content: '我们公司正在进行数字化转型，希望与贵公司洽谈合作事宜。', isRead: true, date: '2024-03-14 14:20' },
  { id: '5', name: '赵主管', phone: '13777777777', email: 'zhao@example.com', company: '某物流企业', content: '想了解智能调度系统的功能和报价，请尽快联系我。', isRead: true, date: '2024-03-13 11:30' },
]

export function MessagesManagePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const filteredMessages = mockMessages.filter((m) => {
    const matchesSearch = m.name.includes(searchQuery) || m.company.includes(searchQuery)
    const matchesFilter = filter === 'all' || !m.isRead
    return matchesSearch && matchesFilter
  })

  const unreadCount = mockMessages.filter((m) => !m.isRead).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">留言管理</h2>
          <p className="text-neutral-500">
            共 {mockMessages.length} 条留言，{unreadCount} 条未读
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="搜索姓名或公司..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              未读 ({unreadCount})
            </button>
          </div>
        </div>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((msg) => (
          <Card key={msg.id} className={!msg.isRead ? 'border-l-4 border-l-primary-500' : ''}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-neutral-900">{msg.name}</h3>
                  {!msg.isRead && (
                    <span className="px-2 py-0.5 bg-primary-100 text-primary-600 text-xs rounded-full">
                      新
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-neutral-500 mb-3">
                  <span>📞 {msg.phone}</span>
                  <span>✉️ {msg.email}</span>
                  <span>🏢 {msg.company}</span>
                </div>
                <p className="text-neutral-700 bg-neutral-50 rounded-lg p-3 mb-3">{msg.content}</p>
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <Clock className="w-4 h-4" />
                  {msg.date}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {!msg.isRead && (
                  <Button variant="ghost" size="sm">
                    <Check className="w-4 h-4 mr-1" />
                    标为已读
                  </Button>
                )}
                <button className="p-2 rounded hover:bg-neutral-100 text-neutral-500 hover:text-error-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
