const lists = (element) => 
{
    element.id = 'vLists';
    element.classList.add('view');
    element.classList.add('acrylic');
    element.classList.add('glass');
    element.innerHTML = `
        <!-- Header -->
        <div>
            <span id="cmdListsClose" 
                class="cmdClose hidden-option"
            >
                ❌
            </span>
        </div>
        
        <!-- Content: Title -->
        <img id="imgTodoList" 
            src="./assets/images/todo-lists.png" 
            alt="todo-lists_image"
        >
        <div>
            <h1 class="view-title">
                Todo Lists
            </h1>
        </div>
        
        <hr/>
        
        <!-- Content: Body -->
        <div class="todos-list scrollbar" id="todosList">
        
        </div>
        <button id="cmdListsNewList" type="button" class="todos-button">
            New TODO List
        </button>
    `;
}

//-----------------------------------------------------------------------------------
// Tag Registration
//-----------------------------------------------------------------------------------
customTag("Lists", lists, 'top');


//-----------------------------------------------------------------------------------
// Related Event Handlers
//-----------------------------------------------------------------------------------
function onOpenDashboard()
{
    //------------------------------------------------------------------------------
    // Dashboard UI Variables
    //------------------------------------------------------------------------------
    const cmdLogout         = document.getElementById('cmdLogout');
    const cmdNewList        = document.getElementById('cmdListsNewList');
    const cmdNewListClose   = document.getElementById('cmdNewListClose');
    const cmdEditListClose  = document.getElementById('cmdEditListClose');
    const cmdAddNewTodoItem = document.getElementById('cmdAddNewTodoItem');

    const frmEditList       = document.getElementById('frmEditList');

    const todoItemsList     = document.getElementById('todoItemsList');

    //------------------------------------------------------------------------------
    // Dashboard Module Event Handlers:
    //------------------------------------------------------------------------------
    // Logout Button Event
    cmdLogout.addEventListener('click', (e) => {
        window.location.reload();
    });

    //------------------------------------------------------------------------------
    // New List Dialog Event Handlers:
    //------------------------------------------------------------------------------
    // New List: Open Button
    //----------------------------------------------
    cmdNewList.addEventListener('click', (e) => {
        closeDashboardView('vLists');
        setTimeout(() => {
            openDashboardView('vNewList');
            const frmNewList = document.getElementById('frmNewList');
            frmNewList.reset();
        }, 700);
    });

    //----------------------------------------------
    // New List: Closing Button
    //----------------------------------------------
    cmdNewListClose.addEventListener('click', (e) => {
        const frmNewList = document.getElementById('frmNewList');
        frmNewList.reset();
        setTimeout(() => {
            openDashboardView('vLists');
        }, 700);
    });

    //----------------------------------------------
    // New List: Save List Button
    //----------------------------------------------
    frmNewList.addEventListener('submit', (e) => {
        e.preventDefault();

        // Save User Data:
        const controls = e.target.elements;
        const todoList = {};
        let controlKey;

        for (control of controls)
        {
            if (control.id.substr(0,3) === 'txt')
            {
                controlKey = getKeyFromControl(e.target.id, control.id);
                todoList[controlKey] = control.value;
            }
        }

        const validationError = document.getElementById('newListValidationError');
        if (!validateTodoList(todoList.name))
        {
            validationError.style.display = 'block';
            return false;
        }
        else
        {
            validationError.style.display = 'none';
        }

        saveList(todoList);

        closeDashboardView('vNewList');
        setTimeout(() => {
            renderListNames();
            openDashboardView('vLists');
        }, 700);  
    });

    //------------------------------------------------------------------------------
    // Edit List Event Handlers
    //------------------------------------------------------------------------------    
    // Edit List: Closing Button
    //----------------------------------------------
    cmdEditListClose.addEventListener('click', (e) => {
        const frmEditList = document.getElementById('frmEditList');
        frmEditList.reset();
        setTimeout(() => {
            openDashboardView('vLists');
        }, 700);
    });

    //----------------------------------------------
    // Edit List: Reset Dialog
    //----------------------------------------------
    frmEditList.addEventListener('reset', (e) => {
        frmEditList.reset();
        todoItemsList.innerHTML = '';
        closeDashboardView('vEditList');
        setTimeout(() => {
            openDashboardView('vLists');
        }, 700);
    });

    //----------------------------------------------
    // Edit List: Add Item
    //----------------------------------------------
    cmdAddNewTodoItem.addEventListener('click', (e) => {
        if (!validateNewItem())
        {
            return;
        }
        let newId;
        if (gCurrentList.items?.length > 0)
        {
            const orderedItems = gCurrentList.items.sort((listItemA, listItemB) => (listItemB.id - listItemA.id));
            newId = (orderedItems[0].id + 1);
        }
        else
        {
            newId = 0;
        }

        gCurrentList.items.push({
            id: newId,
            createdAt: new Date(),
            text: ''
        });

        renderTodoItems();
    });

    //----------------------------------------------
    // Edit List: Save Items
    //----------------------------------------------
    frmEditList.addEventListener('submit', (e) => {
        e.preventDefault();

        localStorage.setItem('todoAppUsers', JSON.stringify(gAllUsers));
        todoItemsList.innerHTML = '';
        closeDashboardView('vEditList');
        setTimeout(() => {
            openDashboardView('vLists');
        }, 700);

    });


    //------------------------------------------------------------------------------
    // Default Initial Actions
    //------------------------------------------------------------------------------
    // Render Existing Lists
    renderListNames();
}

