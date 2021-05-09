//----------------------------------------------------------------------------------
// Login UI Infrastructure
//----------------------------------------------------------------------------------
function setSignupFormListener()
{
    // Check Username availability
    document.getElementById('txtSignUpUsername').addEventListener('blur', (e) => {

        const ctrlUserName = document.getElementById('txtSignUpUsername');
        const attemptedUserName = ctrlUserName.value;

        if (getUser(attemptedUserName))
        {
            ctrlUserName.setCustomValidity(
                '😒  -That user is not available, could you please try another one??'
            );
        }
    });

    // Submit Form
    const frmSignUp = document.getElementById('frmSignUp');
    frmSignUp.addEventListener('submit', (e) => {
        e.preventDefault();

        // Check Acceptance of Terms and Conditions
        const acceptTerms = document.getElementById('chkSignUpTermsAndConditions').checked;

        if (!acceptTerms)
        {
            console.log('Terms not accepted, no further actions taken...')
            document.getElementById('signUpTermsAndConditionsError').style.display = 'block';
            return false;
        }
        else
        {
            document.getElementById('signUpTermsAndConditionsError').style.display = 'none';
        }

        // Save User Data:
        const controls = e.target.elements;
        const user = {};
        let controlKey;

        for (control of controls)
        {
            if (control.id.substr(0,3) === 'txt')
            {
                controlKey = getKeyFromControl(e.target.id, control.id);
                user[controlKey] = control.value;
            }
        }

        createUser(user);
        frmSignUp.reset();
        closeUserView('vSignUp');
        setTimeout(() => {
            openDashboard();
        }, 700);
    });
}

//----------------------------------------------------------------------------------
function setLoginFormListener()
{
    const frmLogin = document.getElementById('frmLogin');
    frmLogIn.addEventListener('submit', (e) => {
        e.preventDefault();

        const controls = e.target.elements;
        const credentials = {};
        let controlKey;

        for (control of controls)
        {
            if (control.id.substr(0,3) === 'txt')
            {
                controlKey = getKeyFromControl(e.target.id, control.id);
                credentials[controlKey] = control.value;
            }
        }

        if (!loginUserWith(credentials))
        {
            document.getElementById('logInPasswordError').style.display = 'block';
            document.getElementById('txtLoginPassword').focus();
            return false;
        }
        else
        {
            currentAccount = getUserWithEmail(credentials.email);
            document.getElementById('logInPasswordError').style.display = 'none';            
            frmLogIn.reset();
            closeUserView('vLogIn');
            setTimeout(() => {
                openDashboard();
            }, 700);            
        }
    });
}



//----------------------------------------------------------------------------------
// User Related Functions
//----------------------------------------------------------------------------------
function getUser(userName)
{    
    return allUsers.find((eachUser) => eachUser.user.username === userName);
}

//----------------------------------------------------------------------------------
function getUserWithEmail(userEmail)
{    
    return allUsers.find((eachUser) => eachUser.user.email === userEmail);
}


//----------------------------------------------------------------------------------
function createUser(userObject)
{
    userObject.password = new Hashes.MD5().hex(userObject.password);
    allUsers.push(
        {
            user: userObject,
            lists: []
        }
    );

    localStorage.setItem('todoAppUsers', JSON.stringify(allUsers));
}

//----------------------------------------------------------------------------------
function loginUserWith(credentials)
{
    credentials.password = new Hashes.MD5().hex(credentials.password);
    return allUsers.find(account => 
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
        openView = '';
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
    openView = view;

    onOpenDashboard();
}


/*
//----------------------------------------------------------------------------------
// Basic Local Storage DB Structure
//----------------------------------------------------------------------------------
const todoAppUsers = [
    { 
        user: {
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: ''
        },

        lists: [
            {
                name: 'daily',
                description: '',
                createdAt: 
                items: [
                    'do 1',
                    'do 2'
                ]
            }
        ]
    }
];

*/