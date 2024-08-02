document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Kiểm tra email hợp lệ
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        message.textContent = 'Email không hợp lệ.';
        message.className = 'alert alert-danger';
        return;
    }

    // Kiểm tra password và confirm password trùng nhau
    if (password !== confirmPassword) {
        alert("Mật khẩu và mật khẩu xác nhận không trùng nhau!");
        return;
    }
    
    // Tạo object để lưu dữ liệu
    const userData = {
        username: username,
        email: email,
        password: password
    };
    
    // Lưu dữ liệu người dùng vào localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Hiển thị thông báo thành công
    document.getElementById('successMessage').classList.remove('hidden');
    
    // Làm mới form
    document.getElementById('registerForm').reset();
});