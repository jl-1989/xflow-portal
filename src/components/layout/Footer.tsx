import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react'

const quickLinks = [
  { name: '首页', path: '/' },
  { name: '关于我们', path: '/about' },
  { name: '服务项目', path: '/services' },
  { name: '成功案例', path: '/cases' },
  { name: '新闻动态', path: '/news' },
  { name: '联系我们', path: '/contact' },
]

const services = [
  '信息化咨询',
  '系统开发',
  '运维服务',
  '解决方案',
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">心</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">心流永动科技</h3>
              </div>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              专注于企业信息化建设，致力于为客户提供专业、高效、创新的数字化解决方案。
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-primary-500 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-6">快速链接</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-semibold mb-6">服务项目</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-semibold mb-6">联系我们</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-400">咨询热线</p>
                  <p className="text-sm font-medium">400-888-8888</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-400">电子邮箱</p>
                  <p className="text-sm font-medium">contact@xflowtech.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-400">公司地址</p>
                  <p className="text-sm font-medium">北京市朝阳区科技园区A座</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              © {currentYear} 心流永动科技有限公司 版权所有
            </p>
            <p className="text-sm text-neutral-500">
              京ICP备XXXXXXXX号-1
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
