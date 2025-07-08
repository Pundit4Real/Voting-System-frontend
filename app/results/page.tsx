"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Users, Vote, Crown, Calendar, ArrowLeft } from "lucide-react"

interface CandidateResult {
  id: string
  name: string
  grade: string
  votes: number
  percentage: number
  isWinner?: boolean
}

interface ElectionResult {
  id: string
  title: string
  description: string
  status: "active" | "ended"
  endDate: string
  totalVotes: number
  totalEligible: number
  turnout: number
  candidates: CandidateResult[]
}

export default function ResultsPage() {
  const [selectedElection, setSelectedElection] = useState("1")

  const electionResults: ElectionResult[] = [
    {
      id: "1",
      title: "Student Council President 2024",
      description: "Annual election for student council president position",
      status: "active",
      endDate: "2024-03-15",
      totalVotes: 342,
      totalEligible: 500,
      turnout: 68.4,
      candidates: [
        {
          id: "3",
          name: "Emma Davis",
          grade: "Grade 12",
          votes: 156,
          percentage: 45.6,
          isWinner: true,
        },
        {
          id: "1",
          name: "Sarah Johnson",
          grade: "Grade 12",
          votes: 124,
          percentage: 36.3,
        },
        {
          id: "2",
          name: "Michael Chen",
          grade: "Grade 11",
          votes: 62,
          percentage: 18.1,
        },
      ],
    },
    {
      id: "2",
      title: "Class Representative - Grade 12",
      description: "Election for Grade 12 class representative",
      status: "ended",
      endDate: "2024-02-28",
      totalVotes: 89,
      totalEligible: 120,
      turnout: 74.2,
      candidates: [
        {
          id: "4",
          name: "Jessica Wong",
          grade: "Grade 12",
          votes: 52,
          percentage: 58.4,
          isWinner: true,
        },
        {
          id: "5",
          name: "David Kim",
          grade: "Grade 12",
          votes: 37,
          percentage: 41.6,
        },
      ],
    },
    {
      id: "3",
      title: "Sports Committee Head",
      description: "Election for head of sports committee",
      status: "active",
      endDate: "2024-04-05",
      totalVotes: 45,
      totalEligible: 500,
      turnout: 9.0,
      candidates: [
        {
          id: "6",
          name: "Alex Rodriguez",
          grade: "Grade 10",
          votes: 28,
          percentage: 62.2,
        },
        {
          id: "7",
          name: "Jordan Smith",
          grade: "Grade 11",
          votes: 17,
          percentage: 37.8,
        },
      ],
    },
  ]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const currentElection = electionResults.find((e) => e.id === selectedElection)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Election Results</h1>
              </div>
            </div>
            <Link href="/login">
              <Button>Cast Your Vote</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Overview Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Elections</CardTitle>
                <Vote className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Currently running</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Votes Cast</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">476</div>
                <p className="text-xs text-muted-foreground">Across all elections</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Turnout</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">50.5%</div>
                <p className="text-xs text-muted-foreground">Student participation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eligible Voters</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,120</div>
                <p className="text-xs text-muted-foreground">Registered students</p>
              </CardContent>
            </Card>
          </div>

          {/* Election Results */}
          <Tabs value={selectedElection} onValueChange={setSelectedElection}>
            <TabsList className="grid w-full grid-cols-3">
              {electionResults.map((election) => (
                <TabsTrigger key={election.id} value={election.id} className="text-sm">
                  {election.title.split(" ").slice(0, 2).join(" ")}
                </TabsTrigger>
              ))}
            </TabsList>

            {electionResults.map((election) => (
              <TabsContent key={election.id} value={election.id} className="space-y-6">
                {/* Election Info */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{election.title}</CardTitle>
                        <CardDescription className="mt-2">{election.description}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(election.status)}>
                        {election.status === "active" ? "Live Results" : "Final Results"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">End Date</p>
                          <p className="text-sm text-gray-600">{election.endDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Vote className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Total Votes</p>
                          <p className="text-sm text-gray-600">{election.totalVotes}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Eligible Voters</p>
                          <p className="text-sm text-gray-600">{election.totalEligible}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Turnout</p>
                          <p className="text-sm text-gray-600">{election.turnout}%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Candidates Results */}
                <div className="space-y-4">
                  {election.candidates.map((candidate, index) => (
                    <Card
                      key={candidate.id}
                      className={candidate.isWinner ? "ring-2 ring-yellow-400 bg-yellow-50" : ""}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                            {candidate.isWinner && <Crown className="h-6 w-6 text-yellow-500" />}
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                              <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
                            </Avatar>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {candidate.name}
                                  {candidate.isWinner && (
                                    <Badge className="ml-2 bg-yellow-100 text-yellow-800">Winner</Badge>
                                  )}
                                </h3>
                                <p className="text-sm text-gray-600">{candidate.grade}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">{candidate.votes}</div>
                                <div className="text-sm text-gray-600">{candidate.percentage}%</div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Progress value={candidate.percentage} className="h-3" />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>{candidate.votes} votes</span>
                                <span>{candidate.percentage}% of total</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
