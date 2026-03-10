import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PublicLayout } from '@/components/layout/Layout'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { HomePage } from '@/pages/public/HomePage'
import { AboutPage } from '@/pages/public/AboutPage'
import { ServicesPage } from '@/pages/public/ServicesPage'
import { CasesPage } from '@/pages/public/CasesPage'
import { NewsPage } from '@/pages/public/NewsPage'
import { ContactPage } from '@/pages/public/ContactPage'
import { AdminLoginPage } from '@/pages/admin/LoginPage'
import { AdminDashboard } from '@/pages/admin/DashboardPage'
import { NewsManagePage } from '@/pages/admin/NewsManagePage'
import { CasesManagePage } from '@/pages/admin/CasesManagePage'
import { ServicesManagePage } from '@/pages/admin/ServicesManagePage'
import { MessagesManagePage } from '@/pages/admin/MessagesManagePage'
import { UsersManagePage } from '@/pages/admin/UsersManagePage'
import { SettingsPage } from '@/pages/admin/SettingsPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
})

const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'cases', element: <CasesPage /> },
      { path: 'cases/:id', element: <CasesPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'news/:id', element: <NewsPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
  // Admin Routes
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'news', element: <NewsManagePage /> },
      { path: 'cases', element: <CasesManagePage /> },
      { path: 'services', element: <ServicesManagePage /> },
      { path: 'messages', element: <MessagesManagePage /> },
      { path: 'users', element: <UsersManagePage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  // Admin Login
  { path: '/admin/login', element: <AdminLoginPage /> },
  // Catch all - redirect to home
  { path: '*', element: <Navigate to="/" replace /> },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
