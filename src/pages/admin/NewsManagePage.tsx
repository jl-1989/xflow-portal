import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

const mockNews = [
  { id: '1', title: '心流永动科技荣获年度最佳信息化服务商称号', category: '公司新闻', status: 'published', views: 234, date: '2024-03-15' },
  { id: '2', title: '数字化转型新趋势：企业如何把握机遇', category: '行业资讯', status: 'published', views: 189, date: '2024-03-10' },
  { id: '3', title: '我司成功签约某500强企业战略合作项目', category: '公司新闻', status: 'published', views: 156, date: '2024-03-05' },
  { id: '4', title: '人工智能在企业信息化中的应用前景', category: '技术分享', status: 'draft', views: 0, date: '2024-03-01' },
  { id: '5', title: '云计算架构设计最佳实践分享', category: '技术分享', status: 'draft', views: 0, date: '2024-02-25' },
]

export function NewsManagePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')

  const categories = ['全部', '公司新闻', '行业资讯', '技术分享']

  const filteredNews = mockNews.filter((news) => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === '全部' || news.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">新闻管理</h2>
          <p className="text-neutral-500">管理网站新闻内容</p>
        </div>
        <Button>
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
          <div className="flex gap-2">
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
              {filteredNews.map((news) => (
                <tr key={news.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-neutral-900 max-w-xs truncate">{news.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                      {news.category}
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
                      {news.status === 'published' ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{news.views}</td>
                  <td className="px-6 py-4 text-neutral-600">{news.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-neutral-100 text-neutral-500 hover:text-error-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-100">
          <p className="text-sm text-neutral-500">共 {filteredNews.length} 条记录</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-neutral-200 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50">
              上一页
            </button>
            <button className="px-4 py-2 border border-neutral-200 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50">
              下一页
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
