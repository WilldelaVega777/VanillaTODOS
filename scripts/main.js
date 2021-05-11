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
    
            if (gOpenView === '')
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
                gOpenView = view;
            }
        });

        thisCloseButton.addEventListener('click', (e) => {

            if (gOpenView === view)
            {
                thisView.classList.add('animate__flipOutY');
                setTimeout(() => {
                    thisView.classList.remove(
                        'animate__animated', 
                        'animate__flipInY', 
                        'animate__flipOutY'
                    );
                    thisView.style.display = 'none';
                    gOpenView = '';
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