// Reusable Toast Notification Function
function showToast(message) {
    // Create a div element for the toast
    const toast = document.createElement('div');
    toast.textContent = message;
    
    // Simple styling for the toast banner
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = '#1a237e';
    toast.style.color = '#ffffff';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '5px';
    toast.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
    toast.style.zIndex = '1000';
    toast.style.fontFamily = 'Arial, sans-serif';
    
    // Append toast to the body
    document.body.appendChild(toast);
    
    // Automatically remove the toast after 3 seconds (3000 milliseconds)
    setTimeout(function() {
        toast.remove();
    }, 3000);
}

// Smooth Scrolling and Toast Trigger when clicking Book buttons
document.addEventListener('DOMContentLoaded', function() {
    // Select all links or buttons pointing to the book-ticket section
    const bookLinks = document.querySelectorAll('a[href="#book-ticket"]');
    
    bookLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent instant jump
            
            const targetSection = document.querySelector('#book-ticket');
            if (targetSection) {
                // Smooth scroll to the booking section
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Show confirmation toast notification
                showToast('Navigating to booking section & ready to book!');
            }
        });
    });
});