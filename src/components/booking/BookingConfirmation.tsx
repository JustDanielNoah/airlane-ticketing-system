
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Plane, Calendar, Clock, Users, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookingConfirmation = () => {
  const location = useLocation();
  const { toast } = useToast();
  const { selectedFlight, searchParams, selectedClass, selectedSeats, totalSeatFees } = location.state || {};
  
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const totalAmount = (selectedFlight?.price[selectedClass] * searchParams?.passengers.adults) + totalSeatFees;

  const handlePayment = async () => {
    // Simulate payment processing
    if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv || !paymentInfo.cardholderName) {
      toast({
        title: "Error",
        description: "Please fill in all payment details",
        variant: "destructive",
      });
      return;
    }

    // Generate booking reference
    const reference = 'SA' + Math.random().toString(36).substr(2, 6).toUpperCase();
    setBookingReference(reference);
    setBookingComplete(true);
    
    toast({
      title: "Payment Successful!",
      description: `Your booking ${reference} has been confirmed.`,
    });
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
              <p className="text-gray-600 mb-6">
                Your flight has been successfully booked. You will receive a confirmation email shortly.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-gray-600">Booking Reference</p>
                    <p className="font-bold text-lg">{bookingReference}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Flight</p>
                    <p className="font-semibold">{selectedFlight?.flightNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Route</p>
                    <p className="font-semibold">{selectedFlight?.departure.airport} → {selectedFlight?.arrival.airport}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Departure</p>
                    <p className="font-semibold">{selectedFlight?.departure.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Seats</p>
                    <p className="font-semibold">{selectedSeats?.map(seat => seat.id).join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Paid</p>
                    <p className="font-bold text-lg">${totalAmount}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  Download E-Ticket
                </Button>
                <Button variant="outline" className="w-full">
                  Add to Calendar
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Next Steps:</strong> Check-in opens 24 hours before departure. 
                  You can manage your booking online or through our mobile app.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      placeholder="John Doe"
                      value={paymentInfo.cardholderName}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardholderName: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      🔒 Your payment information is secure and encrypted. We accept Visa, Mastercard, and American Express.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Terms and Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Tickets are non-refundable after 24 hours of purchase</p>
                    <p>• Changes to bookings may incur additional fees</p>
                    <p>• Passengers must arrive at the airport 2 hours before domestic flights</p>
                    <p>• Valid ID required for all passengers</p>
                  </div>
                  
                  <div className="mt-4">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">I agree to the terms and conditions</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Flight Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <Plane className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{selectedFlight?.airline}</div>
                      <div className="text-sm text-gray-600">{selectedFlight?.flightNumber}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>Departure: {selectedFlight?.departure.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>Duration: {selectedFlight?.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{searchParams?.passengers.adults} passenger(s)</span>
                    </div>
                  </div>

                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="font-bold text-lg">
                      {selectedFlight?.departure.airport} → {selectedFlight?.arrival.airport}
                    </div>
                    <div className="text-sm text-gray-600 capitalize">
                      {selectedClass} Class
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Selected Seats</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedSeats?.map((seat, index) => (
                    <div key={seat.id} className="flex justify-between items-center py-2">
                      <span className="text-sm">Passenger {index + 1}: {seat.id}</span>
                      {seat.price > 0 && (
                        <Badge variant="secondary">+${seat.price}</Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Price Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Base Fare ({searchParams?.passengers.adults} passenger)</span>
                    <span>${selectedFlight?.price[selectedClass] * searchParams?.passengers.adults}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>$0</span>
                  </div>
                  {totalSeatFees > 0 && (
                    <div className="flex justify-between">
                      <span>Seat Selection</span>
                      <span>${totalSeatFees}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${totalAmount}</span>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handlePayment}
                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
              >
                Complete Payment - ${totalAmount}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
