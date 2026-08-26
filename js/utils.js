// ============================================================
// UTILS.JS - HÀM TIỆN ÍCH (TOAST, LOADING)
// ============================================================

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    if (!container) {
        // Nếu chưa có container, tạo mới
        const newContainer = document.createElement('div');
        newContainer.id = 'toastContainer';
        newContainer.className = 'toast-container';
        document.body.appendChild(newContainer);
        return showToast(message, type, duration);
    }
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, duration);
}

// ============================================
// LOADING OVERLAY
// ============================================
let loadingTimeout = null;

function showLoading(message = 'Đang xử lý...') {
    let overlay = document.getElementById('loadingOverlay');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-spinner"></div>
            <p id="loadingMessage">${message}</p>
        `;
        document.body.appendChild(overlay);
    }
    
    const textEl = overlay.querySelector('#loadingMessage');
    if (textEl) textEl.textContent = message;
    
    overlay.style.display = 'flex';
    clearTimeout(loadingTimeout);
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (!overlay) return;
    
    loadingTimeout = setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
}

// Tự động ẩn loading sau 30s (phòng trường hợp lỗi)
setInterval(() => {
    hideLoading();
}, 30000);

// ============================================
// EXPORT (cho module nếu dùng)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showToast, showLoading, hideLoading };
}
