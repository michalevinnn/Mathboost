document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const subjectSelect = document.getElementById('subjectSelect'); // שים לב ל-ID המעודכן
    const gradeSelect = document.getElementById('gradeSelect');
    const unitSelect = document.getElementById('unitSelect');
    const dateInput = document.getElementById('lessonDate');
    const timeSelect = document.getElementById('lessonTimeSelect');

    // --- 1. נתונים דינמיים לנושאי לימוד ---
    const subjectsData = {
        "3": {
            "י": ["מודל ליניארי", "גדילה ודעיכה", "סטטיסטיקה", "דמיון משולשים"],
            "יא": ["גדילה ודעיכה", "בעיות כלכליות", "מסלולים", "טריגונומטריה", "הסתברות"],
            "יב": ["גופים", "גיאומטריה אנליטית", "תכנון ליניארי", "ראייה מרחבית", "מודל ריבועי", "התפלגות נורמלית"]
        },
        "4": {
            "י": ["בעיות קיצון", "חדו''א פונקציות שורש", "גאומטריה (ללא מעגל)", "סטטיסטיקה"],
            "יא": ["חדו''א רציונלית", "הסתברות", "גאומטריה (עם מעגל)", "טריגונומטריה (עם מעגל)"],
            "יב": ["חדו''א לוגריתמית", "חדו''א מעריכית", "סדרות", "גדילה ודעיכה", "וקטורים"]
        },
        "5": {
            "י": ["גאומטריה", "הסתברות", "קשר בין גרף לנגזרת", "בעיות קיצון"],
            "יא": ["סדרות", "חדו''א רציונלית", "טריגונומטריה", "חדו''א משולבת שורש", "חדו''א טריגונומטרית"],
            "יב": ["גיאומטריה אנליטית", "אינטגרלים", "העמקת חקירה", "טריגונומטריה במרחב", "וקטורים", "מספרים מרוכבים"]
        }
    };

    // פונקציה לעדכון נושאי הלימוד
    function updateSubjects() {
        const grade = gradeSelect.value;
        const unit = unitSelect.value;
        
        // ניקוי הרשימה
        subjectSelect.innerHTML = '';

        if (grade && unit) {
            const list = subjectsData[unit][grade];
            subjectSelect.innerHTML = '<option value="">בחר נושא</option>';
            list.forEach(item => {
                const option = document.createElement('option');
                option.value = item;
                option.textContent = item;
                subjectSelect.appendChild(option);
            });
            subjectSelect.disabled = false;
        } else {
            subjectSelect.innerHTML = '<option value="">בחר קודם כיתה ויחידות</option>';
            subjectSelect.disabled = true;
        }
    }

    gradeSelect.addEventListener('change', updateSubjects);
    unitSelect.addEventListener('change', updateSubjects);

    // --- 2. הצגת טיפים דינמיים לפי נושא ---
    subjectSelect.addEventListener('change', function() {
        const selectedSubject = this.value;
        let tipElement = document.getElementById('subjectTip');
        if (!tipElement) {
            tipElement = document.createElement('p');
            tipElement.id = 'subjectTip';
            tipElement.style.marginTop = '10px';
            tipElement.style.fontWeight = 'bold';
            this.parentElement.appendChild(tipElement);
        }
        
        if (selectedSubject.includes('חדו')) {
            tipElement.innerHTML = "💡 טיפ: וודא שיש לך מחשבון מדעי זמין לשיעור.";
            tipElement.style.color = "#061f4e";
        } else if (selectedSubject.includes('גאומטריה')) {
            tipElement.innerHTML = "💡 טיפ: מומלץ להכין סרגל ומחוגה.";
            tipElement.style.color = "#061f4e";
        } else {
            tipElement.innerHTML = `💡 מעולה! נחזק יחד את השליטה ב${selectedSubject}.`;
            tipElement.style.color = "#19c5a5";
        }
    });

    // --- 3. מניעת תאריכים שעברו ---
    const todayStr = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', todayStr);

    // --- 4. ולידציה ושליחת טופס (AJAX) ---
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault(); // תמיד מונעים שליחה רגילה כי אנחנו ב-AJAX
        
        let isValid = true;

        // שם מלא
        const nameInput = document.getElementsByName('fullName')[0];
        const nameParts = nameInput.value.trim().split(/\s+/);
        if (nameParts.length < 2) {
            nameInput.classList.add('input-error');
            isValid = false;
        } else {
            nameInput.classList.remove('input-error');
        }

        // טלפון
        const phoneInput = document.getElementsByName('phone')[0];
        const phoneRegex = /^05\d{8}$/;
        if (!phoneRegex.test(phoneInput.value.replace(/-/g, ""))) {
            phoneInput.classList.add('input-error');
            isValid = false;
        } else {
            phoneInput.classList.remove('input-error');
        }

        if (!isValid) {
            alert("נא לתקן את השדות המסומנים באדום.");
            return;
        }

        // שליחה ב-JQuery AJAX (כי ביקשת להשתמש בזה לסיום)
        const formData = $(this).serialize();
        const studentName = nameInput.value;

        $.ajax({
            url: "save_booking.php",
            type: "POST",
            data: formData,
            success: function(response) {
                if (response.trim() === "taken") {
                    alert("מצטערים, השעה הזו כבר נתפסה בתאריך שבחרת. נא לבחור שעה או תאריך אחר.");
                } else if (response.trim() === "success") {
                    localStorage.setItem('studentName', studentName);
                    $(bookingForm).fadeOut(500, function() {
                        $(this).after('<div class="success-msg"><h2>תודה ' + studentName + '!</h2><p>הבקשה נשלחה בהצלחה. ניצור קשר בהקדם.</p></div>');
                    });
                } else {
                    alert("שגיאה בשליחה: " + response);
                }
            },
            error: function() {
                alert("שגיאה בתקשורת עם השרת.");
            }
        });
    });
});