
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Plane, Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 850000, bookings: 1200 },
    { month: 'Feb', revenue: 920000, bookings: 1350 },
    { month: 'Mar', revenue: 780000, bookings: 1100 },
    { month: 'Apr', revenue: 1100000, bookings: 1600 },
    { month: 'May', revenue: 1250000, bookings: 1800 },
    { month: 'Jun', revenue: 1400000, bookings: 2000 },
  ];

  const flightStatusData = [
    { status: 'On Time', count: 156, color: '#22c55e' },
    { status: 'Delayed', count: 23, color: '#f59e0b' },
    { status: 'Cancelled', count: 5, color: '#ef4444' },
    { status: 'Boarding', count: 12, color: '#3b82f6' }
  ];

  const popularRoutes = [
    { route: 'JFK → LAX', bookings: 245, revenue: 73500 },
    { route: 'LHR → JFK', bookings: 198, revenue: 138600 },
    { route: 'CDG → DXB', bookings: 167, revenue: 133600 },
    { route: 'NRT → LAX', bookings: 134, revenue: 120600 },
    { route: 'DXB → LHR', bookings: 123, revenue: 98400 }
  ];

  const todaysFlights = [
    { id: 'SA101', route: 'JFK → LAX', departure: '08:00', status: 'On Time', passengers: 156, aircraft: 'B737-800' },
    { id: 'SA205', route: 'LAX → JFK', departure: '14:15', status: 'Delayed', passengers: 142, aircraft: 'A320' },
    { id: 'SA311', route: 'LHR → CDG', departure: '19:30', status: 'Boarding', passengers: 189, aircraft: 'B787-9' },
    { id: 'SA422', route: 'DXB → LHR', departure: '23:45', status: 'On Time', passengers: 298, aircraft: 'A350-900' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Time': return 'bg-green-100 text-green-800';
      case 'Delayed': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Boarding': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">SkyAirlines Operations Center</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Flights</p>
                  <p className="text-3xl font-bold">47</p>
                  <p className="text-sm text-green-600">+5 from yesterday</p>
                </div>
                <Plane className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Passengers</p>
                  <p className="text-3xl font-bold">2,847</p>
                  <p className="text-sm text-green-600">+12% this week</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue Today</p>
                  <p className="text-3xl font-bold">$125K</p>
                  <p className="text-sm text-green-600">+8% vs avg</p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">On-Time Rate</p>
                  <p className="text-3xl font-bold">94%</p>
                  <p className="text-sm text-green-600">Above target</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="flights">Flights</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue & Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [
                        name === 'revenue' ? `$${value.toLocaleString()}` : value,
                        name === 'revenue' ? 'Revenue' : 'Bookings'
                      ]} />
                      <Bar dataKey="revenue" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Flight Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Flight Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={flightStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ status, count }) => `${status}: ${count}`}
                      >
                        {flightStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Popular Routes */}
            <Card>
              <CardHeader>
                <CardTitle>Top Routes This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularRoutes.map((route, index) => (
                    <div key={route.route} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{route.route}</div>
                          <div className="text-sm text-gray-600">{route.bookings} bookings</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${route.revenue.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Today's Flight Schedule
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-auto"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysFlights.map((flight) => (
                    <div key={flight.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="font-bold">{flight.id}</div>
                          <div className="text-sm text-gray-600">{flight.aircraft}</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{flight.route}</div>
                          <div className="text-sm text-gray-600">Departure: {flight.departure}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="font-semibold">{flight.passengers}</div>
                          <div className="text-sm text-gray-600">passengers</div>
                        </div>
                        <Badge className={getStatusColor(flight.status)}>
                          {flight.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                      <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Class</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <span className="font-medium">First Class</span>
                      <span className="font-bold">$450K (32%)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="font-medium">Business</span>
                      <span className="font-bold">$380K (27%)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="font-medium">Premium Economy</span>
                      <span className="font-bold">$290K (21%)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">Economy</span>
                      <span className="font-bold">$280K (20%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fleet Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Active</span>
                      <Badge className="bg-green-100 text-green-800">42</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Maintenance</span>
                      <Badge className="bg-yellow-100 text-yellow-800">5</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Out of Service</span>
                      <Badge className="bg-red-100 text-red-800">2</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Crew Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>On Duty</span>
                      <Badge className="bg-blue-100 text-blue-800">156</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Standby</span>
                      <Badge className="bg-gray-100 text-gray-800">24</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Off Duty</span>
                      <Badge className="bg-purple-100 text-purple-800">89</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Airport Operations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Gates Available</span>
                      <Badge className="bg-green-100 text-green-800">12/15</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Baggage Handling</span>
                      <Badge className="bg-blue-100 text-blue-800">Normal</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Security Wait</span>
                      <Badge className="bg-yellow-100 text-yellow-800">15 min</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
