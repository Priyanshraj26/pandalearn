import AISidebar from "@/components/learn/AISidebar"
import AppNavbar from "@/components/AppNavbar"

export default function AILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AppNavbar
        variant="learn"
        backHref="/dashboard"
        backLabel="Dashboard"
        courseTitle="Artificial Intelligence · Class IX"
      />
      <div className="flex flex-1 min-h-0">
        <AISidebar />
        <main className="flex-1 min-w-0 overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}
