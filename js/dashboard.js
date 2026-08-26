// ============================================================
// DASHBOARD.JS - THỐNG KÊ CÁ NHÂN VÀ BIỂU ĐỒ
// ============================================================

// ============================================
// KHỞI TẠO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    renderPersonalStats();
    renderCharts();
});

// ============================================
// THỐNG KÊ CÁ NHÂN
// ============================================
function renderPersonalStats() {
    const container = document.getElementById('personalStats');
    if (!container) return;

    try {
        // Lấy dữ liệu từ localStorage
        const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
        const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');

        if (schedules.length === 0 && moodHistory.length === 0) {
            container.innerHTML = `
                <div class="personal-stats-empty">
                    <p>📊 Chưa có dữ liệu thống kê</p>
                    <p style="font-size: 13px; color: #94a3b8;">Hãy thêm lịch học hoặc ghi lại cảm xúc để xem thống kê</p>
                </div>
            `;
            return;
        }

        // Thống kê lịch học
        let totalSchedules = schedules.length;
        let totalHours = 0;
        let subjectCount = {};

        schedules.forEach(item => {
            const start = item.startTime.split(':');
            const end = item.endTime.split(':');
            const hours = parseInt(end[0]) - parseInt(start[0]) + (parseInt(end[1]) - parseInt(start[1])) / 60;
            totalHours += hours;
            subjectCount[item.subject] = (subjectCount[item.subject] || 0) + 1;
        });

        const avgHours = totalSchedules > 0 ? (totalHours / totalSchedules).toFixed(1) : 0;
        let favSubject = '--';
        let maxCount = 0;
        for (const [subject, count] of Object.entries(subjectCount)) {
            if (count > maxCount) {
                maxCount = count;
                favSubject = subject;
            }
        }

        // Thống kê cảm xúc
        const moodCount = {};
        moodHistory.forEach(item => {
            moodCount[item.mood] = (moodCount[item.mood] || 0) + 1;
        });

        const moodEmojis = {
            happy: '😊',
            neutral: '😐',
            sad: '😢',
            stressed: '😰',
            angry: '😡'
        };

        let moodStats = '';
        for (const [mood, count] of Object.entries(moodCount)) {
            const emoji = moodEmojis[mood] || '❓';
            moodStats += `<span style="margin-right: 12px;">${emoji} ${count}</span>`;
        }

        // Thống kê chat
        const chatCount = chatHistory.length;

        container.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-top: 4px;">
                <div style="background: var(--bg-primary); padding: 14px 18px; border-radius: 10px;">
                    <div style="font-size: 12px; color: var(--text-secondary);">📚 Số lịch học</div>
                    <div style="font-size: 24px; font-weight: 700;">${totalSchedules}</div>
                </div>
                <div style="background: var(--bg-primary); padding: 14px 18px; border-radius: 10px;">
                    <div style="font-size: 12px; color: var(--text-secondary);">⏱️ Giờ TB/môn</div>
                    <div style="font-size: 24px; font-weight: 700;">${avgHours}h</div>
                </div>
                <div style="background: var(--bg-primary); padding: 14px 18px; border-radius: 10px;">
                    <div style="font-size: 12px; color: var(--text-secondary);">⭐ Môn yêu thích</div>
                    <div style="font-size: 24px; font-weight: 700;">${favSubject}</div>
                </div>
                <div style="background: var(--bg-primary); padding: 14px 18px; border-radius: 10px;">
                    <div style="font-size: 12px; color: var(--text-secondary);">💬 Số câu hỏi AI</div>
                    <div style="font-size: 24px; font-weight: 700;">${chatCount}</div>
                </div>
                ${moodStats ? `
                <div style="background: var(--bg-primary); padding: 14px 18px; border-radius: 10px; grid-column: span auto;">
                    <div style="font-size: 12px; color: var(--text-secondary);">😌 Cảm xúc gần đây</div>
                    <div style="font-size: 20px; margin-top: 4px;">${moodStats}</div>
                </div>
                ` : ''}
            </div>
        `;

    } catch (e) {
        console.error('Lỗi renderPersonalStats:', e);
        container.innerHTML = `
            <div class="personal-stats-empty">
                <p>⚠️ Lỗi tải dữ liệu</p>
            </div>
        `;
    }
}

// ============================================
// VẼ BIỂU ĐỒ
// ============================================
function renderCharts() {
    // Sử dụng Canvas API để vẽ biểu đồ đơn giản
    const charts = [
        { id: 'gradesChart', type: 'bar', label: 'Điểm trung bình' },
        { id: 'stressChart', type: 'line', label: 'Mức độ căng thẳng' },
        { id: 'aiUsageChart', type: 'bar', label: 'Lượt sử dụng AI' }
    ];

    charts.forEach(({ id, type, label }) => {
        const canvas = document.getElementById(id);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Dữ liệu mẫu (sau này có thể lấy từ CSV)
        const data = generateSampleData(id, type);
        drawChart(ctx, canvas, data, type, label);
    });
}

function generateSampleData(chartId, type) {
    // Dữ liệu mẫu cho từng biểu đồ
    const samples = {
        'gradesChart': {
            labels: ['Toán', 'Lý', 'Hóa', 'Văn', 'Anh'],
            values: [8.5, 7.8, 9.2, 6.5, 8.0]
        },
        'stressChart': {
            labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            values: [3, 5, 4, 6, 7, 5, 3]
        },
        'aiUsageChart': {
            labels: ['Học tập', 'Lịch học', 'Sức khỏe', 'Khác'],
            values: [45, 30, 15, 10]
        }
    };

    return samples[chartId] || { labels: [], values: [] };
}

function drawChart(ctx, canvas, data, type, label) {
    const width = canvas.width || 400;
    const height = canvas.height || 200;
    const padding = { top: 20, bottom: 30, left: 30, right: 20 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Xóa canvas
    ctx.clearRect(0, 0, width, height);

    if (!data.labels || data.labels.length === 0) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Chưa có dữ liệu', width / 2, height / 2);
        return;
    }

    const values = data.values;
    const maxVal = Math.max(...values, 1);
    const step = chartWidth / (values.length - 1 || 1);

    // Vẽ trục
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;

    // Trục Y
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.stroke();

    // Trục X
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top + chartHeight);
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.stroke();

    // Vẽ dữ liệu
    if (type === 'bar') {
        const barWidth = chartWidth / values.length * 0.6;
        const gap = chartWidth / values.length;

        values.forEach((val, i) => {
            const x = padding.left + i * gap + (gap - barWidth) / 2;
            const barHeight = (val / maxVal) * chartHeight;
            const y = padding.top + chartHeight - barHeight;

            // Gradient cho cột
            const gradient = ctx.createLinearGradient(x, y, x, padding.top + chartHeight);
            gradient.addColorStop(0, '#3b82f6');
            gradient.addColorStop(1, '#60a5fa');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, barHeight, 4);
            ctx.fill();

            // Hiển thị giá trị
            ctx.fillStyle = '#0f172a';
            ctx.font = '10px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(val, x + barWidth / 2, y - 4);

            // Nhãn
            ctx.fillStyle = '#64748b';
            ctx.font = '10px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(data.labels[i], x + barWidth / 2, padding.top + chartHeight + 16);
        });
    } else if (type === 'line') {
        // Vẽ đường
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2.5;
        ctx.beginPath();

        values.forEach((val, i) => {
            const x = padding.left + i * step;
            const y = padding.top + chartHeight - (val / maxVal) * chartHeight;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Vẽ điểm
        values.forEach((val, i) => {
            const x = padding.left + i * step;
            const y = padding.top + chartHeight - (val / maxVal) * chartHeight;

            ctx.fillStyle = '#3b82f6';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();

            // Hiển thị giá trị
            ctx.fillStyle = '#0f172a';
            ctx.font = '10px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(val, x, y - 8);

            // Nhãn
            ctx.fillStyle = '#64748b';
            ctx.font = '10px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(data.labels[i], x, padding.top + chartHeight + 16);
        });
    }

    // Tự động resize khi thay đổi kích thước màn hình
    const resizeObserver = new ResizeObserver(() => {
        // Vẽ lại khi resize
        // Đơn giản hóa: không vẽ lại để tránh loop
    });
    if (canvas) {
        resizeObserver.observe(canvas.parentElement);
    }
}

// ============================================
// HÀM TIỆN ÍCH CHO ROUNDRECT
// ============================================
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (r > w / 2) r = w / 2;
        if (r > h / 2) r = h / 2;
        this.moveTo(x + r, y);
        this.lineTo(x + w - r, y);
        this.quadraticCurveTo(x + w, y, x + w, y + r);
        this.lineTo(x + w, y + h - r);
        this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        this.lineTo(x + r, y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - r);
        this.lineTo(x, y + r);
        this.quadraticCurveTo(x, y, x + r, y);
        return this;
    };
}

// ============================================
// EXPORT (cho module nếu dùng)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { renderPersonalStats, renderCharts };
}
