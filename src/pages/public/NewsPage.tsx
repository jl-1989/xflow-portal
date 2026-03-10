import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'

const news = [
  {
    id: '1',
    title: '心流永动科技荣获年度最佳信息化服务商称号',
    date: '2024-03-15',
    category: '公司新闻',
    summary: '凭借卓越的技术实力和优质的服务，我司在年度评选中脱颖而出，荣获"年度最佳信息化服务商"称号。',
    image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&h=600&fit=crop',
  },
  {
    id: '2',
    title: '数字化转型新趋势：企业如何把握机遇',
    date: '2024-03-10',
    category: '行业资讯',
    summary: '深入解析数字化转型趋势，探讨企业如何把握发展机遇，实现高质量发展。',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
  },
  {
    id: '3',
    title: '我司成功签约某500强企业战略合作项目',
    date: '2024-03-05',
    category: '公司新闻',
    summary: '战略合作项目签约，标志着公司业务发展进入新阶段，将为该企业提供全面的数字化转型服务。',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
  },
  {
    id: '4',
    title: '人工智能在企业信息化中的应用前景',
    date: '2024-03-01',
    category: '技术分享',
    summary: '探讨人工智能技术在企业信息化中的应用场景和发展前景，为企业数字化转型提供参考。',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
  },
  {
    id: '5',
    title: '云计算架构设计最佳实践分享',
    date: '2024-02-25',
    category: '技术分享',
    summary: '分享云计算架构设计的最佳实践，帮助企业构建稳定、安全、高效的云环境。',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop',
  },
  {
    id: '6',
    title: '我司举办企业数字化转型高峰论坛',
    date: '2024-02-20',
    category: '公司新闻',
    summary: '邀请行业专家和企业代表共同探讨数字化转型之道，分享成功经验和最佳实践。',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
  },
]

const categories = ['全部', '公司新闻', '行业资讯', '技术分享']

export function NewsPage() {
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
              新闻动态
            </h1>
            <p className="text-xl text-neutral-300">
              了解公司最新动态和行业资讯
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === '全部'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured News */}
          <Link to={`/news/${news[0].id}`} className="block mb-12">
            <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video md:aspect-auto">
                <img
                  src={news[0].image}
                  alt={news[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded-full mb-4 w-fit">
                  {news[0].category}
                </span>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">{news[0].title}</h2>
                <p className="text-neutral-600 mb-4">{news[0].summary}</p>
                <span className="text-sm text-neutral-400">{news[0].date}</span>
              </div>
            </div>
          </Link>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.slice(1).map((item) => (
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

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-neutral-100 text-neutral-700 rounded-lg font-medium hover:bg-neutral-200 transition-colors">
              加载更多
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              订阅我们的资讯
            </h2>
            <p className="text-neutral-600 mb-8">
              获取最新的行业动态和技术资讯
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="请输入您的邮箱"
                className="flex-1 px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
              >
                订阅
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
