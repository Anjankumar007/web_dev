// 1. Match Data Store
const matchesData = [
    {
        id: 'm1',
        matchNo: 'Match 01',
        title: 'CSK vs MI',
        teams: ['CSK', 'MI'],
        date: 'March 28, 2026 - 7:30 PM',
        venue: 'M. A. Chidambaram Stadium, Chennai',
        basePrice: 1500
    },
    {
        id: 'm2',
        matchNo: 'Match 02',
        title: 'RCB vs KKR',
        teams: ['RCB', 'KKR'],
        date: 'March 29, 2026 - 7:30 PM',
        venue: 'M. Chinnaswamy Stadium, Bengaluru',
        basePrice: 1200
    },
    {
        id: 'm3',
        matchNo: 'Match 03',
        title: 'MI vs GT',
        teams: ['MI', 'GT'],
        date: 'March 31, 2026 - 7:30 PM',
        venue: 'Wankhede Stadium, Mumbai',
        basePrice: 1800
    }
];

// 2. Reusable Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = '#0b1a3a';
    toast.style.color = '#ffffff';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '5px';
    toast.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
    toast.style.zIndex = '1000';

    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2500);
}

document.addEventListener('DOMContentLoaded', () => {
    const matchContainer = document.getElementById('matchContainer');
    const matchSelect = document.getElementById('matchSelect');
    const standSelect = document.getElementById('standSelect');
    const ticketQty = document.getElementById('ticketQty');
    const teamFilter = document.getElementById('teamFilter');
    const toggleViewBtn = document.getElementById('toggleViewBtn');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const bookingForm = document.getElementById('bookingForm');

    const summaryMatch = document.getElementById('summaryMatch');
    const summaryStand = document.getElementById('summaryStand');
    const summaryPrice = document.getElementById('summaryPrice');
    const summaryQty = document.getElementById('summaryQty');
    const summaryTotal = document.getElementById('summaryTotal');

    // 3. Dynamically Populate Match Dropdown
    matchesData.forEach(match => {
        const option = document.createElement('option');
        option.value = match.id;
        option.textContent = `${match.matchNo}: ${match.title} (₹${match.basePrice.toLocaleString('en-IN')})`;
        matchSelect.appendChild(option);
    });

    // 4. Dynamically Render Match Cards
    function renderMatchCards(filterTeam = 'all') {
        matchContainer.innerHTML = '';

        const filtered = filterTeam === 'all'
            ? matchesData
            : matchesData.filter(m => m.teams.includes(filterTeam));

        filtered.forEach(match => {
            const genPrice = match.basePrice.toLocaleString('en-IN');
            const premPrice = (match.basePrice * 2).toLocaleString('en-IN');
            const vipPrice = (match.basePrice * 4).toLocaleString('en-IN');

            const card = document.createElement('div');
            card.className = 'match-card';
            card.innerHTML = `
                <div>
                    <span class="badge">${match.matchNo}</span>
                    <h3>${match.title}</h3>
                    <p><strong>Date:</strong> ${match.date}</p>
                    <p><strong>Venue:</strong> ${match.venue}</p>
                    <p><strong>Prices:</strong> ₹${genPrice} / ₹${premPrice} / ₹${vipPrice}</p>
                </div>
                <button type="button" class="btn btn-primary select-match-btn" data-id="${match.id}">Book</button>
            `;
            matchContainer.appendChild(card);
        });

        // Attach click listeners to dynamically rendered Book buttons
        document.querySelectorAll('.select-match-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                matchSelect.value = btn.getAttribute('data-id');
                updateBookingSummary();
                document.getElementById('book-ticket').scrollIntoView({ behavior: 'smooth' });
                showToast('Match selected! Complete your details below.');
            });
        });
    }

    // Initial render
    renderMatchCards();

    // 5. Team Filter Listener
    teamFilter.addEventListener('change', () => {
        renderMatchCards(teamFilter.value);
        showToast(`Filtered by: ${teamFilter.value.toUpperCase()}`);
    });

    // 6. Grid / List View Toggle
    toggleViewBtn.addEventListener('click', () => {
        matchContainer.classList.toggle('list-view');
        const isList = matchContainer.classList.contains('list-view');
        toggleViewBtn.textContent = isList ? 'Switch to Grid View' : 'Switch to List View';
        showToast(isList ? 'Switched to List View' : 'Switched to Grid View');
    });

    // 7. Mobile Hamburger Menu Toggle
    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 8. Live Booking Summary Calculation
    function updateBookingSummary() {
        const selectedMatch = matchesData.find(m => m.id === matchSelect.value);
        const selectedStand = standSelect.options[standSelect.selectedIndex];
        const multiplier = parseFloat(selectedStand.getAttribute('data-multiplier')) || 1;
        const qty = parseInt(ticketQty.value) || 1;

        if (!selectedMatch) {
            summaryMatch.textContent = 'None selected';
            summaryStand.textContent = selectedStand.text;
            summaryPrice.textContent = '0';
            summaryQty.textContent = qty;
            summaryTotal.textContent = '0';
            return;
        }

        const unitPrice = selectedMatch.basePrice * multiplier;
        const total = unitPrice * qty;

        summaryMatch.textContent = `${selectedMatch.matchNo}: ${selectedMatch.title}`;
        summaryStand.textContent = selectedStand.value;
        summaryPrice.textContent = unitPrice.toLocaleString('en-IN');
        summaryQty.textContent = qty;
        summaryTotal.textContent = total.toLocaleString('en-IN');
    }

    matchSelect.addEventListener('change', () => {
        updateBookingSummary();
        if (matchSelect.value) showToast('Summary updated live!');
    });
    standSelect.addEventListener('change', () => {
        updateBookingSummary();
        if (matchSelect.value) showToast('Stand updated!');
    });
    ticketQty.addEventListener('input', updateBookingSummary);

    // 9. Handle Form Submission & Add to "My Bookings" Table
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedMatch = matchesData.find(m => m.id === matchSelect.value);
        if (!selectedMatch) return;

        const selectedStand = standSelect.options[standSelect.selectedIndex];
        const multiplier = parseFloat(selectedStand.getAttribute('data-multiplier')) || 1;
        const qty = parseInt(ticketQty.value) || 1;
        const total = (selectedMatch.basePrice * multiplier) * qty;
        const bookingId = 'IPL-' + Math.floor(100000 + Math.random() * 900000);

        const emptyRow = document.getElementById('emptyBookingRow');
        if (emptyRow) emptyRow.remove();

        const tbody = document.getElementById('bookingsTableBody');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${bookingId}</strong></td>
            <td>${selectedMatch.matchNo}: ${selectedMatch.title}</td>
            <td>${selectedMatch.date}</td>
            <td>${selectedStand.value}</td>
            <td>${qty}</td>
            <td>₹${total.toLocaleString('en-IN')}</td>
        `;
        tbody.appendChild(row);

        bookingForm.reset();
        updateBookingSummary();
        showToast(`Booking Confirmed! ID: ${bookingId}`);
        document.getElementById('my-bookings').scrollIntoView({ behavior: 'smooth' });
    });
});