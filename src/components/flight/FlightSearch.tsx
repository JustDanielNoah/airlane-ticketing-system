
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, Users, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const FlightSearch = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState('roundtrip');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [travelClass, setTravelClass] = useState('economy');

  const popularDestinations = [
    { code: 'LAX', city: 'Los Angeles', country: 'USA', price: '$299' },
    { code: 'JFK', city: 'New York', country: 'USA', price: '$399' },
    { code: 'LHR', city: 'London', country: 'UK', price: '$699' },
    { code: 'CDG', city: 'Paris', country: 'France', price: '$649' },
    { code: 'NRT', city: 'Tokyo', country: 'Japan', price: '$899' },
    { code: 'DXB', city: 'Dubai', country: 'UAE', price: '$799' },
  ];

  const handleSearch = () => {
    if (origin && destination && departureDate) {
      navigate('/results', {
        state: {
          searchParams: {
            origin,
            destination,
            departureDate,
            returnDate,
            passengers,
            travelClass,
            tripType
          }
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent"></div>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white mb-12">
            <h1 className="text-5xl font-bold mb-4">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Book flights to over 1,000 destinations worldwide with SkyAirlines
            </p>
          </div>

          {/* Search Form */}
          <Card className="max-w-4xl mx-auto shadow-2xl">
            <CardHeader className="pb-4">
              <Tabs value={tripType} onValueChange={setTripType} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="roundtrip">Round Trip</TabsTrigger>
                  <TabsTrigger value="oneway">One Way</TabsTrigger>
                  <TabsTrigger value="multicity">Multi-City</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Origin and Destination */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    From
                  </Label>
                  <Input
                    id="origin"
                    placeholder="Enter departure city or airport"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    To
                  </Label>
                  <Input
                    id="destination"
                    placeholder="Enter destination city or airport"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Departure Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-12 justify-start text-left font-normal"
                      >
                        {departureDate ? (
                          format(departureDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={departureDate}
                        onSelect={setDepartureDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {tripType === 'roundtrip' && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      Return Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-12 justify-start text-left font-normal"
                        >
                          {returnDate ? (
                            format(returnDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={setReturnDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>

              {/* Passengers and Class */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Passengers
                  </Label>
                  <Select value={`${passengers.adults}-${passengers.children}-${passengers.infants}`}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-0-0">1 Adult</SelectItem>
                      <SelectItem value="2-0-0">2 Adults</SelectItem>
                      <SelectItem value="2-1-0">2 Adults, 1 Child</SelectItem>
                      <SelectItem value="2-2-0">2 Adults, 2 Children</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Travel Class</Label>
                  <Select value={travelClass} onValueChange={setTravelClass}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="premium">Premium Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                size="lg"
              >
                Search Flights
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.map((dest) => (
              <Card key={dest.code} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{dest.city}</h3>
                      <p className="text-gray-600">{dest.country}</p>
                      <Badge variant="secondary" className="mt-2">
                        {dest.code}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">From</p>
                      <p className="text-2xl font-bold text-blue-600">{dest.price}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setDestination(dest.code);
                      document.getElementById('destination')?.focus();
                    }}
                  >
                    Select Destination
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
