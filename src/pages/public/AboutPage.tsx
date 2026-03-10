import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function AboutPage() {
  const milestones = [
    { year: '2010', title: '公司成立', desc: '心流永动科技在北京正式成立' },
    { year: '2013', title: '业务扩展', desc: '服务客户突破100家' },
    { year: '2016', title: '技术创新', desc: '获得多项软件著作权' },
    { year: '2019', title: '行业认可', desc: '被评为优秀信息化服务商' },
    { year: '2022', title: '规模发展', desc: '团队规模突破100人' },
    { year: '2024', title: '持续领先', desc: '服务企业超过500家' },
  ]

  const team = [
    {
      name: '张三',
      role: '创始人 & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      desc: '20年信息化行业经验',
    },
    {
      name: '李四',
      role: '技术总监',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      desc: '前BAT高级架构师',
    },
    {
      name: '王五',
      role: '产品总监',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      desc: '10年产品设计经验',
    },
    {
      name: '赵六',
      role: '运营总监',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      desc: '资深运营管理专家',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-neutral-900 to-neutral-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              关于我们
            </h1>
            <p className="text-xl text-neutral-300">
              心流永动科技成立于2010年，是一家专注于企业信息化建设的高新技术企业，
              致力于为客户提供专业、高效、创新的数字化解决方案。
            </p>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                让信息化驱动企业未来
              </h2>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                心流永动科技有限公司是一家专注于企业信息化建设的高新技术企业。
                我们拥有一支经验丰富、技术精湛的专业团队，致力于为企业提供全方位的信息化解决方案。
              </p>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                多年来，我们始终坚持以客户为中心，以技术创新为驱动，帮助众多企业实现了数字化转型，
                提升了运营效率，降低了运营成本，创造了显著的经济效益和社会效益。
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed">
                未来，我们将继续深耕企业信息化领域，不断创新，为客户提供更加优质的产品和服务，
                助力企业在数字经济时代实现可持续发展。
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="团队工作"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '愿景',
                content: '成为最受信赖的企业信息化服务商',
                icon: '🎯',
              },
              {
                title: '使命',
                content: '用科技赋能企业，推动社会进步',
                icon: '🚀',
              },
              {
                title: '价值观',
                content: '诚信、创新、专业、共赢',
                icon: '💡',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-neutral-600">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              发展历程
            </h2>
            <p className="text-lg text-neutral-600">
              一步一个脚印，见证我们的成长
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-neutral-200 hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-sm inline-block">
                      <div className="text-2xl font-bold text-primary-500 mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">{milestone.title}</h3>
                      <p className="text-neutral-600">{milestone.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow z-10" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              核心团队
            </h2>
            <p className="text-lg text-neutral-600">
              专业、敬业、创新的团队是我们的核心竞争力
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl overflow-hidden shadow-sm group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-neutral-900">{member.name}</h3>
                  <p className="text-primary-500 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-neutral-600 text-sm">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            期待与您合作
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            如果您对我们的服务感兴趣，欢迎随时联系我们
          </p>
          <Link to="/contact">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary-500 border-white hover:bg-white/90"
            >
              联系我们
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
