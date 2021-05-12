//-----------------------------------------------------------------------------------
// Tag Constructor
//-----------------------------------------------------------------------------------
const footer = (element) => 
{
    element.classList.add('acrylic');
    element.classList.add('glass');
    element.innerHTML = `
        <span class="footer-left">
            ©️ 2021 MIT License. Project 1 for ES6 Pirple Course by Will de la Vega.
        </span>
        <span class="footer-right">
            https://willdelavega.com/portfolio
        </span>
    `;
}

//-----------------------------------------------------------------------------------
// Tag Registration
//-----------------------------------------------------------------------------------
customTag("Footer", footer, "end");
