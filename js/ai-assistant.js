// ============================================================
// AI-ASSISTANT.JS - TRỢ LÝ THÔNG MINH NÂNG CAO
// ============================================================

// ============================================
// KIẾN THỨC CƠ SỞ NÂNG CAO (DẠNG ARRAY)
// ============================================
const knowledgeBaseAdvanced = [
    // === HỌC TẬP ===
    {
        keywords: ['học tập', 'học hiệu quả', 'phương pháp học', 'cách học', 'mẹo học'],
        response: `📚 *Phương pháp học tập hiệu quả:*
• **Phương pháp Pomodoro**: Học 25 phút, nghỉ 5 phút.
• **Học chủ động**: Đặt câu hỏi và giải thích lại kiến thức.
• **Ôn tập ngắt quãng**: Xem lại tài liệu sau 1 ngày, 1 tuần, 1 tháng.
• **Ghi chú thông minh**: Sử dụng sơ đồ tư duy (Mindmap).
• **Tập trung**: Tắt thông báo, dùng ứng dụng như Forest.`
    },
    {
        keywords: ['lịch', 'thời khóa biểu', 'sắp xếp', 'quản lý thời gian'],
        response: `📅 *Mẹo lên lịch học thông minh:*
• Lên lịch cụ thể cho từng môn học.
• Ưu tiên môn khó vào lúc bạn tập trung nhất.
• Dành thời gian ôn tập cuối ngày.
• Cân bằng giữa học và nghỉ ngơi.
• Sử dụng ứng dụng quản lý thời gian.`
    },
    {
        keywords: ['toán', 'lý', 'hóa', 'sinh', 'văn', 'anh', 'môn học'],
        response: `📖 *Mẹo học từng môn:*
• **Toán**: Làm nhiều bài tập, hiểu công thức thay vì học thuộc.
• **Văn**: Đọc kỹ, viết dàn ý trước khi làm bài.
• **Anh văn**: Xem phim, nghe nhạc, học từ vựng theo chủ đề.
• **Lý/Hóa**: Thực hành thí nghiệm, liên hệ thực tế.
• **Sinh**: Sử dụng sơ đồ và hình ảnh để ghi nhớ.`
    },

    // === SỨC KHỎE TINH THẦN ===
    {
        keywords: ['stress', 'căng thẳng', 'áp lực', 'lo âu', 'mệt mỏi'],
        response: `😌 *Giảm căng thẳng hiệu quả:*
• **Hít thở sâu**: Hít vào 4s, giữ 4s, thở ra 6s.
• **Thiền**: Dành 5-10 phút thiền mỗi ngày.
• **Vận động**: Đi bộ, chạy bộ hoặc tập yoga.
• **Nghỉ ngơi**: Ngủ đủ 7-8 tiếng mỗi đêm.
• **Kết nối**: Trò chuyện với bạn bè, gia đình.`
    },
    {
        keywords: ['ngủ', 'mất ngủ', 'giấc ngủ', 'nghỉ ngơi'],
        response: `🌙 *Cải thiện giấc ngủ:*
• Đi ngủ và thức dậy đúng giờ mỗi ngày.
• Tắt thiết bị điện tử 1 giờ trước khi ngủ.
• Uống trà hoa cúc hoặc sữa ấm.
• Đọc sách trước khi ngủ.
• Nghe nhạc nhẹ hoặc tiếng mưa.`
    },

    // === LỜI KHUYÊN CHUNG ===
    {
        keywords: ['động lực', 'mất động lực', 'chán nản', 'bỏ cuộc'],
        response: `🔥 *Tìm lại động lực học tập:*
• Nhớ lại mục tiêu lớn của bạn.
• Chia nhỏ mục tiêu thành từng bước.
• Tự thưởng khi hoàn thành.
• Xem video hoặc đọc sách truyền cảm hứng.
• Nhớ rằng: "Thành công không phải là đích đến, mà là hành trình."`
    },
    {
        keywords: ['kỹ năng', 'mềm', 'giao tiếp', 'thuyết trình', 'làm việc nhóm'],
        response: `🤝 *Phát triển kỹ năng mềm:*
• **Giao tiếp**: Lắng nghe tích cực, đặt câu hỏi mở.
• **Thuyết trình**: Luyện tập trước gương, sử dụng slide rõ ràng.
• **Làm việc nhóm**: Tôn trọng ý kiến khác, chia công việc hợp lý.
• **Lãnh đạo**: Đưa ra tầm nhìn và truyền cảm hứng cho người khác.`
    },
    {
        keywords: ['thi cử', 'kiểm tra', 'bài thi', 'ôn thi', 'áp lực thi'],
        response: `📝 *Chiến lược ôn thi hiệu quả:*
• Lập kế hoạch ôn thi cụ thể.
• Ôn theo dạng đề và cấu trúc.
• Làm bài kiểm tra thử.
• Nghỉ ngơi đủ và ăn uống lành mạnh.
• Ngủ đủ giấc trước ngày thi.
• Bình tĩnh và tự tin khi làm bài.`
    }
];

