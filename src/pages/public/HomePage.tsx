import { Link } from 'react-router-dom'
import { ArrowRight, Server, Shield, Zap, Users, Award, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardImage, CardContent, CardTitle, CardDescription } from '@/components/ui/Card'

// 临时数据
const services = [
  {
    icon: Server,
    title: '信息化咨询',
    description: '专业的信息化战略规划，帮助企业制定数字化转型路径',
  },
  {
    icon: Shield,
    title: '系统开发',
    description: '定制化软件开发，满足企业个性化业务需求',
  },
  {
    icon: Zap,
    title: '运维服务',
    description: '7×24小时技术支持，保障系统稳定运行',
  },
  {
    icon: Users,
    title: '解决方案',
    description: '行业领先的解决方案，助力企业降本增效',
  },
]

const stats = [
  { value: '500+', label: '服务企业' },
  { value: '98%', label: '客户满意度' },
  { value: '15+', label: '行业经验' },
  { value: '24/7', label: '技术支持' },
]

const cases = [
  {
    id: '1',
    title: '某大型制造企业ERP系统升级',
    client: '某大型制造企业',
    industry: '制造业',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    summary: '帮助企业实现生产流程数字化，提升运营效率30%',
  },
  {
    id: '2',
    title: '某金融机构数字化转型',
    client: '某金融机构',
    industry: '金融业',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    summary: '打造智能化金融服务平台，实现业务在线化',
  },
  {
    id: '3',
    title: '某零售集团供应链系统',
    client: '某零售集团',
    industry: '零售业',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    summary: '构建高效供应链体系，降低库存成本25%',
  },
]

const news = [
  {
    id: '1',
    title: '心流永动科技荣获年度最佳信息化服务商称号',
    date: '2024-03-15',
    category: '公司新闻',
    summary: '凭借卓越的技术实力和优质的服务，我司在年度评选中脱颖而出',
  },
  {
    id: '2',
    title: '数字化转型新趋势：企业如何把握机遇',
    date: '2024-03-10',
    category: '行业资讯',
    summary: '深入解析数字化转型趋势，助力企业把握发展机遇',
  },
  {
    id: '3',
    title: '我司成功签约某500强企业战略合作项目',
    date: '2024-03-05',
    category: '公司新闻',
    summary: '战略合作项目签约，标志着公司业务发展进入新阶段',
  },
]

export function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-neutral-700">专注企业信息化15年</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-6">
              让信息化驱动
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">企业未来</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed">
              心流永动科技专注于企业信息化建设，提供从咨询规划到系统开发、
              运维支持的一站式服务，助力企业实现数字化转型。
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg">
                  免费咨询
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="lg">
                  了解更多
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-900">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              我们的服务
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              为企业提供全方位的信息化解决方案，助力业务创新与增长
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="group">
                <div className="p-6">
                  <div className="w-14 h-14 bg-gradient-hero rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">{service.title}</h3>
                  <p className="text-neutral-600">{service.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="secondary">
                查看全部服务
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                为什么选择我们？
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                我们拥有丰富的行业经验和专业的技术团队，致力于为客户提供最优质的信息化服务。
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Award, title: '专业团队', desc: '拥有资深技术专家和行业顾问' },
                  { icon: Clock, title: '快速响应', desc: '7×24小时技术支持，快速响应客户需求' },
                  { icon: Shield, title: '安全保障', desc: '严格的安全体系，保护企业数据安全' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                      <p className="text-neutral-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=800&fit=crop"
                  alt="团队协作"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neutral-900">500+</div>
                    <div className="text-sm text-neutral-600">成功案例</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              成功案例
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              我们服务的客户遍布各行各业，以下是我们部分成功案例
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cases.map((item) => (
              <Link key={item.id} to={`/cases/${item.id}`} className="group">
                <Card padding="none">
                  <CardImage src={item.image} alt={item.title} />
                  <CardContent>
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded-full mb-3">
                      {item.industry}
                    </span>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.summary}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/cases">
              <Button variant="secondary">
                查看全部案例
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              新闻动态
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              了解公司最新动态和行业资讯
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <Link key={item.id} to={`/news/${item.id}`}>
                <Card hover>
                  <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-full mb-4">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{item.summary}</p>
                  <span className="text-sm text-neutral-400">{item.date}</span>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/news">
              <Button variant="secondary">
                查看全部新闻
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            准备好开始您的数字化转型了吗？
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            我们的专家团队随时准备为您提供专业的咨询服务
          </p>
          <Link to="/contact">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary-500 border-white hover:bg-white/90"
            >
              立即联系我们
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
