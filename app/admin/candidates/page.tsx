"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, ArrowLeft, User, Edit, Trash2, GraduationCap } from "lucide-react"

interface Candidate {
  id: string
  name: string
  studentId: string
  grade: string
  platform: string
  electionId: string
  electionTitle: string
  votes: number
}

export default function CandidateManagement() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      studentId: "ST2024001",
      grade: "Grade 12",
      platform: "Improving student facilities and organizing more cultural events",
      electionId: "1",
      electionTitle: "Student Council President 2024",
      votes: 89,
    },
    {
      id: "2",
      name: "Michael Chen",
      studentId: "ST2024002",
      grade: "Grade 11",
      platform: "Better communication between students and administration",
      electionId: "1",
      electionTitle: "Student Council President 2024",
      votes: 76,
    },
    {
      id: "3",
      name: "Emma Davis",
      studentId: "ST2024003",
      grade: "Grade 12",
      platform: "Environmental initiatives and sustainability programs",
      electionId: "1",
      electionTitle: "Student Council President 2024",
      votes: 92,
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      studentId: "ST2024004",
      grade: "Grade 10",
      platform: "Enhanced sports programs and equipment upgrades",
      electionId: "3",
      electionTitle: "Sports Committee Head",
      votes: 0,
    },
  ])

  const [newCandidate, setNewCandidate] = useState({
    name: "",
    studentId: "",
    grade: "",
    platform: "",
    electionId: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const elections = [
    { id: "1", title: "Student Council President 2024" },
    { id: "2", title: "Class Representative - Grade 12" },
    { id: "3", title: "Sports Committee Head" },
  ]

  const handleCreateCandidate = () => {
    const selectedElection = elections.find((e) => e.id === newCandidate.electionId)

    const candidate: Candidate = {
      id: Date.now().toString(),
      name: newCandidate.name,
      studentId: newCandidate.studentId,
      grade: newCandidate.grade,
      platform: newCandidate.platform,
      electionId: newCandidate.electionId,
      electionTitle: selectedElection?.title || "",
      votes: 0,
    }

    setCandidates([...candidates, candidate])
    setNewCandidate({ name: "", studentId: "", grade: "", platform: "", electionId: "" })
    setIsDialogOpen(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              <h1 className="text-2xl font-bold text-gray-900">Candidate Management</h1>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Candidate
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Candidate</DialogTitle>
                  <DialogDescription>Register a new candidate for an election.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newCandidate.name}
                      onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                      placeholder="Enter candidate's full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      value={newCandidate.studentId}
                      onChange={(e) => setNewCandidate({ ...newCandidate, studentId: e.target.value })}
                      placeholder="e.g., ST2024001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade</Label>
                    <Select onValueChange={(value) => setNewCandidate({ ...newCandidate, grade: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Grade 9">Grade 9</SelectItem>
                        <SelectItem value="Grade 10">Grade 10</SelectItem>
                        <SelectItem value="Grade 11">Grade 11</SelectItem>
                        <SelectItem value="Grade 12">Grade 12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="election">Election</Label>
                    <Select onValueChange={(value) => setNewCandidate({ ...newCandidate, electionId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select election" />
                      </SelectTrigger>
                      <SelectContent>
                        {elections.map((election) => (
                          <SelectItem key={election.id} value={election.id}>
                            {election.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platform">Campaign Platform</Label>
                    <Textarea
                      id="platform"
                      value={newCandidate.platform}
                      onChange={(e) => setNewCandidate({ ...newCandidate, platform: e.target.value })}
                      placeholder="Brief description of candidate's platform"
                    />
                  </div>
                  <Button onClick={handleCreateCandidate} className="w-full">
                    Add Candidate
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Candidates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                    <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{candidate.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {candidate.studentId}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        {candidate.grade}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-1">{candidate.electionTitle}</p>
                    <p className="text-sm text-gray-600 line-clamp-3">{candidate.platform}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-sm">
                      <span className="font-medium">{candidate.votes}</span>
                      <span className="text-gray-500 ml-1">votes</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {candidates.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates yet</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first candidate.</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Candidate
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
