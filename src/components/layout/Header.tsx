import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

const navLinks = [
  { name: '首页', path: '/' },
  { name: '关于我们', path: '/about' },
  { name: '服务项目', path: '/services' },
  { name: '成功案例', path: '/cases' },
  { name: '新闻动态', path: '/news' },
  { name: '联系我们', path: '/contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">心</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-neutral-900">心流永动科技</h1>
              <p className="text-xs text-neutral-500">让信息化驱动企业未来</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors duration-150',
                  location.pathname === link.path
                    ? 'text-primary-500'
                    : 'text-neutral-700 hover:text-primary-500'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="primary" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              立即咨询
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-neutral-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-neutral-100 shadow-lg animate-slide-down">
            <div className="container-custom py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'block py-3 text-base font-medium transition-colors duration-150',
                    location.pathname === link.path
                      ? 'text-primary-500'
                      : 'text-neutral-700 hover:text-primary-500'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-neutral-100">
                <Button variant="primary" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  立即咨询
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
