// ============================================================
// SCHEDULER.JS - QUẢN LÝ LỊCH HỌC (THÊM PDF, TÌM KIẾM)
// ============================================================

// ============================================
// BIẾN TOÀN CỤC
// ============================================
let schedules = [];
let filteredSchedules = [];
let currentFilter = '';

// ============================================
// KHỞI TẠO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    loadSchedules();
    renderScheduleList();
    setupEventListeners();
    setDefaultDate();
});

// ============================================
// TẢI / LƯU LỊCH
// ============================================
function loadSchedules() {
    try {
        const data = localStorage.getItem('schedules');
        schedules = data ? JSON.parse(data) : [];
        filteredSchedules = [...schedules];
    } catch (e) {
        schedules = [];
        filteredSchedules = [];
        console.error('Lỗi tải lịch:', e);
    }
}

function saveSchedules() {
    try {
        localStorage.setItem('schedules', JSON.stringify(schedules));
        filteredSchedules = [...schedules];
        if (currentFilter) {
            filterSchedules(currentFilter);
        }
        renderScheduleList();
        updateDashboardStats();
    } catch (e) {
        showToast('Lỗi lưu lịch: ' + e.message, 'error');
    }
}

// ============================================
// HIỂN THỊ DANH SÁCH
// ============================================
function renderScheduleList() {
    const container = document.getElementById('scheduleList');
    if (!container) return;

    const list = currentFilter ? filteredSchedules : schedules;

    if (list.length === 0) {
        container.innerHTML = `<p style="color: var(--text-secondary); text-align: center; padding: 20px;">
            ${currentFilter ? '🔍 Không tìm thấy lịch nào.' : '📭 Chưa có lịch học nào.'}
        </p>`;
        return;
    }

    container.innerHTML = list.map((item, index) => {
        const realIndex = schedules.indexOf(item);
        return `
            <div class="schedule-item" data-index="${realIndex}">
                <div class="info">
                    <span class="subject">📘 ${item.subject}</span>
                    <span class="meta">
                        📅 ${formatDate(item.date)} • ⏰ ${item.startTime} - ${item.endTime}
                        ${item.note ? ` • 📝 ${item.note}` : ''}
                    </span>
                </div>
                <div class="actions">
                    <button class="delete-btn" onclick="deleteSchedule(${realIndex})">Xóa</button>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// TÌM KIẾM LỊCH
// ============================================
function filterSchedules(keyword) {
    currentFilter = keyword.trim().toLowerCase();
    if (!currentFilter) {
        filteredSchedules = [...schedules];
    } else {
        filteredSchedules = schedules.filter(item =>
            item.subject.toLowerCase().includes(currentFilter) ||
            (item.note && item.note.toLowerCase().includes(currentFilter))
        );
    }
    renderScheduleList();
}

// ============================================
// THÊM LỊCH MỚI
// ============================================
function addSchedule(event) {
    event.preventDefault();

    const subject = document.getElementById('subject').value.trim();
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const note = document.getElementById('note').value.trim();

    if (!subject || !date || !startTime || !endTime) {
        showToast('Vui lòng điền đầy đủ thông tin.', 'warning');
        return;
    }

    // Kiểm tra thời gian hợp lệ
    if (startTime >= endTime) {
        showToast('Giờ kết thúc phải sau giờ bắt đầu.', 'error');
        return;
    }

    const newSchedule = {
        id: Date.now(),
        subject,
        date,
        startTime,
        endTime,
        note: note || '',
        createdAt: new Date().toISOString()
    };

    schedules.push(newSchedule);
    saveSchedules();

    // Reset form
    document.getElementById('scheduleForm').reset();
    setDefaultDate();

    showToast(`✅ Đã thêm lịch học "${subject}"`, 'success');
}

// ============================================
// XÓA LỊCH
// ============================================
function deleteSchedule(index) {
    if (!confirm('Bạn có chắc muốn xóa lịch học này không?')) return;

    const item = schedules[index];
    schedules.splice(index, 1);
    saveSchedules();
    showToast(`🗑️ Đã xóa lịch "${item.subject}"`, 'info');
}

// ============================================
// XUẤT PDF
// ============================================
async function exportSchedulePDF() {
    const list = currentFilter ? filteredSchedules : schedules;

    if (list.length === 0) {
        showToast('Không có lịch để xuất PDF.', 'warning');
        return;
    }

    showLoading('Đang tạo PDF...');

    try {
        // Tạo nội dung HTML cho PDF
        const content = document.createElement('div');
        content.style.cssText = 'padding: 24px; font-family: "Inter", sans-serif; background: white;';
        content.innerHTML = `
            <h1 style="font-size: 24px; margin-bottom: 4px;">📅 Lịch học của tôi</h1>
            <p style="color: #475569; margin-bottom: 20px;">Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <thead>
                    <tr style="background: #f1f5f9;">
                        <th style="padding: 10px 12px; text-align: left; border: 1px solid #e2e8f0;">Môn học</th>
                        <th style="padding: 10px 12px; text-align: left; border: 1px solid #e2e8f0;">Ngày</th>
                        <th style="padding: 10px 12px; text-align: left; border: 1px solid #e2e8f0;">Giờ bắt đầu</th>
                        <th style="padding: 10px 12px; text-align: left; border: 1px solid #e2e8f0;">Giờ kết thúc</th>
                        <th style="padding: 10px 12px; text-align: left; border: 1px solid #e2e8f0;">Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    ${list.map(item => `
                        <tr>
                            <td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-weight: 600;">${item.subject}</td>
                            <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${formatDate(item.date)}</td>
                            <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${item.startTime}</td>
                            <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${item.endTime}</td>
                            <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${item.note || '-'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <p style="margin-top: 16px; color: #94a3b8; font-size: 12px; text-align: center;">
                📊 Tổng số lịch: ${list.length} • Xuất từ StudyAI
            </p>
        `;

        // Dùng html2canvas để chụp ảnh
        const canvas = await html2canvas(content, {
            scale: 2,
            backgroundColor: '#ffffff',
            allowTaint: false,
            useCORS: true
        });

        const imgData = canvas.toDataURL('image/png');

        // Tạo PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('lich_hoc_cua_toi.pdf');

        hideLoading();
        showToast('📄 Đã xuất PDF thành công!', 'success');

    } catch (error) {
        console.error('Lỗi xuất PDF:', error);
        hideLoading();
        showToast('Lỗi xuất PDF: ' + error.message, 'error');
    }
}

// ============================================
// CẬP NHẬT THỐNG KÊ DASHBOARD
// ============================================
function updateDashboardStats() {
    try {
        const total = schedules.length;
        document.getElementById('totalSchedules').textContent = total;

        if (total > 0) {
            // Tính giờ trung bình
            let totalHours = 0;
            const subjectCount = {};

            schedules.forEach(item => {
                const start = item.startTime.split(':');
                const end = item.endTime.split(':');
                const hours = parseInt(end[0]) - parseInt(start[0]) + (parseInt(end[1]) - parseInt(start[1])) / 60;
                totalHours += hours;

                subjectCount[item.subject] = (subjectCount[item.subject] || 0) + 1;
            });

            const avgHours = (totalHours / total).toFixed(1);
            document.getElementById('avgHours').textContent = avgHours + 'h';

            // Môn học yêu thích
            let favSubject = '--';
            let maxCount = 0;
            for (const [subject, count] of Object.entries(subjectCount)) {
                if (count > maxCount) {
                    maxCount = count;
                    favSubject = subject;
                }
            }
            document.getElementById('favSubject').textContent = favSubject;
        } else {
            document.getElementById('avgHours').textContent = '0h';
            document.getElementById('favSubject').textContent = '--';
        }
    } catch (e) {
        // Bỏ qua lỗi nếu không có phần tử
    }
}

// ============================================
// HÀM TIỆN ÍCH
// ============================================
function formatDate(dateStr) {
    try {
        const d = new Date(dateStr);
        return d.toLocaleDateString('vi-VN', {
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch {
        return dateStr;
    }
}

function setDefaultDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        dateInput.value = today.toISOString().split('T')[0];
    }
}

// ============================================
// SỰ KIỆN
// ============================================
function setupEventListeners() {
    // Form thêm lịch
    const form = document.getElementById('scheduleForm');
    if (form) {
        form.addEventListener('submit', addSchedule);
    }

    // Tìm kiếm
    const searchBtn = document.getElementById('searchScheduleBtn');
    const searchInput = document.getElementById('searchSchedule');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            filterSchedules(searchInput.value);
        });
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') filterSchedules(searchInput.value);
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            const searchInput = document.getElementById('searchSchedule');
            if (searchInput) {
                searchInput.value = '';
                currentFilter = '';
                filteredSchedules = [...schedules];
                renderScheduleList();
                showToast('Đã xóa tìm kiếm', 'info');
            }
        });
    }

    // Xuất PDF
    const exportBtn = document.getElementById('exportPdfBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportSchedulePDF);
    }
}

// ============================================
// EXPORT (cho module nếu dùng)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        schedules,
        addSchedule,
        deleteSchedule,
        filterSchedules,
        exportSchedulePDF,
        renderScheduleList,
        updateDashboardStats
    };
}
