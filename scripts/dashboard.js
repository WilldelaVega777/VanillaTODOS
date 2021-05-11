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


//----------------------------------------------------------------------------------
// ToDo Lists View Related Functions
//----------------------------------------------------------------------------------
function renderListNames()
{
    if (gCurrentAccount?.lists?.length === 0)
    {
        return;
    }

    const sortedLists = gCurrentAccount.lists.sort((a, b) => a.createdAt - b.createdAt);
    namesList = sortedLists.map(list => list.name);

    const listContainer = document.getElementById('todosList');

    listContainer.innerHTML = '';

    let currentList;
    namesList.forEach((listName) => {
        const currentList = gCurrentAccount.lists.find(list => list.name === listName);

        const listItemContainer = document.createElement('DIV');
        listItemContainer.classList.add('list-item-container');

        const listItem  = document.createElement('DIV');
        listItem.classList.add('list-item');
        listItem.innerHTML = 
            `${listName}<br/><span class="list-item-description">${currentList.description}</span>`;

        const cmdEdit   = document.createElement('DIV');
        cmdEdit.classList.add('list-button');
        cmdEdit.innerText = '✔️';
        cmdEdit.title = 'Edit this List';
        cmdEdit.addEventListener('click', (e) => {
            
            const actualList = gCurrentAccount.lists.filter(list => list.name === currentList.name);
            if (actualList.length > 0)
            {
                gCurrentList = actualList[0];
            }

            closeDashboardView('vLists');
            setTimeout(() => {
                openDashboardView('vEditList');
                renderList();
                renderTodoItems();
            }, 700);

        });

        const cmdDelete = document.createElement('DIV');
        cmdDelete.classList.add('list-button');
        cmdDelete.innerText = '🗑️';
        cmdDelete.title = 'Delete this List without warning!';
        cmdDelete.addEventListener('click', (e) => {
            const newLists = gCurrentAccount.lists.filter(list => list.name !== currentList.name);
            gCurrentAccount.lists = newLists;
            localStorage.setItem('todoAppUsers', JSON.stringify(gAllUsers));
            renderListNames();
        });

        // Append Elements
        listItemContainer.appendChild(listItem);
        listItemContainer.appendChild(cmdEdit);
        listItemContainer.appendChild(cmdDelete);

        // Append to DOM Element
        listContainer.appendChild(listItemContainer);
    });
}


//----------------------------------------------------------------------------------
// New ToDo List View Related Functions
//----------------------------------------------------------------------------------
function validateTodoList(listName)
{
    let retVal = true;
    if (gCurrentAccount.lists.find(list => list.name === listName))
    {
        retVal = false;
    }

    return retVal;
}


//----------------------------------------------------------------------------------
function saveList(todoList)
{
    todoList['createdAt'] = new Date();
    todoList['items'] = [];
    gCurrentAccount.lists.push(todoList);
    localStorage.setItem('todoAppUsers', JSON.stringify(gAllUsers));
}

//----------------------------------------------------------------------------------
// Edit ToDo List View Related Functions
//----------------------------------------------------------------------------------
function renderList()
{
    const txtEditListName = document.getElementById('txtEditListName');
    txtEditListName.value = gCurrentList.name;
}

//----------------------------------------------------------------------------------
function renderTodoItems()
{
    const listContainer = document.getElementById('todoItemsList');

    listContainer.innerHTML = '';
    
    gCurrentList.items.forEach((listItem) => {
        const listItemContainer = document.createElement('DIV');
        listItemContainer.classList.add('list-todo-item-container');
    
        const listTodoItem  = document.createElement('INPUT');
        listTodoItem.classList.add('list-item-input');
        listTodoItem.value = `${listItem.text}`;
        listTodoItem.addEventListener('change', (e) => {
            listItem.text = e.target.value;
        });
        
        const cmdDelete = document.createElement('DIV');
        cmdDelete.classList.add('list-button');
        cmdDelete.innerText = '🗑️';
        cmdDelete.title = 'Delete this ToDo without warning!';
        cmdDelete.addEventListener('click', (e) => {
            const newItems = gCurrentList.items.filter(item => item.id !== listItem.id);
            gCurrentList.items = newItems;
            localStorage.setItem('todoAppUsers', JSON.stringify(gAllUsers));
            renderTodoItems();
        });
    
        // Append Elements
        listItemContainer.appendChild(listTodoItem);
        listItemContainer.appendChild(cmdDelete);
    
        // Append to DOM Element
        listContainer.appendChild(listItemContainer);
    });
}

//----------------------------------------------------------------------------------
function validateNewItem()
{
    let retVal = true;

    if (gCurrentList.items?.length > 0) 
    {
        const emptyTodo = gCurrentList.items.find(todo => todo.text === '');
        if (emptyTodo)
        {
            retVal = false;
        }
    }

    return retVal;
}

//----------------------------------------------------------------------------------
// General Dashboard UI Functions
//----------------------------------------------------------------------------------
function closeDashboardView(viewName)
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
function openDashboardView(viewName)
{
    // UI Variables
    const thisView = document.getElementById(viewName);

    // Show Dashboard:
    thisView.style.display = 'flex';
    thisView.classList.add('animate__animated', 'animate__flipInY');
    gOpenView = viewName;
}

//----------------------------------------------------------------------------------
// Utility Functions
//----------------------------------------------------------------------------------
function getKeyFromControl(formName, controlName)
{
    const prefix = (controlName.substr(formName.length,1)).toLowerCase();
    const body = controlName.substring(formName.length + 1);
    const retVal = (prefix + body);
    return retVal;
}
