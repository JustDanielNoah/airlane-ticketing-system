
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Plane, Wifi, Coffee, Tv } from 'lucide-react';

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    time: string;
    airport: string;
    city: string;
  };
  arrival: {
    time: string;
    airport: string;
    city: string;
  };
  duration: string;
  stops: number;
  aircraft: string;
  price: {
    economy: number;
    premium: number;
    business: number;
    first: number;
  };
  amenities: string[];
}

const FlightResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('economy');
  const [sortBy, setSortBy] = useState('price');
  
  const searchParams = location.state?.searchParams;

  const mockFlights: Flight[] = [
    {
      id: 'SA101',
      airline: 'SkyAirlines',
      flightNumber: 'SA 101',
      departure: { time: '08:00', airport: 'JFK', city: 'New York' },
      arrival: { time: '11:30', airport: 'LAX', city: 'Los Angeles' },
      duration: '5h 30m',
      stops: 0,
      aircraft: 'Boeing 737-800',
      price: { economy: 299, premium: 499, business: 899, first: 1299 },
      amenities: ['wifi', 'entertainment', 'meal']
    },
    {
      id: 'SA205',
      airline: 'SkyAirlines',
      flightNumber: 'SA 205',
      departure: { time: '14:15', airport: 'JFK', city: 'New York' },
      arrival: { time: '17:45', airport: 'LAX', city: 'Los Angeles' },
      duration: '5h 30m',
      stops: 0,
      aircraft: 'Airbus A320',
      price: { economy: 349, premium: 549, business: 949, first: 1399 },
      amenities: ['wifi', 'entertainment', 'meal', 'power']
    },
    {
      id: 'SA311',
      airline: 'SkyAirlines',
      flightNumber: 'SA 311',
      departure: { time: '19:30', airport: 'JFK', city: 'New York' },
      arrival: { time: '23:00', airport: 'LAX', city: 'Los Angeles' },
      duration: '5h 30m',
      stops: 0,
      aircraft: 'Boeing 787-9',
      price: { economy: 279, premium: 479, business: 879, first: 1199 },
      amenities: ['wifi', 'entertainment', 'meal', 'power', 'lie-flat']
    }
  ];

  const handleSelectFlight = (flight: Flight) => {
    navigate('/seat-selection', {
      state: {
        selectedFlight: flight,
        searchParams: searchParams,
        selectedClass: selectedClass
      }
    });
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'entertainment': return <Tv className="w-4 h-4" />;
      case 'meal': return <Coffee className="w-4 h-4" />;
      default: return <Plane className="w-4 h-4" />;
    }
  };

  const sortedFlights = [...mockFlights].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price[selectedClass as keyof typeof a.price] - b.price[selectedClass as keyof typeof b.price];
    }
    if (sortBy === 'departure') {
      return a.departure.time.localeCompare(b.departure.time);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Summary */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold">
                  {searchParams?.origin} → {searchParams?.destination}
                </div>
                <Badge variant="outline">
                  {searchParams?.tripType === 'roundtrip' ? 'Round Trip' : 'One Way'}
                </Badge>
                <span className="text-gray-600">
                  {searchParams?.passengers.adults} passenger(s)
                </span>
              </div>
              <Button variant="outline" onClick={() => navigate('/')}>
                Modify Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Travel Class</label>
                  <Tabs value={selectedClass} onValueChange={setSelectedClass} orientation="vertical">
                    <TabsList className="grid w-full grid-cols-1 h-auto">
                      <TabsTrigger value="economy" className="justify-start">Economy</TabsTrigger>
                      <TabsTrigger value="premium" className="justify-start">Premium Economy</TabsTrigger>
                      <TabsTrigger value="business" className="justify-start">Business</TabsTrigger>
                      <TabsTrigger value="first" className="justify-start">First Class</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <Separator />
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="price">Price (Low to High)</option>
                    <option value="departure">Departure Time</option>
                    <option value="duration">Flight Duration</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Flight Results */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Available Flights</h2>
              <span className="text-gray-600">{sortedFlights.length} flights found</span>
            </div>

            {sortedFlights.map((flight) => (
              <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                    {/* Flight Details */}
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <Plane className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold">{flight.airline}</div>
                          <div className="text-sm text-gray-600">{flight.flightNumber} • {flight.aircraft}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-xl font-bold">{flight.departure.time}</div>
                          <div className="text-sm text-gray-600">{flight.departure.airport}</div>
                          <div className="text-xs text-gray-500">{flight.departure.city}</div>
                        </div>
                        
                        <div className="flex-1 text-center">
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {flight.duration}
                          </div>
                          <div className="h-px bg-gray-300 my-2"></div>
                          <div className="text-xs text-gray-500">
                            {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop(s)`}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-xl font-bold">{flight.arrival.time}</div>
                          <div className="text-sm text-gray-600">{flight.arrival.airport}</div>
                          <div className="text-xs text-gray-500">{flight.arrival.city}</div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex items-center gap-2 mt-4">
                        {flight.amenities.map((amenity) => (
                          <div key={amenity} className="flex items-center gap-1 text-xs text-gray-600">
                            {getAmenityIcon(amenity)}
                            <span className="capitalize">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        ${flight.price[selectedClass as keyof typeof flight.price]}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">{selectedClass}</div>
                      <div className="text-xs text-gray-500 mt-1">per person</div>
                    </div>

                    {/* Select Button */}
                    <div>
                      <Button 
                        onClick={() => handleSelectFlight(flight)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Select Flight
                      </Button>
                      <Button variant="ghost" className="w-full mt-2 text-sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightResults;
