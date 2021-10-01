//-----------------------------------------------------------------------------------
// Tag Constructor
//-----------------------------------------------------------------------------------
const editList = (element) => 
{
    element.id = 'vEditList';
    element.classList.add('view');
    element.classList.add('acrylic');
    element.classList.add('glass');
    element.innerHTML = `
        <!-- Header -->
        <div>
            <span id="cmdEditListClose" 
                class="cmdClose"
            >
                ❌
            </span>
        </div>

        <!-- Content: Title -->
        <img id="imgTakeNote" 
            src="./assets/images/take-note.png"
            alt="todo-lists_image"
        >
        <div>
            <h1 class="view-title">
                Edit ToDo List
            </h1>
        </div>
        
        <hr/>

        <!-- Content: Body -->
        <form id="frmEditList"
              action="POST"
        >
            <!-- ToDo Name UI -->
            <p class="todos-form-control">
                <label for="txtEditListName">
                    Edit the List Name:
                </label>
                <input id="txtEditListName"
                        type="text" 
                        required 
                        maxlength="25"
                />
            </p> 

            <!-- List Empty Error -->
            <div id="editListEmptyError"
                    class="form-error"
            >
                <span class="error-emotion">
                    😒
                </span>
                The List name is empty! please enter one!
            </div> 
        

            <!-- Todo Items UI -->
            <div class="todos-list scrollbar" id="todoItemsList">
            </div>                        


            <!-- Control Button Bar -->
            <div class="todo-add-item-bottom-buttons-container">
                <button id="cmdAddNewTodoItem" type="button" class="todo-list-button submit">
                    Add Todo Item
                </button>
            </div>

            <!-- Control Button Bar -->
            <div class="todos-bottom-buttons-container">
                <button type="reset" class="todos-button reset">
                    Cancel
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
customTag("EditList", editList, "top");


//-----------------------------------------------------------------------------------
// Related Event Handlers
//-----------------------------------------------------------------------------------



