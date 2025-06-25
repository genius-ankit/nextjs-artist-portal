
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Music, Users, Mic, Headphones, Star, MapPin, Clock } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const artistCategories = [
    {
      id: 1,
      title: "Singers & Vocalists",
      description: "Professional singers for weddings, concerts, and events",
      icon: <Mic className="h-8 w-8 text-purple-600" />,
      count: "150+ Artists",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      title: "Dancers & Performers",
      description: "Dance troupes and solo performers for all occasions",
      icon: <Users className="h-8 w-8 text-blue-600" />,
      count: "200+ Artists",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: "DJs & Music Producers",
      description: "Professional DJs and music producers for parties",
      icon: <Headphones className="h-8 w-8 text-green-600" />,
      count: "100+ Artists",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: "Speakers & Hosts",
      description: "Motivational speakers and event hosts",
      icon: <Music className="h-8 w-8 text-orange-600" />,
      count: "80+ Artists",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const featuredArtists = [
    {
      name: "Sarah Johnson",
      category: "Singer",
      location: "Mumbai",
      rating: 4.9,
      price: "₹25,000 - ₹50,000",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop"
    },
    {
      name: "Dance Unity",
      category: "Dance Group",
      location: "Delhi",
      rating: 4.8,
      price: "₹40,000 - ₹80,000",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop"
    },
    {
      name: "DJ Rohit",
      category: "DJ",
      location: "Bangalore",
      rating: 4.7,
      price: "₹20,000 - ₹35,000",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">Artistly</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">Home</Link>
              <Link to="/artists" className="text-gray-700 hover:text-purple-600 transition-colors">Browse Artists</Link>
              <Link to="/onboard" className="text-gray-700 hover:text-purple-600 transition-colors">Join as Artist</Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 transition-colors">Dashboard</Link>
            </nav>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Artists</span>
            <br />for Your Events
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with talented performers, singers, dancers, and entertainers. 
            Book verified artists for weddings, corporate events, parties, and more.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search for singers, dancers, DJs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-0 bg-gray-50"
                />
              </div>
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8">
                Search Artists
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Verified Artists</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600">Events Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Find the perfect artist for your event type
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artistCategories.map((category) => (
              <Link key={category.id} to="/artists" className="group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      {category.icon}
                    </div>
                    <CardTitle className="text-xl mb-2">{category.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-sm font-semibold text-purple-600">
                      {category.count}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Featured Artists
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Top-rated performers ready for your next event
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtists.map((artist, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  <img 
                    src={artist.image} 
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{artist.rating}</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{artist.name}</span>
                    <span className="text-sm text-purple-600 font-normal">{artist.category}</span>
                  </CardTitle>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {artist.location}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{artist.price}</span>
                    <Button variant="outline" size="sm" className="hover:bg-purple-600 hover:text-white">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/artists">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8">
                View All Artists
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Book Your Perfect Artist?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of event planners who trust Artistly to make their events unforgettable
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/artists">
              <Button size="lg" variant="secondary" className="px-8">
                Browse Artists
              </Button>
            </Link>
            <Link to="/onboard">
              <Button size="lg" variant="outline" className="px-8 bg-transparent border-white text-white hover:bg-white hover:text-purple-600">
                Join as Artist
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Music className="h-6 w-6 text-purple-400" />
                <span className="text-xl font-bold">Artistly</span>
              </div>
              <p className="text-gray-400">
                Connecting talented artists with event planners worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Event Planners</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/artists" className="hover:text-white transition-colors">Browse Artists</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Artists</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/onboard" className="hover:text-white transition-colors">Join Artistly</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Artist Dashboard</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Artistly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
