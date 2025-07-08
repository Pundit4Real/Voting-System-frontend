"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Crown, ArrowLeft, Download, RefreshCw } from "lucide-react"

export default function AdminResultsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth")
    if (!adminAuth) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  const electionResults = [
    {
      id: "1",
      title: "Student Council President 2024",
      status: "active",
      totalVotes: 342,
      totalEligible: 500,
      turnout: 68.4,
      candidates: [
        { name: "Emma Davis", votes: 156, percentage: 45.6, isWinner: true },
        { name: "Sarah Johnson", votes: 124, percentage: 36.3 },
        { name: "Michael Chen", votes: 62, percentage: 18.1 },
      ],
    },
    {
      id: "2",
      title: "Class Representative - Grade 12",
      status: "ended",
      totalVotes: 89,
      totalEligible: 120,
      turnout: 74.2,
      candidates: [
        { name: "Jessica Wong", votes: 52, percentage: 58.4, isWinner: true },
        { name: "David Kim", votes: 37, percentage: 41.6 },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Results & Analytics</h1>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Participation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">431</div>
              <p className="text-sm text-gray-600">votes cast across all elections</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Turnout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">71.3%</div>
              <p className="text-sm text-gray-600">student participation rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Elections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">1</div>
              <p className="text-sm text-gray-600">currently accepting votes</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {electionResults.map((election) => (
            <Card key={election.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{election.title}</CardTitle>
                    <CardDescription>
                      {election.totalVotes} votes • {election.turnout}% turnout
                    </CardDescription>
                  </div>
                  <Badge variant={election.status === "active" ? "default" : "secondary"}>{election.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {election.candidates.map((candidate, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 text-center font-bold text-gray-400">#{index + 1}</div>
                      {candidate.isWinner && <Crown className="h-5 w-5 text-yellow-500" />}
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{candidate.name}</span>
                          <span className="text-sm text-gray-600">
                            {candidate.votes} votes ({candidate.percentage}%)
                          </span>
                        </div>
                        <Progress value={candidate.percentage} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
