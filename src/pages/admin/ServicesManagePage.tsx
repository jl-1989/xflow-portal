import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const mockServices = [
  { id: '1', name: '信息化咨询', description: '专业的信息化战略规划', status: 'active', sort: 1 },
  { id: '2', name: '系统开发', description: '定制化软件开发服务', status: 'active', sort: 2 },
  { id: '3', name: '运维服务', description: '专业的IT运维支持', status: 'active', sort: 3 },
  { id: '4', name: '解决方案', description: '行业解决方案服务', status: 'active', sort: 4 },
  { id: '5', name: '云服务', description: '云计算解决方案', status: 'inactive', sort: 5 },
  { id: '6', name: '数据服务', description: '大数据分析服务', status: 'inactive', sort: 6 },
]

export function ServicesManagePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredServices = mockServices.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">服务管理</h2>
          <p className="text-neutral-500">管理公司服务项目</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          新增服务
        </Button>
      </div>

      {/* Search */}
      <Card>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="搜索服务名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center text-2xl">
                🎯
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    service.status === 'active'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {service.status === 'active' ? '启用' : '停用'}
                </span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">{service.name}</h3>
            <p className="text-neutral-600 text-sm mb-4">{service.description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <span className="text-sm text-neutral-500">排序: {service.sort}</span>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded hover:bg-neutral-100 text-neutral-500 hover:text-error-500">
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
