const customTag = (tagName, fn, method) =>
{
    //find all the tags occurrences (instances) in the document
    let tagInstances = document.getElementsByTagName(tagName);

    //for each occurrence run the associated function
    for (let tagInstance of tagInstances) 
    {
        if (method === "prepend")
        {
            const parentHTML = tagInstance.innerHTML;
            const container  = tagInstance.parentNode;
            fn(tagInstance);
            container.innerHTML += parentHTML;
        }
        else if (method === "top")
        {
            const parentHTML = tagInstance.innerHTML;
            const container  = tagInstance.parentNode;
            fn(tagInstance);
            container.innerHTML += parentHTML;
        }
        else
        {
            fn(tagInstance);
        }
    }
};

