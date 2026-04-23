import Sidebar from '@/components/admin/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex overflow-hidden bg-neutral-50">
      <Sidebar />
      <main className="flex-1 px-6 py-8 pt-22 md:pt-8 overflow-y-auto min-w-0">
        {children}
      </main>
    </div>
  )
}
