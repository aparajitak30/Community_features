document.addEventListener('DOMContentLoaded', () => {
    console.log('Community Page Loaded');
     
    // Existing code for the topics
    const topics = [
        "🌍 Building Strong Communities",
        "❤️ Empathy & Understanding",
        "🤝 Collaboration & Teamwork",
        "💬 Open Communication",
        "🎉 Celebrating Diversity",
        "✨ Shared Goals & Growth"
    ];

    const topicGrid = document.querySelector('.topic-grid');

    topics.forEach(topic => {
        const topicDiv = document.createElement('div');
        topicDiv.classList.add('topic-card');
        topicDiv.textContent = topic;
        topicGrid.appendChild(topicDiv);
    });



   //read more button
        const readMoreBtn = document.querySelector(".rmb");
        const moreText = document.querySelector(".moret");
    
        readMoreBtn.addEventListener("click", function () {
            if (moreText.style.display === "none" || moreText.style.display === "") {
                moreText.style.display = "block"; // Show the extra text
                readMoreBtn.textContent = "Read Less"; // Change button text
            } else {
                moreText.style.display = "none"; // Hide the extra text
                readMoreBtn.textContent = "Read More"; // Change button text
            }
        });
    

      // 🔹 Main Login Elements
    const mainLoginBtn = document.getElementById("main-login-btn");
    const mainLoginModal = document.getElementById("main-login-modal");
    const closeMainBtn = document.getElementById("close-main");

    // 🔹 Member & Admin Login Buttons Inside Main Modal
    const openMemberLogin = document.getElementById("open-member-login");
    const openAdminLogin = document.getElementById("open-admin-login");

    // 🔹 Member & Admin Modals
    const memberLoginModal = document.getElementById("member-login-modal");
    const adminLoginModal = document.getElementById("admin-login-modal");

    // 🔹 Close Buttons
    const closeMemberBtn = document.getElementById("close-member");
    const closeAdminBtn = document.getElementById("close-admin");

    // 🔹 Sign Up Button
    const signupBtn = document.getElementById("signup-btn");

    // 🔹 Open Main Login Modal
    mainLoginBtn.addEventListener("click", function () {
        mainLoginModal.style.display = "flex";
    });

    // 🔹 Close Main Login Modal
    closeMainBtn.addEventListener("click", function () {
        mainLoginModal.style.display = "none";
    });

    // 🔹 Open Member Login Modal from Main Modal
    openMemberLogin.addEventListener("click", function () {
        mainLoginModal.style.display = "none"; // Close main modal
        memberLoginModal.style.display = "flex"; // Open member modal
    });

    // 🔹 Open Admin Login Modal from Main Modal
    openAdminLogin.addEventListener("click", function () {
        mainLoginModal.style.display = "none"; // Close main modal
        adminLoginModal.style.display = "flex"; // Open admin modal
    });

    // 🔹 Close Member Modal
    closeMemberBtn.addEventListener("click", function () {
        memberLoginModal.style.display = "none";
    });

    // 🔹 Close Admin Modal
    closeAdminBtn.addEventListener("click", function () {
        adminLoginModal.style.display = "none";
    });

    // 🔹 Redirect to Sign Up Page
    signupBtn.addEventListener("click", function () {
        window.location.href = "signup.html";
    });

    // 🔹 Close modals when clicking outside
    window.addEventListener("click", function (event) {
        if (event.target === mainLoginModal) {
            mainLoginModal.style.display = "none";
        }
        if (event.target === memberLoginModal) {
            memberLoginModal.style.display = "none";
        }
        if (event.target === adminLoginModal) {
            adminLoginModal.style.display = "none";
        }
    });
    

    document.getElementById("member-login-btn").addEventListener("click", async () => {
        const username = document.getElementById("member-username").value;
        const password = document.getElementById("member-password").value;

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login successful! Redirecting...");
                window.location.href = "member.html"; // ✅ Redirect to member page
            } else {
                alert(data.message || "Login failed. Try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Server error. Please try again later.");
        }
    });

    // 🔹 Member Signup
    document.getElementById("signup-btn").addEventListener("click", async () => {
        window.location.href = "signup.html"; // ✅ Opens the signup page
    });   
  });

    
