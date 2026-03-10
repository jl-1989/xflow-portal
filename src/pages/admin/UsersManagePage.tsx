import { useState } from 'react'
import { Search, Edit, Trash2, Shield, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const mockUsers = [
  { id: '1', username: 'Admin', email: 'admin@xflowtech.com', role: 'admin', status: 'active', lastLogin: '2024-03-15 10:30' },
  { id: '2', username: 'Editor', email: 'editor@xflowtech.com', role: 'editor', status: 'active', lastLogin: '2024-03-14 16:45' },
  { id: '3', username: 'Test', email: 'test@xflowtech.com', role: 'editor', status: 'inactive', lastLogin: '2024-02-20 09:00' },
]

export function UsersManagePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUsers = mockUsers.filter((u) =>
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">用户管理</h2>
          <p className="text-neutral-500">管理后台用户账户</p>
        </div>
        <Button>
          添加用户
        </Button>
      </div>

      {/* Search */}
      <Card>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="搜索用户名或邮箱..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </Card>

      {/* Users Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">用户信息</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">角色</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">状态</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">最后登录</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{user.username}</p>
                        <p className="text-sm text-neutral-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.role === 'admin' && <Shield className="w-4 h-4 text-primary-500" />}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.role === 'admin'
                          ? 'bg-primary-100 text-primary-600'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}>
                        {user.role === 'admin' ? '管理员' : '编辑员'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {user.status === 'active' ? '正常' : '禁用'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{user.lastLogin}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
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
