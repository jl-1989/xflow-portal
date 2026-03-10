import { Link } from 'react-router-dom'
import { Card, CardImage, CardContent, CardTitle, CardDescription } from '@/components/ui/Card'

const cases = [
  {
    id: '1',
    title: '某大型制造企业ERP系统升级',
    client: '某大型制造企业',
    industry: '制造业',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    summary: '帮助企业实现生产流程数字化，提升运营效率30%',
    results: ['运营效率提升30%', '库存周转率提高25%', '人工成本降低20%'],
    technologies: ['SAP', '云原生架构', '移动端适配'],
  },
  {
    id: '2',
    title: '某金融机构数字化转型',
    client: '某金融机构',
    industry: '金融业',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    summary: '打造智能化金融服务平台，实现业务在线化',
    results: ['业务办理时间缩短60%', '客户满意度提升35%', '运营成本降低25%'],
    technologies: ['微服务架构', '区块链', 'AI风控'],
  },
  {
    id: '3',
    title: '某零售集团供应链系统',
    client: '某零售集团',
    industry: '零售业',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    summary: '构建高效供应链体系，降低库存成本25%',
    results: ['库存成本降低25%', '订单处理效率提升50%', '供应商协同效率提升40%'],
    technologies: ['云计算', '大数据分析', '智能预测'],
  },
  {
    id: '4',
    title: '某医院信息化建设',
    client: '某三甲医院',
    industry: '医疗健康',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    summary: '构建智慧医疗平台，提升医疗服务质量',
    results: ['就诊等待时间减少40%', '病历电子化率100%', '医疗差错率降低80%'],
    technologies: ['云计算', 'AI诊断辅助', '移动医疗'],
  },
  {
    id: '5',
    title: '某物流企业智能调度系统',
    client: '某物流企业',
    industry: '物流运输',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    summary: '打造智能调度平台，优化配送效率',
    results: ['配送效率提升35%', '运输成本降低20%', '客户投诉率降低50%'],
    technologies: ['GPS定位', 'AI调度算法', '实时监控'],
  },
  {
    id: '6',
    title: '某教育机构在线学习平台',
    client: '某教育机构',
    industry: '教育培训',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
    summary: '构建在线教育平台，实现教学数字化转型',
    results: ['学员增长300%', '课程完成率提升45%', '教学满意度95%'],
    technologies: ['在线直播', '互动教学', '学习分析'],
  },
]

const industries = ['全部', '制造业', '金融业', '零售业', '医疗健康', '物流运输', '教育培训']

export function CasesPage() {
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
              成功案例
            </h1>
            <p className="text-xl text-neutral-300">
              服务的客户遍布各行各业，以下是我们部分成功案例
            </p>
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-20">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 mb-12">
            {industries.map((industry) => (
              <button
                key={industry}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  industry === '全部'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>

          {/* Cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((item) => (
              <Link key={item.id} to={`/cases/${item.id}`} className="group">
                <Card padding="none">
                  <CardImage src={item.image} alt={item.title} />
                  <CardContent>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded-full">
                        {item.industry}
                      </span>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.summary}</CardDescription>
                    
                    {/* Results Preview */}
                    <div className="mt-4 pt-4 border-t border-neutral-100">
                      <p className="text-xs text-neutral-500 mb-2">项目成果</p>
                      <div className="flex flex-wrap gap-2">
                        {item.results.slice(0, 2).map((result) => (
                          <span key={result} className="text-xs text-neutral-600 bg-neutral-50 px-2 py-1 rounded">
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-900">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: '服务企业' },
              { value: '15+', label: '覆盖行业' },
              { value: '98%', label: '客户满意度' },
              { value: '1000+', label: '成功项目' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            想要成为我们的下一个成功案例？
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            联系我们，开启您的数字化转型之旅
          </p>
          <Link to="/contact">
            <button className="px-8 py-4 bg-white text-primary-500 rounded-lg font-medium hover:bg-white/90 transition-colors">
              立即咨询
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}
