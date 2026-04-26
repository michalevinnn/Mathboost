$(document).ready(function() {
    
    // jQuery SlideToggle לפידבק מעומר המורה
    $('.jquery-trigger').on('click', function() {
        $(this).next('.accordion-content').slideToggle(400);
        $(this).find('.fa-chevron-down').toggleClass('fa-rotate-180');
    });

    // פונקציית אנימציית מספרים רצים (SaaS Style)
    function animateNumbers() {
        $('.counter').each(function() {
            const $this = $(this);
            const target = parseInt($this.attr('data-target'));
            
            $({ countNum: 0 }).animate({ countNum: target }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(target);
                }
            });
        });
    }

    //  אנימציית מילוי פסי התקדמות
    function animateBars() {
        setTimeout(() => {
            $('.progress-bar-fill').each(function() {
                const widthValue = $(this).attr('data-width');
                $(this).css('width', widthValue);
            });
        }, 300);
    }

    // הפעלת האנימציות בטעינת הדף
    animateNumbers();
    animateBars();
});

//  לוגיקת חישוב ימים (JS עם אנימציית מספרים)
function calculateCountdown() {
    const inputDate = document.getElementById('examDate').value;
    const resultElement = document.getElementById('daysResult');
    
    if (!inputDate) {
        alert("נא לבחור תאריך יעד לבגרות!");
        return;
    }

    const examDate = new Date(inputDate);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        resultElement.textContent = "0";
        alert("אופס! בחרת תאריך מהעבר. נא לבחור תאריך עתידי.");
    } else {
        // אנימציית טעינה לתוצאה החדשה
        $({ countNum: 0 }).animate({ countNum: diffDays }, {
            duration: 1000,
            step: function() { resultElement.textContent = Math.floor(this.countNum); },
            complete: function() { resultElement.textContent = diffDays; }
        });

        // שינוי עיצוב אם הבגרות קרובה (פחות משבוע)
        if (diffDays <= 7) resultElement.style.color = "#ef4444";
        else resultElement.style.color = "#333333";
    }
}