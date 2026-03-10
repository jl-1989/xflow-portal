import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/stores/authStore'

export function AdminLoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // 模拟登录
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 模拟验证
    if (formData.username === 'admin' && formData.password === 'admin123') {
      login(
        { id: '1', email: 'admin@xflowtech.com', username: 'Admin', role: 'admin' },
        'mock-token'
      )
      navigate('/admin')
    } else {
      setError('用户名或密码错误')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <span className="text-primary-500 font-bold text-2xl">心</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">心流永动科技</h1>
          <p className="text-white/80">管理后台登录</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="用户名"
              name="username"
              value={formData.username}
              onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
              placeholder="请输入用户名"
              required
            />

            <div className="relative">
              <Input
                label="密码"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="请输入密码"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <p className="text-sm text-error-500 text-center">{error}</p>
            )}

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              登录
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            默认账号: admin / admin123
          </p>
        </div>

        {/* Back to site */}
        <p className="mt-6 text-center">
          <a href="/" className="text-sm text-white/80 hover:text-white">
            返回前台网站
          </a>
        </p>
      </div>
    </div>
  )
}
