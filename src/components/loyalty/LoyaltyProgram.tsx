
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Star, Plane, CreditCard, Trophy, Calendar } from 'lucide-react';

const LoyaltyProgram = () => {
  const [currentTier] = useState('Gold');
  const [points] = useState(45650);
  const [tiersProgress] = useState({
    Silver: { required: 25000, earned: 25000, completed: true },
    Gold: { required: 50000, earned: 45650, completed: false },
    Platinum: { required: 100000, earned: 45650, completed: false }
  });

  const recentActivity = [
    { date: '2024-06-10', activity: 'Flight SA101 JFK-LAX', points: '+2,450', type: 'earned' },
    { date: '2024-06-08', activity: 'Hotel Partner Booking', points: '+850', type: 'earned' },
    { date: '2024-06-05', activity: 'Upgrade to Business Class', points: '-15,000', type: 'redeemed' },
    { date: '2024-06-01', activity: 'Flight SA205 LAX-JFK', points: '+2,200', type: 'earned' },
  ];

  const availableRewards = [
    { id: 1, name: 'Business Class Upgrade', points: 15000, category: 'Flight', available: true },
    { id: 2, name: 'Lounge Day Pass', points: 5000, category: 'Airport', available: true },
    { id: 3, name: 'Extra Baggage Allowance', points: 3000, category: 'Service', available: true },
    { id: 4, name: 'Priority Check-in', points: 2000, category: 'Service', available: true },
    { id: 5, name: 'Free Flight (Domestic)', points: 25000, category: 'Flight', available: true },
    { id: 6, name: 'Hotel Night (Partner)', points: 8000, category: 'Hotel', available: false },
  ];

  const tierBenefits = {
    Silver: [
      'Priority check-in',
      'Extra baggage allowance',
      '25% bonus points',
      'Dedicated customer service'
    ],
    Gold: [
      'All Silver benefits',
      'Lounge access',
      '50% bonus points',
      'Free seat selection',
      'Priority boarding',
      'Complimentary upgrades (subject to availability)'
    ],
    Platinum: [
      'All Gold benefits',
      'Guaranteed upgrades',
      '100% bonus points',
      'Personal concierge service',
      'Global lounge access',
      'Free companion ticket annually'
    ]
  };

  const nextTierPoints = tiersProgress.Gold.required - tiersProgress.Gold.earned;
  const progressPercentage = (tiersProgress.Gold.earned / tiersProgress.Gold.required) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">SkyMiles Loyalty Program</h1>
            <p className="text-gray-600">Earn points, unlock benefits, and travel in style</p>
          </div>

          {/* Current Status */}
          <Card className="mb-8 bg-gradient-to-r from-gold-100 to-yellow-100 border-gold-200">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <Trophy className="w-6 h-6 text-gold-600" />
                    <Badge className="bg-gold-600 text-white px-3 py-1">
                      {currentTier} Member
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Welcome back, John!</h2>
                  <p className="text-gray-600">Member since 2020</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {points.toLocaleString()}
                  </div>
                  <p className="text-gray-600">SkyMiles Points</p>
                </div>

                <div className="text-center md:text-right">
                  <div className="text-lg font-semibold text-gray-800 mb-2">
                    Next Tier: Platinum
                  </div>
                  <div className="mb-2">
                    <Progress value={progressPercentage} className="h-3" />
                  </div>
                  <p className="text-sm text-gray-600">
                    {nextTierPoints.toLocaleString()} points to Platinum
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start" variant="outline">
                      <Plane className="w-4 h-4 mr-2" />
                      Book a Flight with Points
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Gift className="w-4 h-4 mr-2" />
                      Redeem Rewards
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <CreditCard className="w-4 h-4 mr-2" />
                      SkyMiles Credit Card
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Upcoming Trips
                    </Button>
                  </CardContent>
                </Card>

                {/* Tier Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tier Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(tiersProgress).map(([tier, progress]) => (
                      <div key={tier} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`font-medium ${progress.completed ? 'text-green-600' : ''}`}>
                            {tier}
                          </span>
                          <span className="text-sm text-gray-600">
                            {progress.earned.toLocaleString()} / {progress.required.toLocaleString()}
                          </span>
                        </div>
                        <Progress 
                          value={(progress.earned / progress.required) * 100} 
                          className={`h-2 ${progress.completed ? 'bg-green-200' : ''}`}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Featured Offers */}
              <Card>
                <CardHeader>
                  <CardTitle>Featured Offers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                      <h3 className="font-bold mb-2">Double Points Weekend</h3>
                      <p className="text-sm text-gray-700 mb-3">
                        Earn 2x points on all flights booked this weekend
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Book Now
                      </Button>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg">
                      <h3 className="font-bold mb-2">Lounge Day Pass</h3>
                      <p className="text-sm text-gray-700 mb-3">
                        50% off lounge access with points redemption
                      </p>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Redeem
                      </Button>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
                      <h3 className="font-bold mb-2">Partner Hotels</h3>
                      <p className="text-sm text-gray-700 mb-3">
                        Earn 500 bonus points per night at partner hotels
                      </p>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Explore
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableRewards.map((reward) => (
                      <div key={reward.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <div className="mb-3">
                          <Badge variant="secondary" className="mb-2">
                            {reward.category}
                          </Badge>
                          <h3 className="font-semibold">{reward.name}</h3>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-blue-600">
                            {reward.points.toLocaleString()} pts
                          </span>
                          <Button 
                            size="sm" 
                            disabled={!reward.available || points < reward.points}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            {points >= reward.points ? 'Redeem' : 'Insufficient Points'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${
                            activity.type === 'earned' ? 'bg-green-500' : 'bg-blue-500'
                          }`}></div>
                          <div>
                            <div className="font-medium">{activity.activity}</div>
                            <div className="text-sm text-gray-600">{activity.date}</div>
                          </div>
                        </div>
                        <div className={`font-bold ${
                          activity.type === 'earned' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {activity.points}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(tierBenefits).map(([tier, benefits]) => (
                  <Card key={tier} className={currentTier === tier ? 'ring-2 ring-blue-500' : ''}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {tier} Tier
                        {currentTier === tier && (
                          <Badge className="bg-blue-600">Current</Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;
