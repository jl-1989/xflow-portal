import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const services = [
  {
    id: '1',
    name: '信息化咨询',
    description: '专业的信息化战略规划',
    icon: '🎯',
    features: [
      '信息化现状评估',
      '数字化转型规划',
      '技术选型建议',
      '实施路线图设计',
    ],
    detailedDescription: `我们提供全面的企业信息化咨询服务，帮助企业制定科学的数字化转型战略。
从现状评估到规划落地，我们的专家团队将全程陪伴，确保企业信息化建设有序推进。`,
  },
  {
    id: '2',
    name: '系统开发',
    description: '定制化软件开发服务',
    icon: '💻',
    features: [
      '企业管理系统开发',
      '移动应用开发',
      '数据中台建设',
      '系统集成',
    ],
    detailedDescription: `我们拥有丰富的系统开发经验，可以根据企业实际需求，
量身定制各类管理系统，包括ERP、CRM、OA等，帮助企业实现业务数字化。`,
  },
  {
    id: '3',
    name: '运维服务',
    description: '专业的IT运维支持',
    icon: '🔧',
    features: [
      '7×24小时监控',
      '故障快速响应',
      '性能优化',
      '安全防护',
    ],
    detailedDescription: `提供专业的IT运维服务，保障企业信息系统稳定运行。
我们的运维团队随时待命，确保问题得到及时解决，让企业专注于核心业务。`,
  },
  {
    id: '4',
    name: '解决方案',
    description: '行业解决方案服务',
    icon: '📊',
    features: [
      '制造业解决方案',
      '金融行业解决方案',
      '零售行业解决方案',
      '医疗行业解决方案',
    ],
    detailedDescription: `针对不同行业特点，我们提供专业的行业解决方案。
深耕行业多年，我们深刻理解各行业痛点，能够提供切实可行的解决方案。`,
  },
  {
    id: '5',
    name: '云服务',
    description: '云计算解决方案',
    icon: '☁️',
    features: [
      '云架构设计',
      '云迁移服务',
      '云原生开发',
      '混合云管理',
    ],
    detailedDescription: `帮助企业构建安全、稳定、高效的云计算环境。
从架构设计到迁移实施，我们提供端到端的云服务，助力企业云上发展。`,
  },
  {
    id: '6',
    name: '数据服务',
    description: '大数据分析服务',
    icon: '📈',
    features: [
      '数据采集清洗',
      '数据仓库建设',
      '数据分析可视化',
      'AI智能应用',
    ],
    detailedDescription: `帮助企业挖掘数据价值，实现数据驱动决策。
我们提供从数据采集、存储、分析到应用的全链路服务。`,
  },
]

export function ServicesPage() {
  const [activeService, setActiveService] = useState(services[0])

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-neutral-900 to-neutral-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              服务项目
            </h1>
            <p className="text-xl text-neutral-300">
              为企业提供全方位的信息化解决方案，助力业务创新与增长
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service List */}
            <div className="lg:col-span-1 space-y-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  className={`w-full text-left p-6 rounded-xl transition-all duration-300 ${
                    activeService.id === service.id
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white hover:bg-neutral-50 text-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className={`text-sm ${
                        activeService.id === service.id ? 'text-white/80' : 'text-neutral-500'
                      }`}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Service Detail */}
            <div className="lg:col-span-2">
              <Card className="p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{activeService.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900">{activeService.name}</h2>
                    <p className="text-neutral-600">{activeService.description}</p>
                  </div>
                </div>

                <p className="text-neutral-600 mb-8 leading-relaxed">
                  {activeService.detailedDescription}
                </p>

                <h3 className="text-lg font-semibold text-neutral-900 mb-4">服务内容</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {activeService.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/contact">
                  <Button>
                    咨询此服务
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              服务流程
            </h2>
            <p className="text-lg text-neutral-600">
              标准化的服务流程，确保项目顺利交付
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: '需求沟通', desc: '深入了解客户需求，明确项目目标' },
              { step: '02', title: '方案设计', desc: '制定详细实施方案，确认技术路线' },
              { step: '03', title: '开发实施', desc: '敏捷开发，定期汇报项目进展' },
              { step: '04', title: '交付运维', desc: '系统交付上线，提供持续运维支持' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            找到适合您的服务
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            我们的专家团队将为您提供专业的咨询服务
          </p>
          <Link to="/contact">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary-500 border-white hover:bg-white/90"
            >
              立即咨询
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
