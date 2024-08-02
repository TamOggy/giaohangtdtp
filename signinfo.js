// Hàm để tải thông tin người dùng vào form và hiển thị
function loadUserData() {
    let storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
        alert('No user data found in localStorage.');
        return;
    }

    let userData = JSON.parse(storedUserData);
    document.getElementById('displayName').textContent = userData.username;
    document.getElementById('displayEmail').textContent = userData.email;
    document.getElementById('displayPassword').textContent = userData.password;

    document.getElementById('username').value = userData.username;
    document.getElementById('email').value = userData.email;
    document.getElementById('password').value = userData.password;
}

document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định
    
    const userInput = document.getElementById('username').value;
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    
    // Lấy thông tin từ localStorage
    let storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
        alert('No user data found in localStorage.');
        return;
    }

    // Chuyển đổi chuỗi JSON trở lại thành đối tượng
    let userData = JSON.parse(storedUserData);

    // Cập nhật thông tin người dùng
    userData.username = userInput;
    userData.email = emailInput;
    userData.password = passwordInput;

    // Lưu đối tượng user đã cập nhật vào localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    // Cập nhật hiển thị thông tin người dùng
    loadUserData();
    window.location.href = "http://127.0.0.1:5500/order.html";
    alert('Cập nhật thành công');
});

// Tải thông tin người dùng vào form và hiển thị khi trang được tải
window.onload = loadUserData;