document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định
    
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    
    // Lấy thông tin từ localStorage
    const storedUserData = localStorage.getItem('userData');

    function validateSignIn() {
        if (!storedUserData) {
            return false;
        }
        const userData = JSON.parse(storedUserData);
        return passwordInput === userData.password && emailInput === userData.email;
    }

    // Kiểm tra email và password
    if (validateSignIn()) {
        alert("ĐĂNG NHẬP THÀNH CÔNG");
        window.location.href = "http://127.0.0.1:5500/order.html";
    } else {
        alert("Bạn đã nhập sai email hoặc mật khẩu");
    }
});