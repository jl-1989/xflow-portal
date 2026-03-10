import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

const contactInfo = [
  {
    icon: Phone,
    title: '咨询热线',
    content: '400-888-8888',
    desc: '工作日 9:00-18:00',
  },
  {
    icon: Mail,
    title: '电子邮箱',
    content: 'contact@xflowtech.com',
    desc: '24小时内回复',
  },
  {
    icon: MapPin,
    title: '公司地址',
    content: '北京市朝阳区科技园区A座',
    desc: '欢迎来访',
  },
  {
    icon: Clock,
    title: '工作时间',
    content: '周一至周五 9:00-18:00',
    desc: '周末及节假日休息',
  },
]

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    content: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // 模拟提交
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', phone: '', email: '', company: '', content: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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
              联系我们
            </h1>
            <p className="text-xl text-neutral-300">
              期待与您沟通，共同探讨企业信息化解决方案
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">在线留言</h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">提交成功！</h3>
                  <p className="text-green-600">我们会尽快与您联系，感谢您的关注。</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-green-700 underline"
                  >
                    继续留言
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="您的姓名 *"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="请输入姓名"
                      required
                    />
                    <Input
                      label="联系电话 *"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="请输入电话"
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="电子邮箱"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="请输入邮箱"
                    />
                    <Input
                      label="公司名称"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="请输入公司名称"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      留言内容 *
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="请输入您的需求或问题"
                      rows={5}
                      required
                      className="w-full px-4 py-3 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    />
                  </div>
                  <Button type="submit" size="lg" isLoading={isSubmitting}>
                    提交留言
                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">联系方式</h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <Card key={item.title} hover padding="sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-primary-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">{item.title}</h3>
                        <p className="text-neutral-700">{item.content}</p>
                        <p className="text-sm text-neutral-500">{item.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Map */}
              <div className="mt-8">
                <h3 className="font-semibold text-neutral-900 mb-4">公司位置</h3>
                <a
                  href="https://uri.amap.com/marker?position=116.473195,39.993253&name=心流永动科技&coordinate=gaode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-video bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl overflow-hidden relative group hover:shadow-lg transition-shadow"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <MapPin className="w-12 h-12 text-primary-500 mb-4" />
                    <p className="text-lg font-medium text-neutral-900">北京市朝阳区科技园区A座</p>
                    <p className="text-sm text-neutral-500 mt-2">点击查看地图导航</p>
                  </div>
                  <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/5 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">常见问题</h2>
            <p className="text-lg text-neutral-600">快速了解我们的服务</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: '如何获取咨询服务？',
                a: '您可以通过本页面的在线留言表单、拨打咨询热线或发送邮件的方式联系我们，我们会在24小时内与您取得联系。',
              },
              {
                q: '项目合作流程是怎样的？',
                a: '我们的合作流程包括：需求沟通 → 方案设计 → 合同签订 → 项目实施 → 验收交付 → 售后支持。',
              },
              {
                q: '提供哪些售后服务？',
                a: '我们提供系统运维支持、技术咨询、功能升级、培训指导等全方位的售后服务，确保您的系统稳定运行。',
              },
              {
                q: '项目周期一般多长？',
                a: '项目周期根据项目规模和复杂度而定，一般为1-6个月。我们会在项目启动前与您确认详细的项目计划。',
              },
            ].map((faq, index) => (
              <Card key={index}>
                <h3 className="font-semibold text-neutral-900 mb-2">{faq.q}</h3>
                <p className="text-neutral-600">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
