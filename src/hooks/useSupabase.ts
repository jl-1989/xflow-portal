import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { News, Case, Service, Message } from '@/types/database'

// 通用 Hook 用于 CRUD 操作
export function useSupabaseQuery<T>(
  table: string,
  options?: {
    select?: string
    filter?: Record<string, unknown>
    order?: { column: string; ascending?: boolean }
  }
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase.from(table).select(options?.select || '*')

      if (options?.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
      }

      if (options?.order) {
        query = query.order(options.order.column, { ascending: options.order.ascending ?? false })
      }

      const { data: result, error: err } = await query

      if (err) throw err
      setData((result as T[]) || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : '查询失败'
      setError(message)
      console.error(`Error fetching ${table}:`, err)
    } finally {
      setLoading(false)
    }
  }, [table])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useSupabaseMutations<T extends { id: string }>(table: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = async (data: Partial<T>) => {
    setLoading(true)
    setError(null)
    try {
      const { data: result, error: err } = await supabase
        .from(table)
        .insert(data as never)
        .select()
        .single()

      if (err) throw new Error(err.message)
      return result as T
    } catch (err) {
      const message = err instanceof Error ? err.message : '创建失败'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: string, data: Partial<T>) => {
    setLoading(true)
    setError(null)
    try {
      const { data: result, error: err } = await supabase
        .from(table)
        .update(data as never)
        .eq('id', id)
        .select()
        .single()

      if (err) throw new Error(err.message)
      return result as T
    } catch (err) {
      const message = err instanceof Error ? err.message : '更新失败'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const { error: err } = await supabase.from(table).delete().eq('id', id)
      if (err) throw new Error(err.message)
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : '删除失败'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { create, update, remove, loading, error }
}

// 生成 slug
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    + '-' + Date.now().toString(36)
}

// News hooks
export function useNews() {
  return useSupabaseQuery<News>('news', {
    order: { column: 'created_at', ascending: false },
  })
}

export function useNewsMutations() {
  return useSupabaseMutations<News>('news')
}

// Cases hooks
export function useCases() {
  return useSupabaseQuery<Case>('cases', {
    order: { column: 'created_at', ascending: false },
  })
}

export function useCasesMutations() {
  return useSupabaseMutations<Case>('cases')
}

// Services hooks
export function useServices() {
  return useSupabaseQuery<Service>('services', {
    order: { column: 'sort_order', ascending: true },
  })
}

export function useServicesMutations() {
  return useSupabaseMutations<Service>('services')
}

// Messages hooks
export function useMessages() {
  return useSupabaseQuery<Message>('messages', {
    order: { column: 'created_at', ascending: false },
  })
}

export function useMessagesMutations() {
  return useSupabaseMutations<Message>('messages')
}
