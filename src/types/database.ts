// 数据库类型定义

export interface User {
  id: string
  email: string
  username: string | null
  role: 'admin' | 'editor'
  created_at: string
  updated_at: string
}

export interface News {
  id: string
  title: string
  slug: string
  summary: string | null
  content: string
  cover_image: string | null
  category: 'company' | 'industry'
  status: 'draft' | 'published'
  view_count: number
  author_id: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface Case {
  id: string
  title: string
  slug: string
  client_name: string | null
  industry: string | null
  background: string | null
  solution: string | null
  results: string | null
  images: string[]
  service_id: string | null
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  content: string | null
  sort_order: number
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  name: string
  phone: string | null
  email: string | null
  company: string | null
  content: string
  is_read: boolean
  created_at: string
  updated_at: string
}

export interface SiteConfig {
  site_name: string
  site_description: string
  logo_url: string | null
  contact_email: string | null
  contact_phone: string | null
  address: string | null
  social_links: {
    wechat?: string
    weibo?: string
    linkedin?: string
  }
}
