import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">Kanotion Dashboard</div>
            <div className="flex items-center gap-4">
              <Link 
                href="/board" 
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Create Board
              </Link>
              <UserButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to Kanotion! 🎉</h1>
          <p className="text-gray-600 mb-6">
            Your Kanban board management system is ready. Start by creating your first board.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <div className="text-4xl mb-2">📋</div>
              <h3 className="font-semibold mb-2">Create Board</h3>
              <p className="text-sm text-gray-500">Start with a new Kanban board</p>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <div className="text-4xl mb-2">🚀</div>
              <h3 className="font-semibold mb-2">Quick Start</h3>
              <p className="text-sm text-gray-500">Use a template</p>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <div className="text-4xl mb-2">📊</div>
              <h3 className="font-semibold mb-2">View Analytics</h3>
              <p className="text-sm text-gray-500">See your team's performance</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}