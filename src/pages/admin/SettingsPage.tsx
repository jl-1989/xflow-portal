import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900">系统设置</h2>
        <p className="text-neutral-500">配置网站基本信息</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Site Settings */}
        <Card>
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">网站信息</h3>
          <div className="space-y-4">
            <Input label="网站名称" defaultValue="心流永动科技" />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">网站描述</label>
              <textarea
                defaultValue="专注企业信息化建设，助力企业数字化转型"
                rows={3}
                className="w-full px-4 py-3 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>
            <Input label="Logo URL" defaultValue="" placeholder="输入Logo图片地址" />
          </div>
        </Card>

        {/* Contact Settings */}
        <Card>
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">联系方式</h3>
          <div className="space-y-4">
            <Input label="咨询电话" defaultValue="400-888-8888" />
            <Input label="电子邮箱" defaultValue="contact@xflowtech.com" />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">公司地址</label>
              <textarea
                defaultValue="北京市朝阳区科技园区A座"
                rows={2}
                className="w-full px-4 py-3 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>
          </div>
        </Card>

        {/* Social Links */}
        <Card>
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">社交媒体</h3>
          <div className="space-y-4">
            <Input label="微信公众号" defaultValue="" placeholder="输入微信公众号名称" />
            <Input label="微博" defaultValue="" placeholder="输入微博账号" />
            <Input label="LinkedIn" defaultValue="" placeholder="输入LinkedIn链接" />
          </div>
        </Card>

        {/* SEO Settings */}
        <Card>
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">SEO设置</h3>
          <div className="space-y-4">
            <Input label="SEO关键词" defaultValue="企业信息化,数字化转型,ERP系统" />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">SEO描述</label>
              <textarea
                defaultValue="心流永动科技专注于企业信息化建设，提供信息化咨询、系统开发、运维服务等一站式解决方案。"
                rows={3}
                className="w-full px-4 py-3 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">保存设置</Button>
      </div>
    </div>
  )
}
