//-----------------------------------------------------------------
// Main App Event Handler
//-----------------------------------------------------------------
window.addEventListener('load', () => {

    //-------------------------------------------------------------
    // Set View UI Infrastructure: Automatic Event Handlers
    //-------------------------------------------------------------
    let openView = '';

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
    setLoginFormListener();



    
});