const questionData = [
    {
        title: "שאלה 1: גדילה ודעיכה",
        prompt: "יש ברשותי מכונית בדיוק 3 שנים. מחירה היום הוא 50,000 שקלים. המחיר יורד כל שנה ב-10%.",
        section: "א. מה הסכום ששילמתי עבור המכונית (לפני 3 שנים)?",
        options: ["68,587.11 ש\"ח", "65,000 ש\"ח", "55,000 ש\"ח", "72,130 ש\"ח"],
        correct: 0,
        solution: "M<sub>0</sub> = 50,000 / 0.9<sup>3</sup> = 68,587.11"
    },
    {
        title: "שאלה 1: גדילה ודעיכה",
        prompt: "יש ברשותי מכונית בדיוק 3 שנים. מחירה היום הוא 50,000 שקלים. המחיר יורד כל שנה ב-10%.",
        section: "ב. אם אמכור את המכונית בעוד שלוש שנים, מה יהיה מחירה?",
        options: ["40,000 ש\"ח", "36,450 ש\"ח", "33,000 ש\"ח", "31,500 ש\"ח"],
        correct: 1,
        solution: "M<sub>3</sub> = 50,000 · 0.9<sup>3</sup> = 36,450"
    },
    {
        title: "שאלה 2: גדילה מעריכית",
        prompt: "חלקת יער הכילה לפני 20 שנים 30,000 טונות עץ. היום יש בה 40,000 טונות.",
        section: "א. בכמה אחוזים גדלה כמות העץ מדי שנה?",
        options: ["1.2%", "2.1%", "1.45%", "0.85%"],
        correct: 2,
        solution: "40,000 = 30,000 · q<sup>20</sup> ⇒ q = 1.0145 (1.45%)"
    },
    {
        title: "שאלה 2: גדילה מעריכית",
        prompt: "חלקת יער הכילה לפני 20 שנים 30,000 טונות עץ. היום יש בה 40,000 טונות.",
        section: "ב. מה תהיה כמות העץ ביער בעוד 20 שנה?",
        options: ["50,000 טונות", "60,000 טונות", "53,333.33 טונות", "48,500 טונות"],
        correct: 2,
        solution: "M<sub>40</sub> = 30,000 · 1.0145<sup>40</sup> = 53,333.33"
    },
    {
        title: "שאלה 3: תוכניות חיסכון",
        prompt: "ברשותי 200,000 ש\"ח. תוכנית א': 5 שנים, 50% רווח סה\"כ. תוכנית ב': 6 שנים, ריבית שנתית של 7%.",
        section: "איזו תוכנית משתלמת יותר?",
        options: ["תוכנית א'", "תוכנית ב'", "הן זהות", "אי אפשר לקבוע"],
        correct: 1,
        solution: "א': 200,000 · 1.5 = 300,000 ש\"ח <br> ב': 200,000 · 1.07<sup>6</sup> = 300,146 ש\"ח"
    }
];

let currentIdx = 0;
let score = 0;

function loadStep() {
    const data = questionData[currentIdx];
    
    // מוודא שהאלמנטים קיימים ב-HTML לפני שכותב אליהם
    const label = document.getElementById('step-label');
    const title = document.getElementById('question-title');
    const instruction = document.getElementById('instruction-text');
    
    if (label) label.innerText = `שאלה ${currentIdx + 1} מתוך ${questionData.length}`;
    if (title) title.innerText = data.title;
    if (instruction) {
        instruction.innerHTML = `
            <div style="margin-bottom:10px; font-weight:normal; color:#555;">${data.prompt}</div>
            <div style="font-weight:bold;">${data.section}</div>
        `;
    }

    const optionsGrid = document.getElementById('options-grid');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');

    feedback.style.display = 'none';
    nextBtn.style.display = 'none';
    optionsGrid.innerHTML = '';

    data.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-bt';
        btn.innerText = opt;
        btn.onclick = () => checkResult(i);
        optionsGrid.appendChild(btn);
    });
}

function checkResult(choice) {
    const data = questionData[currentIdx];
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');
    const allButtons = document.querySelectorAll('.option-bt');
    
    allButtons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === choice) btn.classList.add('selected');
    });

    feedback.style.display = 'block';

    if (choice === data.correct) {
        score++;
        feedback.className = 'feedback-box correct';
        feedback.innerHTML = `<strong>כל הכבוד! 🎉</strong> תשובה נכונה.`;
    } else {
        feedback.className = 'feedback-box wrong';
        // כאן החיבור הקריטי ל-CSS שלך: שימוש ב-solution-path ו-solution-content
        feedback.innerHTML = `
            <strong>טעות...</strong> התשובה הנכונה היא: ${data.options[data.correct]}
            <div class="solution-path">
                <div class="solution-content" style="display:block !important;">
                    ${data.solution}
                </div>
            </div>
        `;
    }
    nextBtn.style.display = 'inline-block';
}

function showSummary() {
    const quizCard = document.querySelector('.quiz-card');
    quizCard.innerHTML = `
        <div class="summary-container" style="text-align: center; padding: 40px;">
            <h2 style="color:var(--primary-color)">סיכום תרגול</h2>
            <div style="font-size: 4em; color: var(--accent-color); margin: 20px 0; font-weight:bold;">${score}/${questionData.length}</div>
            <p>סיימת את התרגול בהצלחה!</p>
            <button class="btn btn-primary" onclick="location.reload()" style="margin-top: 20px;">נסה שוב</button>
            <br>
            <a href="index.html" style="display: inline-block; margin-top: 20px; color: var(--primary-color); text-decoration: underline;">חזרה לדף הבית</a>
        </div>
    `;
}

document.getElementById('next-btn').onclick = () => {
    if (currentIdx < questionData.length - 1) {
        currentIdx++;
        loadStep();
    } else {
        showSummary();
    }
};

window.onload = loadStep;