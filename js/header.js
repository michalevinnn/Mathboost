document.addEventListener('DOMContentLoaded', () => {
    const userProfile = document.getElementById('userProfile');
    const dropdownMenu = document.getElementById('userDropdown');
    const arrow = userProfile.querySelector('.dropdown-arrow');

    // אירוע לחיצה לפתיחה/סגירה של התפריט
    userProfile.addEventListener('click', (event) => {
        event.stopPropagation(); // מונע מהלחיצה לעבור לאלמנטים אחרים
        dropdownMenu.classList.toggle('show');
        
        // סיבוב החץ כשהתפריט פתוח
        const isOpen = dropdownMenu.classList.contains('show');
        arrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    });

    // סגירת התפריט בלחיצה מחוץ אליו
    document.addEventListener('click', () => {
        dropdownMenu.classList.remove('show');
        arrow.style.transform = 'rotate(0deg)';
    });
});