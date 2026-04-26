$(document).ready(function() {
    $('.toggle-solution-btn').click(function() {
        // פותח/סוגר את הפתרון שנמצא מיד אחרי הכפתור
        $(this).next('.solution-content').slideToggle(300);
        
        // מחליף את הטקסט בכפתור
        if ($(this).text().trim() === "צפייה בפתרון") {
            $(this).text("הסתר פתרון");
        } else {
            $(this).text("צפייה בפתרון");
        }
    });
});