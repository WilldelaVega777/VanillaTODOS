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
        }, 700);   
    });

    const userListNames = getLists(currentAccount);
    if (userListNames?.length > 0)
    {
        renderListNames(userListNames);
    }
}


//----------------------------------------------------------------------------------
// Dashboard Functions
//----------------------------------------------------------------------------------
function getLists(currentAccount)
{
    const sortedLists = currentAccount.lists.sort((a, b) => a.createdAt - b.createdAt);
    return sortedLists.map(list => list.name)
}

//----------------------------------------------------------------------------------
function renderListNames(namesList)
{

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

