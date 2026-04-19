import Sidebar from '@/components/admin/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-[1280px] mx-auto flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8 pt-22 md:pt-8 overflow-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
