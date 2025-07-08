"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, ArrowLeft, Calendar, Users, Edit, Trash2, Play, Pause, BarChart3 } from "lucide-react"

interface Election {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: "draft" | "active" | "ended"
  candidates: number
  votes: number
}

export default function ElectionManagement() {
  const [elections, setElections] = useState<Election[]>([
    {
      id: "1",
      title: "Student Council President 2024",
      description: "Annual election for student council president position",
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      status: "active",
      candidates: 4,
      votes: 342,
    },
    {
      id: "2",
      title: "Class Representative - Grade 12",
      description: "Election for Grade 12 class representative",
      startDate: "2024-02-15",
      endDate: "2024-02-28",
      status: "ended",
      candidates: 6,
      votes: 89,
    },
    {
      id: "3",
      title: "Sports Committee Head",
      description: "Election for head of sports committee",
      startDate: "2024-03-20",
      endDate: "2024-04-05",
      status: "draft",
      candidates: 3,
      votes: 0,
    },
  ])

  const [newElection, setNewElection] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateElection = () => {
    const election: Election = {
      id: Date.now().toString(),
      title: newElection.title,
      description: newElection.description,
      startDate: newElection.startDate,
      endDate: newElection.endDate,
      status: "draft",
      candidates: 0,
      votes: 0,
    }

    setElections([...elections, election])
    setNewElection({ title: "", description: "", startDate: "", endDate: "" })
    setIsDialogOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "ended":
        return "bg-gray-100 text-gray-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
              <h1 className="text-2xl font-bold text-gray-900">Election Management</h1>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Election
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Election</DialogTitle>
                  <DialogDescription>Set up a new election for students to participate in.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Election Title</Label>
                    <Input
                      id="title"
                      value={newElection.title}
                      onChange={(e) => setNewElection({ ...newElection, title: e.target.value })}
                      placeholder="e.g., Student Council President 2024"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newElection.description}
                      onChange={(e) => setNewElection({ ...newElection, description: e.target.value })}
                      placeholder="Brief description of the election"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newElection.startDate}
                        onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newElection.endDate}
                        onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button onClick={handleCreateElection} className="w-full">
                    Create Election
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Elections Grid */}
        <div className="grid gap-6">
          {elections.map((election) => (
            <Card key={election.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{election.title}</CardTitle>
                    <CardDescription className="mt-2">{election.description}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(election.status)}>
                    {election.status.charAt(0).toUpperCase() + election.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Start Date</p>
                      <p className="text-sm text-gray-600">{election.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">End Date</p>
                      <p className="text-sm text-gray-600">{election.endDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Candidates</p>
                      <p className="text-sm text-gray-600">{election.candidates}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Votes</p>
                      <p className="text-sm text-gray-600">{election.votes}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Link href={`/admin/candidates?election=${election.id}`}>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Candidates
                    </Button>
                  </Link>
                  {election.status === "draft" && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Play className="h-4 w-4 mr-2" />
                      Start Election
                    </Button>
                  )}
                  {election.status === "active" && (
                    <Button size="sm" variant="destructive">
                      <Pause className="h-4 w-4 mr-2" />
                      End Election
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
