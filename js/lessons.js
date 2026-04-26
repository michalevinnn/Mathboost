// מאגר נתונים מלא המבוסס על הקובץ שהעליתן
const subjectsData = [
    { name: "גדילה ודעיכה", category: "אלגברה", units: "3", grade: "י'", icon: "✖️", lessons: 13, tasks: 3 },
    { name: "גדילה ודעיכה", category: "אלגברה", units: "3", grade: "י\"א", icon: "✖️", lessons: 3, tasks: 6 },
    { name: "מודל לינארי", category: "אלגברה", units: "3", grade: "י'", icon: "✖️", lessons: 6, tasks: 5 },
    { name: "מסלולים", category: "אלגברה", units: "3", grade: "י\"א", icon: "✖️", lessons: 5, tasks: 3 },
    { name: "בעיות כלכליות", category: "אלגברה", units: "3", grade: "י\"א", icon: "✖️", lessons: 13, tasks: 10 },
    { name: "סטטיסטיקה", category: "הסתברות", units: "3", grade: "י'", icon: "🎲", lessons: 4, tasks: 8 },
    { name: "הסתברות", category: "הסתברות", units: "3", grade: "י\"א", icon: "🎲", lessons: 3, tasks: 2 },
    { name: "דמיון משולשים", category: "גיאומטריה", units: "3", grade: "י'", icon: "📐", lessons: 4, tasks: 5 },
    { name: "טריגונומטריה", category: "גיאומטריה", units: "3", grade: "י\"א", icon: "📐", lessons: 6, tasks: 10 },
    { name: "תכנון לינארי", category: "אלגברה", units: "3", grade: "י\"ב", icon: "✖️", lessons: 12, tasks: 2 },
    { name: "גיאומטריה אנליטית", category: "גיאומטריה", units: "3", grade: "י\"ב", icon: "📐", lessons: 11, tasks: 5 },
    { name: "גופים", category: "גיאומטריה", units: "3", grade: "י\"ב", icon: "📐", lessons: 14, tasks: 10 },
    { name: "התפלגות נורמלית", category: "הסתברות", units: "3", grade: "י\"ב", icon: "🎲", lessons: 9, tasks: 5 },
    { name: "מודל ריבועי", category: "אלגברה", units: "3", grade: "י\"ב", icon: "✖️", lessons: 10, tasks: 6 },
    { name: "ראיה מרחבית", category: "גיאומטריה", units: "3", grade: "י\"ב", icon: "📐", lessons: 15, tasks: 2 },
    { name: "חדו\"א פונקציות שורש", category: "חדו\"א", units: "4", grade: "י'", icon: "∫", lessons: 15, tasks: 4 },
    { name: "חדו\"א פונקציה רציונלית", category: "חדו\"א", units: "4", grade: "י\"א", icon: "∫", lessons: 14, tasks: 8 },
    { name: "בעיות קיצון", category: "חדו\"א", units: "4", grade: "י'", icon: "∫", lessons: 8, tasks: 6 },
    { name: "סטטיסטיקה", category: "הסתברות", units: "4", grade: "י'", icon: "🎲", lessons: 5, tasks: 5 },
    { name: "הסתברות", category: "הסתברות", units: "4", grade: "י\"א", icon: "🎲", lessons: 15, tasks: 7 },
    { name: "גיאומטריה (ללא מעגל)", category: "גיאומטריה", units: "4", grade: "י'", icon: "📐", lessons: 4, tasks: 3 },
    { name: "גיאומטריה (עם מעגל)", category: "גיאומטריה", units: "4", grade: "י\"א", icon: "📐", lessons: 9, tasks: 3 },
    { name: "וקטורים", category: "אלגברה", units: "4", grade: "י\"ב", icon: "✖️", lessons: 8, tasks: 7 },
    { name: "גדילה ודעיכה", category: "אלגברה", units: "4", grade: "י\"ב", icon: "✖️", lessons: 12, tasks: 6 },
    { name: "סדרות", category: "אלגברה", units: "4", grade: "י\"ב", icon: "✖️", lessons: 15, tasks: 2 },
    { name: "חדו\"א מעריכית", category: "חדו\"א", units: "4", grade: "י\"ב", icon: "∫", lessons: 14, tasks: 9 },
    { name: "חדו\"א לוגריתמית", category: "חדו\"א", units: "4", grade: "י\"ב", icon: "∫", lessons: 11, tasks: 3 },
    { name: "הסתברות", category: "הסתברות", units: "5", grade: "י'", icon: "🎲", lessons: 9, tasks: 3 },
    { name: "סדרות", category: "אלגברה", units: "5", grade: "י\"א", icon: "✖️", lessons: 11, tasks: 6 },
    { name: "גיאומטריה", category: "גיאומטריה", units: "5", grade: "י'", icon: "📐", lessons: 13, tasks: 7 },
    { name: "טריגונומטריה", category: "גיאומטריה", units: "5", grade: "י\"א", icon: "📐", lessons: 12, tasks: 5 },
    { name: "קשר בין גרף לנגזרת", category: "חדו\"א", units: "5", grade: "י'", icon: "∫", lessons: 14, tasks: 3 },
    { name: "חדו\"א רציונלית", category: "חדו\"א", units: "5", grade: "י\"א", icon: "∫", lessons: 3, tasks: 5 },
    { name: "חדו\"א טריגונומטרית", category: "חדו\"א", units: "5", grade: "י\"א", icon: "∫", lessons: 15, tasks: 6 },
    { name: "חדו\"א משולבות שורש", category: "חדו\"א", units: "5", grade: "י\"א", icon: "∫", lessons: 4, tasks: 5 },
    { name: "בעיות קיצון", category: "חדו\"א", units: "5", grade: "י'", icon: "∫", lessons: 4, tasks: 8 },
    { name: "העמקת חקירה", category: "חדו\"א", units: "5", grade: "י\"ב", icon: "∫", lessons: 7, tasks: 9 },
    { name: "אינטגרלים", category: "חדו\"א", units: "5", grade: "י\"ב", icon: "∫", lessons: 13, tasks: 7 },
    { name: "גיאומטריה אנליטית", category: "גיאומטריה", units: "5", grade: "י\"ב", icon: "📐", lessons: 5, tasks: 7 },
    { name: "מספרים מרוכבים", category: "אלגברה", units: "5", grade: "י\"ב", icon: "✖️", lessons: 8, tasks: 5 },
    { name: "וקטורים", category: "אלגברה", units: "5", grade: "י\"ב", icon: "✖️", lessons: 13, tasks: 6 },
    { name: "טריגונומטריה במרחב", category: "גיאומטריה", units: "5", grade: "י\"ב", icon: "📐", lessons: 14, tasks: 3 }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('subjectsGrid');
    const filters = document.querySelectorAll('input[type="radio"]');
    const statusLabel = document.getElementById('activeFilterLabel');

function renderSubjects(filteredData) {
    grid.innerHTML = '';
    if (filteredData.length === 0) {
        grid.innerHTML = '<div class="no-results"><p>לא נמצאו נושאים התואמים לבחירה.</p></div>';
        return;
    }

    filteredData.forEach(subject => {
        // בדיקה האם זו הכרטיסייה הספציפית שמומשה
        const isImplemented = subject.name === "גדילה ודעיכה" && 
                              subject.grade === "י'" && 
                              subject.units === "3";

        const card = document.createElement('article');
        card.className = 'lessons-card-detail';
        
        card.innerHTML = `
            ${isImplemented ? '<span class="implemented-tag">מומש</span>' : ''}
            <span class="category-tag">${subject.category}</span>
            <div class="subject-icon-large">${subject.icon}</div>
            <h3>${subject.name}</h3>
            <p>רמת ${subject.units} יחידות - כיתה ${subject.grade}</p>
            <div class="card-meta-info">
                <span><i class="fas fa-play-circle"></i> ${subject.lessons} שיעורים</span>
                <span><i class="fas fa-pencil-alt"></i> ${subject.tasks} תרגולים</span>
            </div>
            <button class="btn btn-outline-dark" 
                ${isImplemented 
                    ? `onclick="window.location.href='lesson-unit.html'"` 
                    : `disabled title="לא מומש, נסה את גדילה ודעיכה ברמת 3 יחידות - כיתה י׳"`}
            >
                כניסה ללמידה
            </button>
        `;
        grid.appendChild(card);
    });
}

    function applyFilters() {
        const selectedGrade = document.querySelector('input[name="grade"]:checked').value;
        const selectedUnits = document.querySelector('input[name="units"]:checked').value;

        const filtered = subjectsData.filter(s => {
            const gradeMatch = selectedGrade === 'all' || s.grade === selectedGrade;
            const unitsMatch = selectedUnits === 'all' || s.units === selectedUnits;
            return gradeMatch && unitsMatch;
        });

        statusLabel.innerText = `מציג ${filtered.length} נושאים`;
        renderSubjects(filtered);
    }

    filters.forEach(f => f.addEventListener('change', applyFilters));
    renderSubjects(subjectsData); // טעינה ראשונית
});