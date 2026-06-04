import AI10Sidebar from "@/components/learn/AI10Sidebar"
import AppNavbar from "@/components/AppNavbar"

export default function AI10Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AppNavbar
        variant="learn"
        backHref="/dashboard"
        backLabel="Dashboard"
        courseTitle="Artificial Intelligence · Class X"
      />
      <div className="flex flex-1 min-h-0">
        <AI10Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}
