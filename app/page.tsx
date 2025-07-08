import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Vote, Users, BarChart3, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Vote className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">StudentVote</h1>
          </div>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/admin/login">
              <Button>Admin Portal</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Secure Digital Voting for Students</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Empower your student body with a modern, transparent, and secure voting platform. Make every voice count in
            your school elections.
          </p>
          <div className="space-x-4">
            <Link href="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Cast Your Vote
              </Button>
            </Link>
            <Link href="/results">
              <Button size="lg" variant="outline">
                View Results
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Secure & Anonymous</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your votes are encrypted and anonymous, ensuring complete privacy and security.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Easy to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Simple, intuitive interface that makes voting accessible to all students.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Real-time Results</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>View live results and comprehensive analytics as votes are counted.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 StudentVote. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
