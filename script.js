// script.js
const socket = new WebSocket('ws://localhost:8080'); // استبدل بعنوان الخادم الخاص بك

// قائمة الكلمات الممنوعة
const forbiddenWords = ['سيئة', 'سيئ', 'مسيئة', 'سخيفة', 'سخيف'];

// دالة للتحقق من وجود كلمة ممنوعة
function hasForbiddenWord(message) {
    for (let word of forbiddenWords) {
        if (message.includes(word)) {
            return true;
        }
    }
    return false;
}

socket.onmessage = (event) => {
    const message = event.data;
    displayMessage(message, 'received');
};

function sendMessage() {
    const input = document.getElementById('message-input');
    let message = input.value.trim();
    
    if (message) {
        // التحقق من وجود كلمة ممنوعة
        if (hasForbiddenWord(message)) {
            displayMessage('الرسالة تحتوي على كلمات ممنوعة', 'sent-error');
            input.value = '';
            return;
        }
        
        // إرسال الرسالة إذا لم تحتوي على كلمات ممنوعة
        socket.send(message);
        displayMessage(message, 'sent');
        input.value = '';
    }
}

// دالة عرض الرسائل مع التأكيد على نوع الرسالة (خطأ أو غيرها)
function displayMessage(message, type) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = message;
    messageElement.appendChild(messageContent);
    chatMessages.appendChild(messageElement);
}

// تعديل toggleTheme لتبديل بين الأوضاع الليلية والنهارية مع animation للشمس والقمر
function toggleTheme() {
    const body = document.body;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    // تحديد الصور حسب الوضع الحالي
    const sunImage = 'path/to/sun-icon.png'; // صورة الشمس
    const moonImage = 'path/to/moon-icon.png'; // صورة القمر
    
    // تشغيل الـ animation للشمس والقمر
    sunIcon.style.opacity = '0';
    moonIcon.style.opacity = '0';
    setTimeout(() => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        if (body.classList.contains('dark-mode')) {
            sunIcon.src = moonImage; // تغيير إلى صورة القمر
            moonIcon.src = sunImage; // تغيير إلى صورة الشمس
        } else {
            sunIcon.src = sunImage; // تغيير إلى صورة الشمس
            moonIcon.src = moonImage; // تغيير إلى صورة القمر
        }
        sunIcon.style.opacity = '1';
        moonIcon.style.opacity = '1';
    }, 500); // انتظر 0.5 ثانية قبل تغيير النمط وعرض الصور
}