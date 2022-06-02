var checkboxSelected = []
var textSearch = ""
var data = localStorage.getItem('data'); 
data = JSON.parse(data);


function crearCheckbox() {
    
    var checkboxes = document.getElementById("checkboxes")
    var todaslasCategorias = data.events.map(datos => datos.category) 
    const dataArray = new Set(todaslasCategorias)
    
    var categorias = [...dataArray]

    var inputCheckbox = ""
    categorias.forEach(category => {

        inputCheckbox += `<label><input class="check m-3" type="checkbox" value="${category}">${category}</label>`
    })
    
    checkboxes.innerHTML = inputCheckbox 
    
    var id = 1
    data.events.map(datos =>datos.id = id++)
    console.log(data.events)
    
}
crearCheckbox()

var checkbox = document.querySelectorAll('input[type=checkbox]')

checkbox.forEach(check => check.addEventListener("click", (event)=> {
    var checked = event.target.checked

    if (checked) {
        checkboxSelected.push(event.target.value)
        console.log(checkboxSelected)
        filterArray()
    } else {
        checkboxSelected = checkboxSelected.filter(uncheck => uncheck !== event.target.value)
        console.log(checkboxSelected)
        filterArray()
    }

}))   

var inputSearch = document.getElementById("search")
inputSearch.addEventListener("keyup", (event) => {
    textSearch = event.target.value
    filterArray()
})

function filterArray() {
    let eldato = []
    if (checkboxSelected.length > 0 && textSearch !== "") {
        checkboxSelected.map(categorya => {
            eldato.push(...data.events.filter(datos => datos.name.toLowerCase().includes(textSearch.trim().toLowerCase())  &&
                datos.category == categorya))
        })
    }
    else if (checkboxSelected.length > 0 && textSearch === "") {
        checkboxSelected.map(categorya => eldato.push(...data.events.filter(datos => datos.category == categorya)))
    }
    else if (checkboxSelected.length == 0 && textSearch !== "") {
        eldato.push(...data.events.filter(datos => datos.name.toLowerCase().includes(textSearch.trim().toLowerCase()))) || eldato.push(...data.events.filter(datos => datos.category.toLowerCase().includes(textSearch.trim().toLowerCase())))
    }
    else { eldato.push(...data.events) }
    
    
    displayCard(eldato)
}
filterArray()

function displayCard(dates) {
    var tarjetasHtml2 = ""

    for (var i = 0; i < dates.length; i++) {
        if(data.currentDate < dates[i].date){
        tarjetasHtml2 += `

        <div class="card p-3 bg-dark text-light mb-5" style="width: 18rem;">       
        <div class="card-body">        
        <img class="card-img-top" src="${dates[i].image}"></div>        
        <div class=" text-center dataCard">        
        <h5 class="card-title text-center mt-2">${dates[i].name}</h5>        
        <p class="card-text text-center ">${dates[i].description}</p>
        <p>${dates[i].date}</p>        
        <p class="card-text text-center ">Price: $ ${dates[i].price}</p>        
        <buttom class="btn btn-danger"><a class=" text-light text-decoration-none" href="cardata.html?id=${dates[i]._id}">¡ See more !</a></buttom>        
        </div>        
        </div>
        `   
    }
}
if(tarjetasHtml2 === ''){
    tarjetasHtml2 = `<h3 class="nofound text-light d-flex justify-content-center p-5 m-5"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-report-search" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fd0061" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" />
    <path d="M18 12v-5a2 2 0 0 0 -2 -2h-2" />
    <rect x="8" y="3" width="6" height="4" rx="2" />
    <path d="M8 11h4" />
    <path d="M8 15h3" />
    <circle cx="16.5" cy="17.5" r="2.5" />
    <path d="M18.5 19.5l2.5 2.5" />
  </svg>  No matches found in the search.</h3>`;  // Mostrar en caso de que no encuentre resultado de busqueda
}
    document.querySelector('#upcomCards').innerHTML = tarjetasHtml2
}

    
