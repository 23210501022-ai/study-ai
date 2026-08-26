// ============================================================
// APP.JS - ĐIỀU HƯỚNG TAB, THEME, KHỞI TẠO
// ============================================================

// ============================================
// CHUYỂN TAB
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        // Ẩn tất cả tab
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Hiển thị tab được chọn
        const targetTab = document.getElementById(tabId);
        if (targetTab) {
            targetTab.classList.add('active');
        }

        // Cập nhật trạng thái nút
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active');
            }
        });
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            if (tabId) {
                switchTab(tabId);
            }
        });
    });

    // ============================================
    // CHUYỂN ĐỔI SÁNG/TỐI
    // ============================================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Kiểm tra theme đã lưu
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            this.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // ============================================
    // KHỞI TẠO CÁC MODULE
    // ============================================
    // Các module khác sẽ tự khởi tạo qua DOMContentLoaded của chúng

    // Cập nhật thống kê dashboard (nếu có hàm)
    if (typeof updateDashboardStats === 'function') {
        setTimeout(updateDashboardStats, 100);
    }

    console.log('🚀 StudyAI đã sẵn sàng!');
});
