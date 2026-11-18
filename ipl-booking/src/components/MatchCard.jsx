import React from 'react';

function MatchCard({ matchNo, title, date, venue, basePrice, onBook }) {
  const genPrice = basePrice.toLocaleString('en-IN');
  const premPrice = (basePrice * 2).toLocaleString('en-IN');
  const vipPrice = (basePrice * 4).toLocaleString('en-IN');

  return (
    <div className="match-card">
      <div>
        <span className="badge">{matchNo}</span>
        <h3>{title}</h3>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Venue:</strong> {venue}</p>
        <p><strong>Prices:</strong> ₹{genPrice} / ₹{premPrice} / ₹{vipPrice}</p>
      </div>
      <button type="button" className="btn btn-primary" onClick={onBook}>
        Book
      </button>
    </div>
  );
}

export default MatchCard;