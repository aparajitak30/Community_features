document.getElementById("signup-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const secretKey = document.getElementById("secret-key").value;

    try {
        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, secretKey }),
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = "member.html"; // ✅ Redirect to member page on success
        }else{
            alert(data.message); 
        }
    } catch (error) {
        console.error("Signup error:", error);
        alert("Server error. Please try again later.");
    }
});
