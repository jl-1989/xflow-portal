import { Card } from '@/components/ui/Card'
import {
  TrendingUp,
  FileText,
  MessageSquare,
  Eye,
} from 'lucide-react'

const stats = [
  {
    label: '访问量',
    value: '12,345',
    change: '+12%',
    icon: Eye,
    color: 'bg-blue-500',
  },
  {
    label: '新闻发布',
    value: '56',
    change: '+3',
    icon: FileText,
    color: 'bg-green-500',
  },
  {
    label: '案例数量',
    value: '23',
    change: '+2',
    icon: TrendingUp,
    color: 'bg-purple-500',
  },
  {
    label: '留言数量',
    value: '89',
    change: '+15',
    icon: MessageSquare,
    color: 'bg-orange-500',
  },
]

const recentMessages = [
  { id: 1, name: '张先生', phone: '138****8888', content: '想了解贵公司的信息化咨询服务...', time: '10分钟前' },
  { id: 2, name: '李女士', phone: '139****9999', content: '请问可以提供定制化系统开发吗？', time: '30分钟前' },
  { id: 3, name: '王经理', phone: '136****6666', content: '需要了解ERP系统升级服务...', time: '1小时前' },
]

const recentNews = [
  { id: 1, title: '心流永动科技荣获年度最佳信息化服务商称号', views: 234, status: '已发布' },
  { id: 2, title: '数字化转型新趋势：企业如何把握机遇', views: 189, status: '已发布' },
  { id: 3, title: '我司成功签约某500强企业战略合作项目', views: 156, status: '已发布' },
]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-neutral-900">{stat.value}</span>
                  <span className="text-sm text-green-500">{stat.change}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">最新留言</h3>
            <a href="/admin/messages" className="text-sm text-primary-500 hover:underline">
              查看全部
            </a>
          </div>
          <div className="space-y-4">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-neutral-900">{msg.name}</span>
                    <span className="text-sm text-neutral-500">{msg.phone}</span>
                  </div>
                  <span className="text-xs text-neutral-400">{msg.time}</span>
                </div>
                <p className="text-sm text-neutral-600 line-clamp-2">{msg.content}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent News */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">最新新闻</h3>
            <a href="/admin/news" className="text-sm text-primary-500 hover:underline">
              查看全部
            </a>
          </div>
          <div className="space-y-4">
            {recentNews.map((news) => (
              <div key={news.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-neutral-900 truncate">{news.title}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-neutral-500">
                      <Eye className="w-3 h-3 inline mr-1" />
                      {news.views}
                    </span>
                    <span className="text-xs text-green-500">{news.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">快速操作</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '发布新闻', href: '/admin/news', color: 'bg-blue-500' },
            { label: '添加案例', href: '/admin/cases', color: 'bg-green-500' },
            { label: '管理服务', href: '/admin/services', color: 'bg-purple-500' },
            { label: '系统设置', href: '/admin/settings', color: 'bg-neutral-500' },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className={`${action.color} text-white rounded-lg p-4 text-center font-medium hover:opacity-90 transition-opacity`}
            >
              {action.label}
            </a>
          ))}
        </div>
      </Card>
    </div>
  )
}
