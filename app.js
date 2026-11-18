// Reusable Toast Notification Function
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
    toast.style.fontFamily = 'Segoe UI, sans-serif';
    
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.remove();
    }, 2500);
}

// Live Calculation & Summary Update
document.addEventListener('DOMContentLoaded', function() {
    const matchSelect = document.getElementById('matchSelect');
    const standSelect = document.getElementById('standSelect');
    const ticketQty = document.getElementById('ticketQty');

    const summaryMatch = document.getElementById('summaryMatch');
    const summaryStand = document.getElementById('summaryStand');
    const summaryPrice = document.getElementById('summaryPrice');
    const summaryQty = document.getElementById('summaryQty');
    const summaryTotal = document.getElementById('summaryTotal');

    function updateBookingSummary() {
        const selectedMatchOption = matchSelect.options[matchSelect.selectedIndex];
        const matchName = selectedMatchOption.value ? selectedMatchOption.text : 'None selected';
        const basePrice = parseInt(selectedMatchOption.getAttribute('data-price')) || 0;

        const selectedStandOption = standSelect.options[standSelect.selectedIndex];
        const standName = selectedStandOption.text;
        const multiplier = parseFloat(selectedStandOption.getAttribute('data-multiplier')) || 1;

        const adjustedPrice = basePrice * multiplier;
        const qty = parseInt(ticketQty.value) || 1;
        const totalAmount = adjustedPrice * qty;

        // Update DOM elements in the summary card
        summaryMatch.textContent = matchName;
        summaryStand.textContent = standName;
        summaryPrice.textContent = adjustedPrice.toLocaleString('en-IN');
        summaryQty.textContent = qty;
        summaryTotal.textContent = totalAmount.toLocaleString('en-IN');

        // Trigger toast notification
        if (selectedMatchOption.value) {
            showToast('Summary updated live!');
        }
    }

    // Attach event listeners
    if (matchSelect && standSelect && ticketQty) {
        matchSelect.addEventListener('change', updateBookingSummary);
        standSelect.addEventListener('change', updateBookingSummary);
        ticketQty.addEventListener('input', updateBookingSummary);
    }
});