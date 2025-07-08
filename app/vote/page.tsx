"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Vote, CheckCircle, LogOut, Calendar } from "lucide-react"

interface Candidate {
  id: string
  name: string
  grade: string
  platform: string
}

interface Election {
  id: string
  title: string
  description: string
  endDate: string
  candidates: Candidate[]
}

export default function VotingPage() {
  const router = useRouter()
  const [studentId, setStudentId] = useState("")
  const [selectedCandidates, setSelectedCandidates] = useState<{ [key: string]: string }>({})
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)

  const elections: Election[] = [
    {
      id: "1",
      title: "Student Council President 2024",
      description: "Choose your next student council president",
      endDate: "2024-03-15",
      candidates: [
        {
          id: "1",
          name: "Sarah Johnson",
          grade: "Grade 12",
          platform: "Improving student facilities and organizing more cultural events to bring our community together.",
        },
        {
          id: "2",
          name: "Michael Chen",
          grade: "Grade 11",
          platform: "Better communication between students and administration, ensuring every voice is heard.",
        },
        {
          id: "3",
          name: "Emma Davis",
          grade: "Grade 12",
          platform: "Environmental initiatives and sustainability programs to make our school greener.",
        },
      ],
    },
    {
      id: "3",
      title: "Sports Committee Head",
      description: "Select the leader for our sports programs",
      endDate: "2024-04-05",
      candidates: [
        {
          id: "4",
          name: "Alex Rodriguez",
          grade: "Grade 10",
          platform: "Enhanced sports programs and equipment upgrades for all students.",
        },
        {
          id: "5",
          name: "Jordan Smith",
          grade: "Grade 11",
          platform: "More inclusive sports activities and inter-school competitions.",
        },
      ],
    },
  ]

  useEffect(() => {
    const storedStudentId = localStorage.getItem("studentId")
    if (!storedStudentId) {
      router.push("/login")
    } else {
      setStudentId(storedStudentId)
      // Check if student has already voted
      const votedElections = localStorage.getItem(`voted_${storedStudentId}`)
      if (votedElections) {
        setHasVoted(true)
      }
    }
  }, [router])

  const handleVoteSelection = (electionId: string, candidateId: string) => {
    setSelectedCandidates((prev) => ({
      ...prev,
      [electionId]: candidateId,
    }))
  }

  const handleSubmitVotes = () => {
    setShowConfirmation(true)
  }

  const confirmVotes = () => {
    // Store votes (in real app, this would go to backend)
    localStorage.setItem(`voted_${studentId}`, JSON.stringify(selectedCandidates))
    localStorage.setItem(
      `votes_${studentId}`,
      JSON.stringify({
        timestamp: new Date().toISOString(),
        elections: selectedCandidates,
      }),
    )

    setHasVoted(true)
    setShowConfirmation(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("studentId")
    router.push("/")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (hasVoted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-800">Vote Submitted!</CardTitle>
            <CardDescription>
              Thank you for participating in the student elections. Your vote has been recorded securely.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">
                You can view the results once voting closes. Check back later for updates!
              </p>
            </div>
            <div className="space-y-2">
              <Button onClick={() => router.push("/results")} className="w-full">
                View Current Results
              </Button>
              <Button variant="outline" onClick={handleLogout} className="w-full bg-transparent">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Vote className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">StudentVote</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">Student: {studentId}</Badge>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Cast Your Vote</h2>
            <p className="text-gray-600">Select your preferred candidates for each election. You can only vote once.</p>
          </div>

          <div className="space-y-8">
            {elections.map((election) => (
              <Card key={election.id} className="overflow-hidden">
                <CardHeader className="bg-blue-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-blue-900">{election.title}</CardTitle>
                      <CardDescription className="mt-1 text-blue-700">{election.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-blue-600">
                      <Calendar className="h-4 w-4" />
                      <span>Ends: {election.endDate}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <RadioGroup
                    value={selectedCandidates[election.id] || ""}
                    onValueChange={(value) => handleVoteSelection(election.id, value)}
                  >
                    <div className="space-y-4">
                      {election.candidates.map((candidate) => (
                        <div
                          key={candidate.id}
                          className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <RadioGroupItem value={candidate.id} id={`${election.id}-${candidate.id}`} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={`${election.id}-${candidate.id}`} className="cursor-pointer">
                              <div className="flex items-start space-x-3">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                                  <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                                  <Badge variant="outline" className="mb-2">
                                    {candidate.grade}
                                  </Badge>
                                  <p className="text-sm text-gray-600">{candidate.platform}</p>
                                </div>
                              </div>
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <Button
              onClick={handleSubmitVotes}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={Object.keys(selectedCandidates).length === 0}
            >
              <Vote className="h-5 w-5 mr-2" />
              Submit My Votes
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Make sure to review your selections before submitting. You cannot change your vote after submission.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Votes</DialogTitle>
            <DialogDescription>
              Please review your selections before final submission. You cannot change your votes after confirming.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {Object.entries(selectedCandidates).map(([electionId, candidateId]) => {
              const election = elections.find((e) => e.id === electionId)
              const candidate = election?.candidates.find((c) => c.id === candidateId)
              return (
                <div key={electionId} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-sm text-gray-900">{election?.title}</p>
                  <p className="text-blue-600 font-semibold">{candidate?.name}</p>
                </div>
              )
            })}
            <div className="flex space-x-2 pt-4">
              <Button onClick={() => setShowConfirmation(false)} variant="outline" className="flex-1">
                Review Again
              </Button>
              <Button onClick={confirmVotes} className="flex-1 bg-green-600 hover:bg-green-700">
                Confirm & Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
