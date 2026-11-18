import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MatchCard from './components/MatchCard';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [selectedMatch, setSelectedMatch] = useState('');

  // Match data array to map over and pass via props
  const matches = [
    {
      id: 'm1',
      matchNo: 'Match 01',
      title: 'CSK vs MI',
      date: 'March 28, 2026 - 7:30 PM',
      venue: 'M. A. Chidambaram Stadium, Chennai',
      basePrice: 1500
    },
    {
      id: 'm2',
      matchNo: 'Match 02',
      title: 'RCB vs KKR',
      date: 'March 29, 2026 - 7:30 PM',
      venue: 'M. Chinnaswamy Stadium, Bengaluru',
      basePrice: 1200
    },
    {
      id: 'm3',
      matchNo: 'Match 03',
      title: 'MI vs GT',
      date: 'March 31, 2026 - 7:30 PM',
      venue: 'Wankhede Stadium, Mumbai',
      basePrice: 1800
    }
  ];

  const handleBookClick = (matchTitle) => {
    setSelectedMatch(matchTitle);
    const formElement = document.getElementById('book-ticket');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      {/* 1. Navbar Component */}
      <Navbar />

      {/* 2. Hero Section */}
      <header className="hero">
        <h1>Experience The Stadium Energy Live!</h1>
        <p>Book your tickets now for IPL 2026 matches.</p>
        <div className="hero-btns">
          <a href="#schedule" className="btn">View Schedule</a>
          <a href="#book-ticket" className="btn btn-primary">Book Ticket</a>
        </div>
      </header>

      {/* 3. Match Schedule Section (Mapping over data using MatchCard component) */}
      <main id="schedule" className="container">
        <h2>Match Schedule</h2>
        <div className="match-grid">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              matchNo={match.matchNo}
              title={match.title}
              date={match.date}
              venue={match.venue}
              basePrice={match.basePrice}
              onBook={() => handleBookClick(`${match.matchNo}: ${match.title}`)}
            />
          ))}
        </div>
      </main>

      {/* 4. Booking Form Component */}
      <section id="book-ticket" className="container">
        <h2>Book Tickets</h2>
        <BookingForm selectedMatch={selectedMatch} matches={matches} />
      </section>

      {/* 5. Footer Component */}
      <Footer />
    </div>
  );
}

export default App;