// js/signup.js

// Function to handle form submission
document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Gather form data
    const formData = {
        email: document.getElementById("email").value.trim(),
        name: document.getElementById("name").value.trim(),
        password: document.getElementById("password").value.trim(),
    };

    // Basic validation
    if (!formData.email || !formData.name || !formData.password) {
        alert("Please fill in all fields.");
        return;
    }

    // API call to backend
    try {
        const response = await fetch("http://localhost:7002/register-organization/initiate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            alert("OTP sent to your email! Please verify.");
            // Redirect or show OTP form
            document.getElementById("otpSection").style.display = "block";
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error("Error during signup:", error);
        alert("An error occurred. Please try again later.");
    }
});

// Function to handle OTP submission
document.getElementById("submitOtpBtn").addEventListener("click", async function () {
    const otpInputs = Array.from(document.querySelectorAll(".otp-input")).map(input => input.value.trim());
    const otp = otpInputs.join("");

    if (otp.length !== 6) {
        alert("Please enter the full OTP.");
        return;
    }

    const email = document.getElementById("email").value.trim();

    try {
        const response = await fetch("http://localhost:7002/api/v1/organization/register-organization/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Email verified successfully! Complete registration.");
            window.location.href = "admin-registration.html";
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error("Error during OTP verification:", error);
        alert("An error occurred. Please try again later.");
    }
});
