// ============================================================
// DATA.JS - DỮ LIỆU MẪU (CÓ THỂ TÙY CHỈNH)
// ============================================================

// Dữ liệu mẫu cho biểu đồ (sẽ được sử dụng bởi dashboard.js)
// Nếu bạn có file CSV, có thể thay thế dữ liệu này

const sampleData = {
    grades: {
        labels: ['Toán', 'Lý', 'Hóa', 'Văn', 'Anh', 'Sinh'],
        values: [8.5, 7.2, 9.0, 6.8, 8.0, 7.5]
    },
    stress: {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        values: [3, 5, 4, 6, 7, 5, 2]
    },
    aiUsage: {
        labels: ['Học tập', 'Lịch học', 'Sức khỏe', 'Giải trí'],
        values: [45, 25, 20, 10]
    }
};

// Hàm lấy dữ liệu (có thể mở rộng để đọc từ CSV)
function getSampleData(type) {
    return sampleData[type] || null;
}

// Nếu cần đọc dữ liệu từ CSV, bạn có thể thêm hàm parse CSV ở đây
// function loadCSVData(file) { ... }

console.log('📊 Dữ liệu mẫu đã sẵn sàng');
