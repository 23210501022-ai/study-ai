// ============================================================
// MENTAL-HEALTH.JS - SỨC KHỎE TINH THẦN
// ============================================================

// ============================================
// KHỞI TẠO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    loadMoodHistory();
    setupMoodForm();
});

// ============================================
// LƯU VÀ TẢI DỮ LIỆU CẢM XÚC
// ============================================
function loadMoodHistory() {
    const container = document.getElementById('moodHistory');
    if (!container) return;

    try {
        const data = localStorage.getItem('moodHistory');
        const moods = data ? JSON.parse(data) : [];

        if (moods.length === 0) {
            container.innerHTML = `<p style="color: var(--text-secondary); text-align: center; padding: 20px;">📭 Chưa có dữ liệu cảm xúc.</p>`;
            return;
        }

        // Hiển thị ngược để mới nhất ở trên
        const reversed = [...moods].reverse();

        container.innerHTML = reversed.map(item => {
            const moodEmoji = {
                happy: '😊',
                neutral: '😐',
                sad: '😢',
                stressed: '😰',
                angry: '😡'
            }[item.mood] || '❓';

            const moodLabel = {
                happy: 'Vui vẻ',
                neutral: 'Bình thường',
                sad: 'Buồn',
                stressed: 'Căng thẳng',
                angry: 'Tức giận'
            }[item.mood] || item.mood;

            const date = new Date(item.date).toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            return `
                <div class="mood-item">
                    <div>
                        <span class="mood-emoji">${moodEmoji}</span>
                        <span style="font-weight: 500;">${moodLabel}</span>
                        ${item.note ? `<span style="color: var(--text-secondary); font-size: 13px;">- ${item.note}</span>` : ''}
                    </div>
                    <span class="mood-date">${date}</span>
                </div>
            `;
        }).join('');

    } catch (e) {
        console.error('Lỗi tải dữ liệu cảm xúc:', e);
        container.innerHTML = `<p style="color: #ef4444; text-align: center;">⚠️ Lỗi tải dữ liệu</p>`;
    }
}

function saveMood(mood, note) {
    try {
        const data = localStorage.getItem('moodHistory');
        const moods = data ? JSON.parse(data) : [];

        moods.push({
            mood: mood,
            note: note.trim() || '',
            date: new Date().toISOString()
        });

        // Giữ tối đa 100 bản ghi
        while (moods.length > 100) moods.shift();

        localStorage.setItem('moodHistory', JSON.stringify(moods));
        loadMoodHistory();

        showToast('💾 Đã lưu cảm xúc của bạn!', 'success');

    } catch (e) {
        console.error('Lỗi lưu cảm xúc:', e);
        showToast('Lỗi lưu dữ liệu', 'error');
    }
}

// ============================================
// SỰ KIỆN FORM
// ============================================
function setupMoodForm() {
    const form = document.getElementById('moodForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const select = document.getElementById('moodSelect');
        const note = document.getElementById('moodNote');

        if (!select || !note) return;

        const mood = select.value;
        const noteText = note.value;

        saveMood(mood, noteText);

        // Reset form
        note.value = '';
    });
}
