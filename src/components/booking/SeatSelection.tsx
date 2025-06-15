
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Seat {
  id: string;
  row: number;
  letter: string;
  type: 'economy' | 'premium' | 'business' | 'first';
  status: 'available' | 'occupied' | 'selected' | 'blocked';
  price?: number;
  features?: string[];
}

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedFlight, searchParams, selectedClass } = location.state || {};
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Mock seat map for Boeing 737-800
  const generateSeatMap = (): Seat[] => {
    const seats: Seat[] = [];
    const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    // First Class (rows 1-3)
    for (let row = 1; row <= 3; row++) {
      for (let i = 0; i < 4; i++) {
        const letter = ['A', 'B', 'D', 'E'][i];
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          type: 'first',
          status: Math.random() > 0.7 ? 'occupied' : 'available',
          price: 150,
          features: ['Extra legroom', 'Premium service']
        });
      }
    }

    // Business Class (rows 4-8)
    for (let row = 4; row <= 8; row++) {
      seatLetters.forEach(letter => {
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          type: 'business',
          status: Math.random() > 0.6 ? 'occupied' : 'available',
          price: 75,
          features: ['Extra legroom', 'Priority boarding']
        });
      });
    }

    // Premium Economy (rows 9-12)
    for (let row = 9; row <= 12; row++) {
      seatLetters.forEach(letter => {
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          type: 'premium',
          status: Math.random() > 0.5 ? 'occupied' : 'available',
          price: 35,
          features: ['Extra legroom']
        });
      });
    }

    // Economy (rows 13-35)
    for (let row = 13; row <= 35; row++) {
      seatLetters.forEach(letter => {
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          type: 'economy',
          status: Math.random() > 0.4 ? 'occupied' : 'available',
          price: 0
        });
      });
    }

    return seats;
  };

  const [seatMap] = useState<Seat[]>(generateSeatMap());

  const handleSeatClick = (seatId: string) => {
    const seat = seatMap.find(s => s.id === seatId);
    if (!seat || seat.status === 'occupied' || seat.status === 'blocked') return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length < searchParams?.passengers.adults) {
        setSelectedSeats(prev => [...prev, seatId]);
      }
    }
  };

  const getSeatColor = (seat: Seat) => {
    if (selectedSeats.includes(seat.id)) return 'bg-blue-600 text-white';
    if (seat.status === 'occupied') return 'bg-gray-400 text-gray-600 cursor-not-allowed';
    if (seat.status === 'blocked') return 'bg-red-200 text-red-600 cursor-not-allowed';
    
    switch (seat.type) {
      case 'first': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'business': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'premium': return 'bg-green-100 text-green-800 hover:bg-green-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const groupedSeats = seatMap.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<number, Seat[]>);

  const selectedSeatDetails = selectedSeats.map(seatId => 
    seatMap.find(seat => seat.id === seatId)
  ).filter(Boolean);

  const totalSeatFees = selectedSeatDetails.reduce((sum, seat) => sum + (seat?.price || 0), 0);

  const handleContinue = () => {
    navigate('/confirmation', {
      state: {
        selectedFlight,
        searchParams,
        selectedClass,
        selectedSeats: selectedSeatDetails,
        totalSeatFees
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Select Your Seats</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span>{selectedFlight?.flightNumber}</span>
              <span>•</span>
              <span>{selectedFlight?.departure.airport} → {selectedFlight?.arrival.airport}</span>
              <span>•</span>
              <span>{selectedFlight?.aircraft}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Seat Map */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Aircraft Seat Map
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-100 border rounded"></div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-400 rounded"></div>
                        <span>Occupied</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-600 rounded"></div>
                        <span>Selected</span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Aircraft Outline */}
                  <div className="max-w-md mx-auto bg-white border-2 border-gray-300 rounded-t-full rounded-b-lg p-6">
                    <div className="space-y-2">
                      {Object.entries(groupedSeats).map(([row, seats]) => (
                        <div key={row} className="flex items-center justify-center gap-1">
                          <span className="w-6 text-xs text-gray-500 text-center">{row}</span>
                          
                          {/* Left side seats */}
                          <div className="flex gap-1">
                            {seats.filter(seat => ['A', 'B', 'C'].includes(seat.letter)).map(seat => (
                              <button
                                key={seat.id}
                                onClick={() => handleSeatClick(seat.id)}
                                className={`w-8 h-8 text-xs font-medium rounded transition-colors ${getSeatColor(seat)}`}
                                disabled={seat.status === 'occupied' || seat.status === 'blocked'}
                                title={`${seat.id} - ${seat.type} ${seat.price ? `(+$${seat.price})` : ''}`}
                              >
                                {seat.letter}
                              </button>
                            ))}
                          </div>

                          {/* Aisle */}
                          <div className="w-4"></div>

                          {/* Right side seats */}
                          <div className="flex gap-1">
                            {seats.filter(seat => ['D', 'E', 'F'].includes(seat.letter)).map(seat => (
                              <button
                                key={seat.id}
                                onClick={() => handleSeatClick(seat.id)}
                                className={`w-8 h-8 text-xs font-medium rounded transition-colors ${getSeatColor(seat)}`}
                                disabled={seat.status === 'occupied' || seat.status === 'blocked'}
                                title={`${seat.id} - ${seat.type} ${seat.price ? `(+$${seat.price})` : ''}`}
                              >
                                {seat.letter}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-100 border border-purple-200 rounded"></div>
                      <span>First Class</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
                      <span>Business</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                      <span>Premium Economy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
                      <span>Economy</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Selection Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Selected Seats</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedSeats.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      No seats selected
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {selectedSeatDetails.map((seat, index) => (
                        <div key={seat?.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div>
                            <div className="font-medium">Passenger {index + 1}</div>
                            <div className="text-sm text-gray-600">
                              Seat {seat?.id} • {seat?.type}
                            </div>
                            {seat?.features && (
                              <div className="text-xs text-gray-500">
                                {seat.features.join(', ')}
                              </div>
                            )}
                          </div>
                          {seat?.price && seat.price > 0 && (
                            <Badge variant="secondary">
                              +${seat.price}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {totalSeatFees > 0 && (
                    <>
                      <Separator className="my-4" />
                      <div className="flex justify-between font-medium">
                        <span>Total Seat Fees:</span>
                        <span>${totalSeatFees}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Flight:</span>
                    <span>{selectedFlight?.flightNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Route:</span>
                    <span>{selectedFlight?.departure.airport} → {selectedFlight?.arrival.airport}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Class:</span>
                    <span className="capitalize">{selectedClass}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passengers:</span>
                    <span>{searchParams?.passengers.adults}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Base Price:</span>
                    <span>${selectedFlight?.price[selectedClass] * searchParams?.passengers.adults}</span>
                  </div>
                  {totalSeatFees > 0 && (
                    <div className="flex justify-between">
                      <span>Seat Fees:</span>
                      <span>${totalSeatFees}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${(selectedFlight?.price[selectedClass] * searchParams?.passengers.adults) + totalSeatFees}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Button
                  onClick={handleContinue}
                  disabled={selectedSeats.length !== searchParams?.passengers.adults}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Continue to Payment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/results')}
                  className="w-full"
                >
                  Back to Flights
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
