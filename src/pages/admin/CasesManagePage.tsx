import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { useCases, useCasesMutations, generateSlug } from '@/hooks/useSupabase'
import type { Case } from '@/types/database'

const statusLabels: Record<string, string> = {
  published: '已发布',
  draft: '草稿',
}

interface CaseFormData {
  title: string
  client_name: string
  industry: string
  background: string
  solution: string
  results: string
  status: 'draft' | 'published'
}

const initialFormData: CaseFormData = {
  title: '',
  client_name: '',
  industry: '',
  background: '',
  solution: '',
  results: '',
  status: 'draft',
}

export function CasesManagePage() {
  const { data: casesList, loading, refetch } = useCases()
  const { create, update, remove, loading: mutating } = useCasesMutations()

  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCase, setEditingCase] = useState<Case | null>(null)
  const [formData, setFormData] = useState<CaseFormData>(initialFormData)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const filteredCases = (casesList || []).filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenModal = (item?: Case) => {
    if (item) {
      setEditingCase(item)
      setFormData({
        title: item.title,
        client_name: item.client_name || '',
        industry: item.industry || '',
        background: item.background || '',
        solution: item.solution || '',
        results: item.results || '',
        status: item.status as 'draft' | 'published',
      })
    } else {
      setEditingCase(null)
      setFormData(initialFormData)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingCase(null)
    setFormData(initialFormData)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingCase) {
        await update(editingCase.id, formData)
      } else {
        await create({
          ...formData,
          slug: generateSlug(formData.title),
          images: [],
          service_id: null,
        })
      }
      handleCloseModal()
      refetch()
    } catch (err) {
      console.error('保存失败:', err)
      alert('保存失败，请重试')
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
          <h2 className="text-2xl font-bold text-neutral-900">案例管理</h2>
          <p className="text-neutral-500">管理成功案例内容</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4 mr-2" />
          新增案例
        </Button>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="搜索案例标题..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </Card>

      {/* Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">标题</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">客户</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">行业</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">状态</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">创建时间</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">
                    暂无数据
                  </td>
                </tr>
              ) : (
                filteredCases.map((item) => (
                  <tr key={item.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-neutral-900 max-w-xs truncate">{item.title}</p>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">{item.client_name || '-'}</td>
                    <td className="px-6 py-4 text-neutral-600">{item.industry || '-'}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.status === 'published'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}
                      >
                        {statusLabels[item.status] || item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">
                      {new Date(item.created_at).toLocaleDateString('zh-CN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="p-1.5 rounded hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700"
                          title="编辑"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item.id)}
                          className="p-1.5 rounded hover:bg-neutral-100 text-neutral-500 hover:text-red-500"
                          title="删除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-100">
          <p className="text-sm text-neutral-500">共 {filteredCases.length} 条记录</p>
        </div>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCase ? '编辑案例' : '新增案例'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">标题 *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">客户名称</label>
              <input
                type="text"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">所属行业</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">项目背景</label>
            <textarea
              value={formData.background}
              onChange={(e) => setFormData({ ...formData, background: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">解决方案</label>
            <textarea
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">项目成果</label>
            <textarea
              value={formData.results}
              onChange={(e) => setFormData({ ...formData, results: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">状态</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as 'draft' | 'published',
                })
              }
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="draft">草稿</option>
              <option value="published">已发布</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              取消
            </Button>
            <Button type="submit" disabled={mutating}>
              {mutating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingCase ? '保存' : '创建'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="确认删除" size="sm">
        <p className="text-neutral-600">确定要删除这个案例吗？此操作无法撤销。</p>
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