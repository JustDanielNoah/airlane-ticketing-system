
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FlightSearch from '../components/flight/FlightSearch';
import FlightResults from '../components/flight/FlightResults';
import SeatSelection from '../components/booking/SeatSelection';
import BookingConfirmation from '../components/booking/BookingConfirmation';
import AdminDashboard from '../components/admin/AdminDashboard';
import LoyaltyProgram from '../components/loyalty/LoyaltyProgram';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<FlightSearch />} />
          <Route path="/results" element={<FlightResults />} />
          <Route path="/seat-selection" element={<SeatSelection />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/loyalty" element={<LoyaltyProgram />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
