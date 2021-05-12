//-----------------------------------------------------------------------------------
// Tag Constructor
//-----------------------------------------------------------------------------------
const newList = (element) => 
{
    element.id = 'vNewList';
    element.classList.add('view');
    element.classList.add('acrylic');
    element.classList.add('glass');
    element.innerHTML = `
        <!-- Header -->
        <div>
            <span id="cmdNewListClose" 
                class="cmdClose"
            >
                ❌
            </span>
        </div>
        
        <!-- Content: Title -->
        <img id="imgCheckList" 
            src="./assets/images/checklist.png"
            alt="todo-lists_image"
        >
        <div>
            <h1 class="view-title">
                New ToDo List
            </h1>
        </div>
        
        <hr/>
        
        <!-- Content: Body -->
        <form id="frmNewList"
              action="POST"
        >
            <!-- ToDo Name UI -->
            <p class="todos-form-control">
                <label for="txtNewListName">
                    Enter a Name for this List of ToDo's:
                </label>
                <input id="txtNewListName"
                        type="text" 
                        required 
                        maxlength="25"
                />
            </p> 
        
            <!-- List Exists Error -->
            <div id="newListValidationError"
                    class="form-error"
            >
                <span class="error-emotion">
                    😒
                </span>
                The List name exists, try another one.
            </div>  
        
            <!-- ToDo Description UI -->
            <p class="todos-form-control">
                <label for="txtNewListDescription">
                    Enter a Description:
                </label>
                <input id="txtNewListDescription"
                        type="text" 
                        required 
                        maxlength="50"
                />
            </p>                         
        
            <!-- Control Button Bar -->
            <div class="todos-bottom-buttons-container">
                <button type="reset" class="todos-button reset">
                    Reset
                </button>
                <button type="submit" class="todos-button submit">
                    Save
                </button>
            </div>
        
        </form>
    `;
}

//-----------------------------------------------------------------------------------
// Tag Registration
//-----------------------------------------------------------------------------------
customTag("NewList", newList, "top");


//-----------------------------------------------------------------------------------
// Related Event Handlers
//-----------------------------------------------------------------------------------