// ============================================
// HÀM XỬ LÝ TIN NHẮN AI
// ============================================
function getAIResponseAdvanced(userMessage) {
    const lower = userMessage.toLowerCase().trim();

    // Xử lý các trường hợp đặc biệt
    if (!lower || lower.length < 2) {
        return "😊 Bạn có thể nói rõ hơn được không?";
    }

    // Tìm kiếm trong knowledgeBase
    for (const item of knowledgeBaseAdvanced) {
        for (const keyword of item.keywords) {
            if (lower.includes(keyword)) {
                return item.response;
            }
        }
    }

    // Nếu không tìm thấy, trả về phản hồi mặc định
    return `🤔 Cảm ơn câu hỏi của bạn! Tôi sẽ cố gắng học thêm để trả lời tốt hơn. Bạn có thể thử hỏi về:
    • Phương pháp học tập
    • Lịch học và quản lý thời gian
    • Sức khỏe tinh thần
    • Kỹ năng mềm và thi cử

Hoặc bạn có thể gửi góp ý để tôi hoàn thiện hơn! 😊`;
}

// ============================================
// KHỞI TẠO AI ASSISTANT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chatBox');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSendBtn');
    const clearBtn = document.getElementById('chatClearBtn');

    if (!chatBox || !chatInput || !sendBtn) return;

    // Hàm thêm tin nhắn vào chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
        
        const avatar = document.createElement('span');
        avatar.className = 'chat-avatar';
        avatar.textContent = isUser ? '👤' : '🤖';
        
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        // Chuyển đổi markdown đơn giản
        bubble.innerHTML = text.replace(/\n/g, '<br>');
        
        messageDiv.appendChild(isUser ? bubble : avatar);
        messageDiv.appendChild(isUser ? avatar : bubble);
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Xử lý gửi tin nhắn
    function handleSendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Thêm tin nhắn của user
        addMessage(message, true);
        chatInput.value = '';

        // Hiệu ứng loading
        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'chat-message bot';
        loadingMsg.id = 'loadingMessage';
        loadingMsg.innerHTML = `
            <span class="chat-avatar">🤖</span>
            <div class="chat-bubble">⏳ Đang suy nghĩ...</div>
        `;
        chatBox.appendChild(loadingMsg);
        chatBox.scrollTop = chatBox.scrollHeight;

        // Giả lập thời gian suy nghĩ
        setTimeout(() => {
            // Xóa loading
            const loadingEl = document.getElementById('loadingMessage');
            if (loadingEl) loadingEl.remove();

            // Lấy phản hồi AI
            const response = getAIResponseAdvanced(message);
            addMessage(response, false);

            // Lưu lịch sử vào localStorage
            saveChatHistory(message, response);
        }, 600 + Math.random() * 400);
    }

    // Lưu lịch sử chat vào localStorage
    function saveChatHistory(question, answer) {
        try {
            const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
            history.push({
                time: new Date().toISOString(),
                question: question,
                answer: answer
            });
            // Giữ tối đa 50 tin nhắn
            while (history.length > 50) history.shift();
            localStorage.setItem('chatHistory', JSON.stringify(history));
        } catch (e) {
            // Bỏ qua nếu lỗi
        }
    }

    // Xóa lịch sử chat
    function clearChat() {
        while (chatBox.children.length > 1) {
            chatBox.removeChild(chatBox.lastChild);
        }
        // Giữ lại tin nhắn chào mừng
        const firstMsg = chatBox.querySelector('.chat-message');
        if (firstMsg) {
            chatBox.innerHTML = '';
            chatBox.appendChild(firstMsg);
        }
        localStorage.removeItem('chatHistory');
        showToast('Đã xóa lịch sử chat', 'info');
    }

    // Sự kiện
    sendBtn.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });
    if (clearBtn) {
        clearBtn.addEventListener('click', clearChat);
    }

    // Tải lịch sử chat từ localStorage (nếu có)
    try {
        const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
        if (history.length > 0) {
            // Chỉ hiển thị 5 tin nhắn gần nhất
            const recent = history.slice(-5);
            recent.forEach(item => {
                // Không thêm lại tin nhắn chào mừng
                if (item.question) {
                    addMessage(item.question, true);
                    addMessage(item.answer, false);
                }
            });
        }
    } catch (e) {
        // Bỏ qua
    }
});
