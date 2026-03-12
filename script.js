const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const startBtn = document.getElementById("startBtn");
const recognizedTextDiv = document.getElementById("recognizedText");
const resultDiv = document.getElementById("result");

if (!SpeechRecognition) {
  startBtn.disabled = true;
  startBtn.textContent = "يا مختار المحندر المتصفح لا يدعم التعرف على الصوت";
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "ar-SA";
  recognition.interimResults = false;

  startBtn.addEventListener("click", () => {
    resultDiv.textContent = "";
    recognizedTextDiv.textContent = "استمع الآن يا مختار المحندر...";
    recognition.start();
  });

  recognition.addEventListener("result", (event) => {
    let text = event.results[0][0].transcript;
    recognizedTextDiv.textContent = text;

    // تحويل الكلمات العربية إلى رموز
    text = text.replace(/زائد|جمع/g, "+");
    text = text.replace(/ناقص|طرح/g, "-");
    text = text.replace(/ضرب|في/g, "*");
    text = text.replace(/قسمة|على/g, "/");

    // إزالة أي شيء غير مسموح
    const safe = text.replace(/[^0-9+\-*/().]/g, "");

    try {
      const result = Function(`return (${safe})`)();
      resultDiv.textContent = isNaN(result)
        ? "يا مختار المحندر للأسف الشديد ما قدرت أحسب العملية"
        : result;
    } catch {
      resultDiv.textContent = "يا مختار المحندر خطأ في الحساب";
    }
  });

  recognition.addEventListener("error", () => {
    recognizedTextDiv.textContent = "خطأ في التعرف على الصوت";
  });
}
