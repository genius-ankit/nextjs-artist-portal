
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Music, Filter, Star, MapPin, Grid, List } from "lucide-react";

const Artists = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  // Mock artist data
  const artistsData = [
    {
      id: 1,
      name: "Sarah Johnson",
      category: "Singer",
      location: "Mumbai",
      rating: 4.9,
      reviews: 124,
      priceRange: "₹25,000 - ₹50,000",
      priceMin: 25000,
      bio: "Professional singer with 8+ years experience in weddings and corporate events",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
      languages: ["Hindi", "English", "Punjabi"],
      verified: true
    },
    {
      id: 2,
      name: "Dance Unity",
      category: "Dancer",
      location: "Delhi",
      rating: 4.8,
      reviews: 89,
      priceRange: "₹40,000 - ₹80,000",
      priceMin: 40000,
      bio: "Contemporary dance group specializing in Bollywood and fusion performances",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
      languages: ["Hindi", "English"],
      verified: true
    },
    {
      id: 3,
      name: "DJ Rohit",
      category: "DJ", 
      location: "Bangalore",
      rating: 4.7,
      reviews: 156,
      priceRange: "₹20,000 - ₹35,000",
      priceMin: 20000,
      bio: "Electronic music producer and DJ with experience in nightclubs and parties",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
      languages: ["English", "Kannada", "Hindi"],
      verified: true
    },
    {
      id: 4,
      name: "Priya Sharma",
      category: "Singer",
      location: "Mumbai",
      rating: 4.9,
      reviews: 203,
      priceRange: "₹30,000 - ₹60,000",
      priceMin: 30000,
      bio: "Classical and contemporary singer, perfect for traditional and modern events",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop",
      languages: ["Hindi", "English", "Marathi"],
      verified: true
    },
    {
      id: 5,
      name: "Rajesh Mehta",
      category: "Speaker",
      location: "Delhi",
      rating: 4.6,
      reviews: 67,
      priceRange: "₹15,000 - ₹25,000",
      priceMin: 15000,
      bio: "Motivational speaker and corporate trainer with 10+ years experience",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=400&fit=crop",
      languages: ["Hindi", "English"],
      verified: false
    },
    {
      id: 6,
      name: "Fusion Beats",
      category: "DJ",
      location: "Goa",
      rating: 4.8,
      reviews: 91,
      priceRange: "₹35,000 - ₹70,000",
      priceMin: 35000,
      bio: "Professional DJ duo specializing in beach parties and destination weddings",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=400&fit=crop",
      languages: ["English", "Hindi", "Konkani"],
      verified: true
    }
  ];

  const filteredArtists = useMemo(() => {
    return artistsData.filter(artist => {
      const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           artist.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           artist.bio.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || artist.category.toLowerCase() === categoryFilter.toLowerCase();
      const matchesLocation = locationFilter === "all" || artist.location === locationFilter;
      
      let matchesPrice = true;
      if (priceFilter !== "all") {
        const [min, max] = priceFilter.split("-").map(Number);
        matchesPrice = artist.priceMin >= min && artist.priceMin <= max;
      }
      
      return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
    });
  }, [searchQuery, categoryFilter, locationFilter, priceFilter, artistsData]);

  const categories = ["All", "Singer", "Dancer", "DJ", "Speaker"];
  const locations = ["All", ...Array.from(new Set(artistsData.map(a => a.location)))];

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
              <Link to="/artists" className="text-purple-600 font-semibold">Browse Artists</Link>
              <Link to="/onboard" className="text-gray-700 hover:text-purple-600 transition-colors">Join as Artist</Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 transition-colors">Dashboard</Link>
            </nav>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Artists</h1>
          <p className="text-xl text-gray-600">Discover talented performers for your next event</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="singer">Singers</SelectItem>
                <SelectItem value="dancer">Dancers</SelectItem>
                <SelectItem value="dj">DJs</SelectItem>
                <SelectItem value="speaker">Speakers</SelectItem>
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Goa">Goa</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Filter */}
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-25000">₹0 - ₹25,000</SelectItem>
                <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
                <SelectItem value="50000-100000">₹50,000+</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="flex-1"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="flex-1"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{filteredArtists.length} artists found</span>
            <div className="flex gap-2">
              {categoryFilter !== "all" && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  {categoryFilter}
                </Badge>
              )}
              {locationFilter !== "all" && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {locationFilter}
                </Badge>
              )}
              {priceFilter !== "all" && (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {priceFilter.split("-").join(" - ₹")}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Artists Grid */}
        <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {filteredArtists.map((artist) => (
            <Card key={artist.id} className={`overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${viewMode === "list" ? "md:flex" : ""}`}>
              <div className={`${viewMode === "list" ? "md:w-64 md:flex-shrink-0" : ""} aspect-square bg-gray-200 relative overflow-hidden`}>
                <img 
                  src={artist.image} 
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
                {artist.verified && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    ✓ Verified
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">{artist.rating}</span>
                </div>
              </div>
              
              <div className="flex-1">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">{artist.name}</CardTitle>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {artist.location}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-purple-600 border-purple-200">
                      {artist.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {artist.bio}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {artist.languages.map((lang) => (
                        <Badge key={lang} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{artist.rating} ({artist.reviews} reviews)</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">{artist.priceRange}</div>
                        <div className="text-sm text-gray-500">per event</div>
                      </div>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Ask for Quote
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No artists found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Artists;
