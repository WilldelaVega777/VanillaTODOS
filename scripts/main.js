//-----------------------------------------------------------------
// Globals
//-----------------------------------------------------------------
var gAllUsers;
var gCurrentAccount;
var gCurrentList;
var gOpenView = '';

//-----------------------------------------------------------------
// Main App Event Handler
//-----------------------------------------------------------------
window.addEventListener('load', () => {
    //-------------------------------------------------------------
    // Check or create the Users Array in Local Storage
    //-------------------------------------------------------------
    gAllUsers = JSON.parse(localStorage.getItem('todoAppUsers'));
    if (!gAllUsers)
    {
        localStorage.setItem('todoAppUsers', JSON.stringify([]));
        gAllUsers = [];
    }

    setHeaderListener();
    setSignupFormListener();
    setLoginFormListener();
});