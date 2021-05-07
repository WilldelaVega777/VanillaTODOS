//-----------------------------------------------------------------
// Globals
//-----------------------------------------------------------------
var allUsers;
var openView = '';

//-----------------------------------------------------------------
// Main App Event Handler
//-----------------------------------------------------------------
window.addEventListener('load', () => {
    //-------------------------------------------------------------
    // Check or create the Users Array in Local Storage
    //-------------------------------------------------------------
    allUsers = JSON.parse(localStorage.getItem('todoAppUsers'));
    if (!allUsers)
    {
        localStorage.setItem('todoAppUsers', JSON.stringify([]));
        allUsers = [];
    }

    //-------------------------------------------------------------
    // Set View UI Infrastructure: Automatic Event Handlers
    //-------------------------------------------------------------
    const views = [
        'vSignUp',
        'vLogIn',
        'vLists',
        'vNewList',
        'vEditList'
    ];

    views.forEach(view => {
        const openButton  = `cmd${view.substr(1)}`;
        const closeButton = `cmd${view.substr(1)}Close`;
        
        const thisView = document.getElementById(view);
        const thisOpenButton = document.getElementById(openButton);
        const thisCloseButton = document.getElementById(closeButton);
        
        thisOpenButton.addEventListener('click', (e) => {
            e.preventDefault();
    
            if (openView === '')
            {
                // Reset Forms
                if (view === 'vSignUp')
                {
                    document.getElementById('frmSignUp').reset();
                }
                else if (view === 'vLogIn')
                {
                    document.getElementById('frmLogIn').reset();
                }

                // Open Requested View
                thisView.style.display = 'flex';
                thisView.classList.add('animate__animated', 'animate__flipInY');
                openView = view;
            }
        });

        thisCloseButton.addEventListener('click', (e) => {

            if (openView === view)
            {
                thisView.classList.add('animate__flipOutY');
                setTimeout(() => {
                    thisView.classList.remove(
                        'animate__animated', 
                        'animate__flipInY', 
                        'animate__flipOutY'
                    );
                    thisView.style.display = 'none';
                    openView = '';
                }, 700);
            }
        });
    });

    //-------------------------------------------------------------
    // Enable Views Functionality
    //-------------------------------------------------------------
    setSignupFormListener();
    setLoginFormListener();
 
});