// --- PART A: HOMEPAGE SLIDER LOGIC ---
let slideIndex = 0;

// Function to control the slides
function showSlides(n) {
    let slides = document.getElementsByClassName("carousel-slide");
    
    // Safety Check: If we are not on the homepage (no slides), stop here.
    if (slides.length === 0) return;

    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Show the active slide
    slides[slideIndex].style.display = "flex"; // Flex keeps content centered
}

// Button Click Function
function moveSlide(n) {
    showSlides(slideIndex += n);
}

// Auto-run slider logic when page loads
document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
});


// --- PART B: PAYMENT LOGIC (For Booking Page) ---

function selectService(serviceName, btnElement) {
    const inputField = document.getElementById('service-type');
    if(inputField) {
        inputField.value = serviceName;
        
        // Reset buttons styling
        document.querySelectorAll('.service-btn').forEach(btn => {
            btn.style.border = "1px solid #333";
            btn.style.background = "#1a1a1a";
            btn.style.color = "#ccc";
        });

        // Highlight active button
        btnElement.style.border = "1px solid #bfa472";
        btnElement.style.background = "#2a2a2a";
        btnElement.style.color = "#bfa472";
    }
}

function payWithPaystack(e) {
    e.preventDefault();

    const email = document.getElementById('email-address').value;
    const name = document.getElementById('full-name').value;
    const service = document.getElementById('service-type').value;
    const amountInput = document.getElementById('amount').value;

    if (!service) {
        alert("Please select a service first.");
        return;
    }

    const amountInKobo = amountInput * 100;

    let handler = PaystackPop.setup({
        key: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxx', // ⚠️ PASTE YOUR PUBLIC KEY HERE
        email: email,
        amount: amountInKobo,
        currency: 'NGN',
        metadata: {
            custom_fields: [
                { display_name: "Service", variable_name: "service", value: service },
                { display_name: "Full Name", variable_name: "full_name", value: name }
            ]
        },
        callback: function(response) {
            fetch('/api/confirm-booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    service: service,
                    amount: amountInput,
                    reference: response.reference
                })
            }).then(() => {
                alert('Payment Successful! Check your email.');
                window.location.href = "index.html";
            });
        },
        onClose: function() {
            alert('Transaction cancelled.');
        }
    });

    handler.openIframe();
}