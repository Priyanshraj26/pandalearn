import CNSidebar from "@/components/learn/CNSidebar"
import AppNavbar from "@/components/AppNavbar"

export default function CNLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <AppNavbar
        variant="learn"
        backHref="/engineering-track"
        backLabel="Engineering Track"
        courseTitle="Computer Networks"
      />

      <div className="flex flex-1 min-h-0">
        <CNSidebar />
        <main className="flex-1 min-w-0 overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}
