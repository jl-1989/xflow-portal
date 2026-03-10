import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Eye, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { useNews, useNewsMutations, generateSlug } from '@/hooks/useSupabase'
import type { News } from '@/types/database'

const categoryLabels: Record<string, string> = {
  company: '公司新闻',
  industry: '行业资讯',
  tech: '技术分享',
}

const statusLabels: Record<string, string> = {
  published: '已发布',
  draft: '草稿',
}

interface NewsFormData {
  title: string
  summary: string
  content: string
  category: 'company' | 'industry' | 'tech'
  status: 'draft' | 'published'
  cover_image: string
}

const initialFormData: NewsFormData = {
  title: '',
  summary: '',
  content: '',
  category: 'company',
  status: 'draft',
  cover_image: '',
}

export function NewsManagePage() {
  const { data: newsList, loading, refetch } = useNews()
  const { create, update, remove, loading: mutating } = useNewsMutations()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [formData, setFormData] = useState<NewsFormData>(initialFormData)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const categories = ['全部', '公司新闻', '行业资讯', '技术分享']

  const filteredNews = (newsList || []).filter((news) => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === '全部' || categoryLabels[news.category] === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleOpenModal = (news?: News) => {
    if (news) {
      setEditingNews(news)
      setFormData({
        title: news.title,
        summary: news.summary || '',
        content: news.content,
        category: news.category as 'company' | 'industry' | 'tech',
        status: news.status as 'draft' | 'published',
        cover_image: news.cover_image || '',
      })
    } else {
      setEditingNews(null)
      setFormData(initialFormData)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingNews(null)
    setFormData(initialFormData)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingNews) {
        await update(editingNews.id, {
          ...formData,
          published_at: formData.status === 'published' ? new Date().toISOString() : null,
        })
      } else {
        await create({
          ...formData,
          slug: generateSlug(formData.title),
          view_count: 0,
          published_at: formData.status === 'published' ? new Date().toISOString() : null,
          author_id: null,
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
          <h2 className="text-2xl font-bold text-neutral-900">新闻管理</h2>
          <p className="text-neutral-500">管理网站新闻内容</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4 mr-2" />
          新增新闻
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="搜索新闻标题..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">标题</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">分类</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">状态</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">浏览量</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">发布日期</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">
                    暂无数据
                  </td>
                </tr>
              ) : (
                filteredNews.map((news) => (
                  <tr key={news.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-neutral-900 max-w-xs truncate">{news.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                        {categoryLabels[news.category] || news.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          news.status === 'published'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}
                      >
                        {statusLabels[news.status] || news.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">{news.view_count || 0}</td>
                    <td className="px-6 py-4 text-neutral-600">
                      {news.published_at
                        ? new Date(news.published_at).toLocaleDateString('zh-CN')
                        : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1.5 rounded hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700"
                          title="查看"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenModal(news)}
                          className="p-1.5 rounded hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700"
                          title="编辑"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(news.id)}
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-100">
          <p className="text-sm text-neutral-500">共 {filteredNews.length} 条记录</p>
        </div>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingNews ? '编辑新闻' : '新增新闻'}
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

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">摘要</label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">内容 *</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">分类</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as 'company' | 'industry' | 'tech',
                  })
                }
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="company">公司新闻</option>
                <option value="industry">行业资讯</option>
                <option value="tech">技术分享</option>
              </select>
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
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">封面图片URL</label>
            <input
              type="url"
              value={formData.cover_image}
              onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              取消
            </Button>
            <Button type="submit" disabled={mutating}>
              {mutating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingNews ? '保存' : '创建'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="确认删除" size="sm">
        <p className="text-neutral-600">确定要删除这条新闻吗？此操作无法撤销。</p>
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