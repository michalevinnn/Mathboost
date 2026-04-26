function closeCelebration() {
    $('#celebrationOverlay').fadeOut(400);
}

$(document).ready(function() {
    let completedCount = 0;
    const totalNodes = $('.node:not(.simulation)').length;

    // תגובה לאירוע
    $('.node').on('click', function() {
        if ($(this).hasClass('locked')) {
            alert("התחנה נעולה! השלם את השלבים הקודמים.");
            return;
        }

        const name = $(this).data('name');
        const desc = $(this).data('desc');

        // כתיבה לאלמנט
        $('#nextGoalText').text(name); // עדכון ב-Header
        $('#drawerTitle').text(name); // עדכון במגירה
        $('#drawerDesc').text(desc);

        // פתיחת המגירה ב-jQuery
        $('#taskDrawer').addClass('open');
        
        // שמירת ההתייחסות לתחנה הנוכחית במידע של הכפתור
        $('#btnMarkDone').data('activeNode', $(this));
    });

    // סגירת מגירה
    $('.close-drawer').on('click', function() {
        $('#taskDrawer').removeClass('open');
    });

    // שינוי עיצוב דינמי באמצעות מחלקה 
    $('#btnMarkDone').on('click', function() {
        const $node = $(this).data('activeNode');
        
        if (!$node.hasClass('completed')) {
            $node.addClass('completed'); // שינוי עיצוב
            $node.removeClass('active');
            
            // פתיחת התחנה הבאה (לוגיקת שחרור)
            const $nextNode = $node.next('.node');
            if ($nextNode.length) {
                $nextNode.removeClass('locked').addClass('active');
            } else {
                // אם אין תחנה הבאה בסגמנט, נחפש בסקשן הבא
                $node.closest('.learning-unit').next().find('.node').first().removeClass('locked').addClass('active');
            }

            // עדכון מד התקדמות
            completedCount++;
            updateProgress();
            
            // פידבק למשתמש
            alert("כל הכבוד! כבשת את תחנת " + $node.data('name'));
        }
        
        $('#taskDrawer').removeClass('open');
    });

    function updateProgress() {
        const percent = Math.floor((completedCount / totalNodes) * 100);
        $('.progress-percent').text(percent + "%");
        $('#globalProgressBar').css('width', percent + "%");
    }

    function updateProgress() {
    const percent = Math.floor((completedCount / totalNodes) * 100);
    $('.progress-percent').text(percent + "%");
    $('#globalProgressBar').css('width', percent + "%");

        // חגיגת סיום
        if (completedCount === totalNodes) {
            setTimeout(() => {
                $('#celebrationOverlay').css('display', 'flex');
            }, 800);
        }
    }

    function closeCelebration() {
        $('#celebrationOverlay').fadeOut();
    }

    // לוגיקה לכפתור "יאללה לבגרות" בתוך הפופ-אפ
    $('#btnGoToSimulation').on('click', function() {
        // 1. סגירת הפופ-אפ
        closeCelebration();
        
        // פתיחת משימת הסימולציה (התחנה האחרונה)
        setTimeout(() => {
            $('.node.simulation').click();
        }, 500); // השהייה קלה כדי שהפופ-אפ יספיק להיעלם
    });
});