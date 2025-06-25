
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music, Search, Filter, Eye, MessageSquare, CheckCircle, XCircle, Clock, Users, Star, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data for artist submissions
  const artistSubmissions = [
    {
      id: 1,
      name: "Priya Sharma",
      category: "Singer",
      city: "Mumbai",
      feeRange: "₹25,000 - ₹50,000",
      submittedDate: "2025-06-23",
      status: "pending",
      experience: "Experienced",
      rating: 4.8,
      languages: ["Hindi", "English", "Marathi"]
    },
    {
      id: 2,
      name: "Arjun Dance Crew",
      category: "Dancer",
      city: "Delhi",
      feeRange: "₹40,000 - ₹80,000",
      submittedDate: "2025-06-22",
      status: "approved",
      experience: "Expert",
      rating: 4.9,
      languages: ["Hindi", "English", "Punjabi"]
    },
    {
      id: 3,
      name: "DJ Maya",
      category: "DJ",
      city: "Bangalore",
      feeRange: "₹30,000 - ₹60,000",
      submittedDate: "2025-06-21",
      status: "pending",
      experience: "Intermediate",
      rating: 4.6,
      languages: ["English", "Kannada", "Hindi"]
    },
    {
      id: 4,
      name: "Rajesh Motivator",
      category: "Speaker",
      city: "Pune",
      feeRange: "₹15,000 - ₹25,000",
      submittedDate: "2025-06-20",
      status: "rejected",
      experience: "Experienced",
      rating: 4.3,
      languages: ["Hindi", "English", "Marathi"]
    },
    {
      id: 5,
      name: "Fusion Beats",
      category: "DJ",
      city: "Goa",
      feeRange: "₹50,000 - ₹100,000",
      submittedDate: "2025-06-19",
      status: "approved",
      experience: "Expert",
      rating: 4.9,
      languages: ["English", "Hindi", "Konkani"]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredSubmissions = artistSubmissions.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || artist.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalArtists: artistSubmissions.length,
    pendingReview: artistSubmissions.filter(a => a.status === "pending").length,
    approved: artistSubmissions.filter(a => a.status === "approved").length,
    avgRating: 4.7
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">Artistly</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">Home</Link>
              <Link to="/artists" className="text-gray-700 hover:text-purple-600 transition-colors">Browse Artists</Link>
              <Link to="/onboard" className="text-gray-700 hover:text-purple-600 transition-colors">Join as Artist</Link>
              <Link to="/dashboard" className="text-purple-600 font-semibold">Dashboard</Link>
            </nav>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Add New Artist
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Manager Dashboard</h1>
          <p className="text-xl text-gray-600">Manage artist applications and bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Artists</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalArtists}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingReview}</div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Artists</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approved}</div>
              <p className="text-xs text-muted-foreground">
                Active on platform
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgRating}★</div>
              <p className="text-xs text-muted-foreground">
                Across all artists
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Artist Submissions</CardTitle>
            <CardDescription>
              Review and manage artist applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search artists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Artists Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Artist Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Fee Range</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((artist) => (
                    <TableRow key={artist.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold">{artist.name}</div>
                          <div className="text-sm text-gray-500">
                            {artist.languages.join(", ")}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{artist.category}</Badge>
                      </TableCell>
                      <TableCell>{artist.city}</TableCell>
                      <TableCell>{artist.feeRange}</TableCell>
                      <TableCell>{artist.experience}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          {artist.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(artist.status)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(artist.submittedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {artist.status === "pending" && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="destructive">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredSubmissions.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <Users className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No artists found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">This Month</span>
                  <span className="font-semibold">15 Applications</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Approval Rate</span>
                  <span className="font-semibold">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Avg Response Time</span>
                  <span className="font-semibold">2.3 days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <span className="font-semibold">Priya Sharma</span> submitted application
                  <div className="text-gray-500">2 hours ago</div>
                </div>
                <div className="text-sm">
                  <span className="font-semibold">DJ Maya</span> profile approved
                  <div className="text-gray-500">1 day ago</div>
                </div>
                <div className="text-sm">
                  <span className="font-semibold">Arjun Dance Crew</span> got 5★ rating
                  <div className="text-gray-500">2 days ago</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Singers</span>
                  <Badge variant="secondary">40%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Dancers</span>
                  <Badge variant="secondary">30%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">DJs</span>
                  <Badge variant="secondary">20%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Speakers</span>
                  <Badge variant="secondary">10%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
