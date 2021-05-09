function onOpenDashboard()
{
    // Dashboard UI Variables
    const cmdLogout  = document.getElementById('cmdLogout');
    const cmdNewList = document.getElementById('cmdListsNewList');

    cmdLogout.addEventListener('click', (e) => {
        window.location.reload();
    });

    cmdNewList.addEventListener('click', (e) => {
        closeDashboardView('vLists');
        setTimeout(() => {
            openDashboardView('vNewList');
            const frmNewList = document.getElementById('frmNewList');
            frmNewList.reset();
        }, 700);   
    });

    cmdNewListClose.addEventListener('click', (e) => {
        const frmNewList = document.getElementById('frmNewList');
        frmNewList.reset();
        setTimeout(() => {
            openDashboardView('vLists');
        }, 700);
    });

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

    // Render Existing Lists
    renderListNames();

}


//----------------------------------------------------------------------------------
// Dashboard Functions
//----------------------------------------------------------------------------------
function renderListNames()
{
    const sortedLists = currentAccount.lists.sort((a, b) => a.createdAt - b.createdAt);
    namesList = sortedLists.map(list => list.name);
    if (namesList?.length === 0)
    {
        return;
    }

    const listContainer = document.getElementById('todosList');

    listContainer.innerHTML = '';

    let currentList;
    namesList.forEach((listName) => {
        const currentList = currentAccount.lists.find(list => list.name === listName);

        const listItemContainer = document.createElement('DIV');
        listItemContainer.classList.add('list-item-container');

        const listItem  = document.createElement('DIV');
        listItem.classList.add('list-item');
        listItem.innerHTML = 
            `${listName}<br/><span class="list-item-description">${currentList.description}</span>`;

        const cmdEdit   = document.createElement('DIV');
        cmdEdit.classList.add('list-button');
        cmdEdit.innerText = '✔️';

        const cmdDelete = document.createElement('DIV');
        cmdDelete.classList.add('list-button');
        cmdDelete.innerText = '🗑️';

        listItemContainer.appendChild(listItem);
        listItemContainer.appendChild(cmdEdit);
        listItemContainer.appendChild(cmdDelete);

        listContainer.appendChild(listItemContainer);
    });
}


//----------------------------------------------------------------------------------
function validateTodoList(listName)
{
    let retVal = true;
    if (currentAccount.lists.find(list => list.name === listName))
    {
        retVal = false;
    }

    return retVal;
}


//----------------------------------------------------------------------------------
function saveList(todoList)
{
    todoList['createdAt'] = new Date();
    currentAccount.lists.push(todoList);
    localStorage.setItem('todoAppUsers', JSON.stringify(allUsers));
}

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
        openView = '';
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
    openView = viewName;
}

//----------------------------------------------------------------------------------
function getKeyFromControl(formName, controlName)
{
    const prefix = (controlName.substr(formName.length,1)).toLowerCase();
    const body = controlName.substring(formName.length + 1);
    const retVal = (prefix + body);
    return retVal;
}


