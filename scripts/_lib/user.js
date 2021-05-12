//----------------------------------------------------------------------------------
// User Related Functions
//----------------------------------------------------------------------------------
function getUser(userName)
{    
    return gAllUsers.find((eachUser) => eachUser.user.username === userName);
}

//----------------------------------------------------------------------------------
function getUserWithEmail(userEmail)
{    
    return gAllUsers.find((eachUser) => eachUser.user.email === userEmail);
}


//----------------------------------------------------------------------------------
function createUser(userObject)
{
    userObject.password = new Hashes.MD5().hex(userObject.password);
    gAllUsers.push(
        {
            user: userObject,
            lists: []
        }
    );

    localStorage.setItem('todoAppUsers', JSON.stringify(gAllUsers));
}

//----------------------------------------------------------------------------------
function loginUserWith(credentials)
{
    credentials.password = new Hashes.MD5().hex(credentials.password);
    return gAllUsers.find(account => 
        ((account.user.email === credentials.email) &&
         (account.user.password === credentials.password))
    );
}

//----------------------------------------------------------------------------------
function closeUserView(viewName)
{
    const thisView = document.getElementById(viewName);
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

//----------------------------------------------------------------------------------
function getKeyFromControl(formName, controlName)
{
    const prefix = (controlName.substr(formName.length,1)).toLowerCase();
    const body = controlName.substring(formName.length + 1);
    const retVal = (prefix + body);
    return retVal;
}


//----------------------------------------------------------------------------------
function openDashboard()
{
    // UI Variables
    const userMenu = document.getElementById('tbMain');
    const dashMenu = document.getElementById('tbDashboard');
    const view = 'vLists';
    const thisView = document.getElementById(view);

    // Show Dashboard Menu
    userMenu.classList.remove('active');
    dashMenu.classList.add('active');


    // Show Dashboard:
    thisView.style.display = 'flex';
    thisView.classList.add('animate__animated', 'animate__flipInY');
    gOpenView = view;

    onOpenDashboard();
}
