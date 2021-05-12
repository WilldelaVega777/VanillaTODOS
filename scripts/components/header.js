//-----------------------------------------------------------------------------------
// Tag Constructor
//-----------------------------------------------------------------------------------
const header = (element) => 
{
    element.classList.add('acrylic');
    element.classList.add('glass');
    element.innerHTML = `
        <!-- Static: Fixed to Left -->
        <ul id="appName">
            <li id="Title">To do List</li>
            <li id="subTitle">Because you need a ToDo list and you know it...</li>
        </ul>

        <!-- Dynamic: Fixed to Right -->
        <ul id="tbMain" class="menu active">
            <li><a href="#" id="cmdSignUp">Sign Up</a></li>
            <li><a href="#" id="cmdLogIn">Log In</a></li>
        </ul>

        <ul id="tbDashboard" class="menu">
            <li><a href="#" id="cmdLists" class="hidden-option">Lists</a></li>
            <li><a href="#" id="cmdNewList" class="hidden-option">New List</a></li>
            <li><a href="#" id="cmdEditList" class="hidden-option">Edit List</a></li>
            <li><a href="#" id="cmdLogout">Logout</a></li>
        </ul>
    `;
}

//-----------------------------------------------------------------------------------
// Tag Registration
//-----------------------------------------------------------------------------------
customTag("Header", header, "prepend");

//-------------------------------------------------------------
// Set View UI Infrastructure: Automatic Event Handlers
//-------------------------------------------------------------
function setHeaderListener()
{
    
    const views = [
        'vSignUp',
        'vLogIn',
        'vLists',
        'vNewList',
        'vEditList'
    ];


    //-----------------------------------------------------------------------------------
    // Related Event Handlers
    //-----------------------------------------------------------------------------------
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
}

