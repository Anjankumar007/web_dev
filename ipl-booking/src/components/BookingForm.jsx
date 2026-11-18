import React, { useState } from 'react';

function BookingForm({ selectedMatch, matches }) {
  const [matchId, setMatchId] = useState('');
  const [stand, setStand] = useState('General');
  const [multiplier, setMultiplier] = useState(1);
  const [qty, setQty] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Update local state when a match card's "Book" button is clicked
  React.useEffect(() => {
    if (selectedMatch) {
      // Find matching ID from title string
      const matchedObj = matches.find(m => `${m.matchNo}: ${m.title}` === selectedMatch);
      if (matchedObj) setMatchId(matchedObj.id);
    }
  }, [selectedMatch, matches]);

  const handleStandChange = (e) => {
    const selectedOpt = e.target.selectedOptions[0];
    setStand(e.target.value);
    setMultiplier(parseFloat(selectedOpt.getAttribute('data-multiplier')) || 1);
  };

  const currentMatch = matches.find(m => m.id === matchId);
  const basePrice = currentMatch ? currentMatch.basePrice : 0;
  const unitPrice = basePrice * multiplier;
  const totalAmount = unitPrice * qty;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Confirmed for ${fullName} (${qty} tickets)! Total: ₹${totalAmount.toLocaleString('en-IN')}`);
  };

  return (
    <div className="booking-wrapper">
      <form onSubmit={handleSubmit} className="booking-form">
        <p>
          <label htmlFor="matchSelect">Select Match:</label>
          <select 
            id="matchSelect" 
            value={matchId} 
            onChange={(e) => setMatchId(e.target.value)} 
            required
          >
            <option value="">-- Select Match --</option>
            {matches.map((m) => (
              <option key={m.id} value={m.id}>
                {m.matchNo}: {m.title} (₹{m.basePrice.toLocaleString('en-IN')})
              </option>
            ))}
          </select>
        </p>

        <p>
          <label htmlFor="standSelect">Stand Category:</label>
          <select id="standSelect" value={stand} onChange={handleStandChange} required>
            <option value="General" data-multiplier="1">General Stand (Base Price)</option>
            <option value="Premium" data-multiplier="2">Premium Stand (2x)</option>
            <option value="VIP" data-multiplier="4">VIP Hospitality (4x)</option>
          </select>
        </p>

        <p>
          <label htmlFor="ticketQty">Number of Tickets:</label>
          <input 
            type="number" 
            id="ticketQty" 
            min="1" 
            max="10" 
            value={qty} 
            onChange={(e) => setQty(parseInt(e.target.value) || 1)} 
            required 
          />
        </p>

        <p>
          <label htmlFor="name">Full Name:</label>
          <input 
            type="text" 
            id="name" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            placeholder="Enter full name" 
            required 
          />
        </p>

        <p>
          <label htmlFor="email">Email Address:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter email" 
            required 
          />
        </p>

        <p>
          <label htmlFor="phone">Phone Number:</label>
          <input 
            type="tel" 
            id="phone" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="Enter phone number" 
            required 
          />
        </p>

        <button type="submit" className="btn btn-primary">Submit Booking</button>
      </form>

      {/* Live Booking Summary Card */}
      <fieldset className="summary-card">
        <legend><h3>Booking Summary</h3></legend>
        <p><strong>Selected Match:</strong> <span>{currentMatch ? `${currentMatch.matchNo}: ${currentMatch.title}` : 'None selected'}</span></p>
        <p><strong>Stand:</strong> <span>{stand}</span></p>
        <p><strong>Ticket Price:</strong> ₹<span>{unitPrice.toLocaleString('en-IN')}</span></p>
        <p><strong>Quantity:</strong> <span>{qty}</span></p>
        <p className="total-line"><strong>Total Amount:</strong> ₹<span>{totalAmount.toLocaleString('en-IN')}</span></p>
      </fieldset>
    </div>
  );
}

export default BookingForm;