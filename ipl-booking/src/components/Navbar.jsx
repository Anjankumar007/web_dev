import React from 'react';

export default function Navbar() {
    return (
        <header style={{ backgroundColor: '#0b1a3a', padding: '1rem 5%', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>IPL <span style={{ color: '#f36c21' }}>2026</span></div>
            <nav style={{ display: 'flex', gap: '20px' }}>
                <a href="#schedule" style={{ color: '#fff', textDecoration: 'none' }}>Matches</a>
                <a href="#book" style={{ color: '#fff', textDecoration: 'none' }}>Book Ticket</a>
                <a href="#guidelines" style={{ color: '#fff', textDecoration: 'none' }}>Guidelines</a>
            </nav>
        </header>
    );
}