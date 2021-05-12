//-----------------------------------------------------------------------------------
// Tag Constructor
//-----------------------------------------------------------------------------------
const signup = (element) => 
{
    element.id = 'vSignUp';
    element.classList.add('view');
    element.classList.add('acrylic');
    element.classList.add('glass');
    element.innerHTML = `
        <!-- Header -->
        <div>
            <span id="cmdSignUpClose" 
                class="cmdClose"
            >
                ❌
            </span>
        </div>

        <!-- Content: Title -->
        <img id="imgHandshake" 
            src="./assets/images/handshake.png" 
            alt="handshake_image"
        >
        <div>
            <h1 class="view-title">
                Sign Up
            </h1>
        </div>
        
        <hr/>

        <!-- View Form -->
        <div class="view-form">
            <form id="frmSignUp"
                action="POST"
            >

                <!-- First Name UI -->
                <p class="todos-form-control">
                    <label for="txtSignUpFirstname">
                        Enter your First Name: 
                    </label>
                    <input id="txtSignUpFirstname" 
                        type="text" 
                        required 
                        maxlength="30"
                    />
                </p>          
                
                <!-- Last Name UI -->
                <p class="todos-form-control">
                    <label for="txtSignUpLastname">
                        Enter your Last Name: 
                    </label>
                    <input id="txtSignUpLastname" 
                        type="text" 
                        required 
                        maxlength="30"
                    />
                </p>

                <!-- Email UI -->
                <p class="todos-form-control">
                    <label for="txtSignUpEmail">
                        Enter your Email:
                    </label>
                    <input id="txtSignUpEmail" 
                        type="email" 
                        required 
                        maxlength="70"
                    />
                </p>                         

                <!-- Username UI -->
                <p class="todos-form-control">
                    <label for="txtSignUpUsername">
                        Select a Username: 
                    </label>
                    <input id="txtSignUpUsername" 
                        type="text" 
                        required 
                        maxlength="20"
                    />
                </p>                          
                
                <!-- Password UI -->
                <p class="todos-form-control">
                    <label for="txtSignUpPassword">
                        Create a Secure Password:
                    </label>
                    <input id="txtSignUpPassword" 
                        type="password" 
                        required 
                        maxlength="30"
                    />
                </p>

                <!-- Terms and Conditions UI -->
                <div class="checkbox-container">
                    <input id="chkSignUpTermsAndConditions" 
                        class="todos-checkbox" 
                        type="checkbox"
                    >
                    <label class="todos-checkbox-label" 
                        for="chkSignUpTermsAndConditions">
                        I Agree to the Terms of Use
                    </label>
                </div>

                <!-- Terms and Conditions Errors -->
                <div id="signUpTermsAndConditionsError" 
                    class="form-error"
                >
                    <span class="error-emotion">
                        😭
                    </span>
                    We need you to accept our terms.
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
customTag("SignUp", signup, "prepend");


//-----------------------------------------------------------------------------------
// Related Event Handlers
//-----------------------------------------------------------------------------------
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
        else
        {
            ctrlUserName.setCustomValidity('');
        }
    });
    //-----------------------------------------------------------------------------------
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
