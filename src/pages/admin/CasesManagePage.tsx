import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const mockCases = [
  { id: '1', title: '某大型制造企业ERP系统升级', client: '某大型制造企业', industry: '制造业', status: 'published', date: '2024-03-15' },
  { id: '2', title: '某金融机构数字化转型', client: '某金融机构', industry: '金融业', status: 'published', date: '2024-03-10' },
  { id: '3', title: '某零售集团供应链系统', client: '某零售集团', industry: '零售业', status: 'published', date: '2024-03-05' },
  { id: '4', title: '某医院信息化建设', client: '某三甲医院', industry: '医疗健康', status: 'draft', date: '2024-03-01' },
  { id: '5', title: '某物流企业智能调度系统', client: '某物流企业', industry: '物流运输', status: 'published', date: '2024-02-25' },
]

const industries = ['全部', '制造业', '金融业', '零售业', '医疗健康', '物流运输', '教育培训']

export function CasesManagePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('全部')

  const filteredCases = mockCases.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesIndustry = selectedIndustry === '全部' || c.industry === selectedIndustry
    return matchesSearch && matchesIndustry
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">案例管理</h2>
          <p className="text-neutral-500">管理成功案例内容</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          新增案例
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
                placeholder="搜索案例标题..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {industries.slice(0, 5).map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedIndustry === industry
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {industry}
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">案例标题</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">客户名称</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">行业</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">状态</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">创建日期</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((item) => (
                <tr key={item.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-neutral-900 max-w-xs truncate">{item.title}</p>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{item.client}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-primary-100 text-primary-600 text-xs rounded-full">
                      {item.industry}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.status === 'published'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {item.status === 'published' ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{item.date}</td>
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
      </Card>
    </div>
  )
}
