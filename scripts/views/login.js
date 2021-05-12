//-----------------------------------------------------------------------------------
// Tag Constructor
//-----------------------------------------------------------------------------------
const login = (element) => 
{
    element.id = 'vLogIn';
    element.classList.add('view');
    element.classList.add('acrylic');
    element.classList.add('glass');
    element.innerHTML = `
        <!-- Header -->
        <div>
            <span id="cmdLogInClose" 
                class="cmdClose"
            >
                ❌
            </span>
        </div>
        
        <!-- Content: Title -->
        <img id="imgLock" 
            src="./assets/images/lock.png" 
            alt="lock_image"
        >
        <div>
            <h1 class="view-title">
                Log In
            </h1>
        </div>
        
        <hr/>
        
        <!-- View Form -->
        <div class="view-form">
            <form id="frmLogIn"
                action="POST"
            >
                
                <!-- Username UI -->
                <p class="todos-form-control">
                    <label for="txtLoginEmail">
                        Enter your Email:
                    </label>
                    <input id="txtLoginEmail"
                        type="email" 
                        required 
                        maxlength="50"
                    />
                </p>                     
        
                <!-- Password UI -->
                <p class="todos-form-control">
                    <label for="txtLoginPassword">
                        Enter your Password: 
                    </label>
                    <input id="txtLoginPassword" 
                        type="password" 
                        required 
                        maxlength="30"
                    />
                </p>
        
                <!-- Terms and Conditions Errors -->
                <div id="logInPasswordError"
                    class="form-error"
                >
                    <span class="error-emotion">
                        😒
                    </span>
                    Incorrect Password, try again
                </div>                            
        
                <!-- Control Button Bar -->
                <div class="todos-bottom-buttons-container">
                    <button type="reset" class="todos-button reset">
                        Reset
                    </button>
                    <button type="submit" class="todos-button submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    `;
}

//-----------------------------------------------------------------------------------
// Tag Registration
//-----------------------------------------------------------------------------------
customTag("Login", login, "prepend");


//-----------------------------------------------------------------------------------
// Related Event Handlers
//-----------------------------------------------------------------------------------
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
            gCurrentAccount = getUserWithEmail(credentials.email);
            document.getElementById('logInPasswordError').style.display = 'none';
            frmLogIn.reset();
            closeUserView('vLogIn');
            setTimeout(() => {
                openDashboard();
            }, 700);            
        }
    });
}