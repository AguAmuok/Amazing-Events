var data = localStorage.getItem('data')
data = JSON.parse(data);

function getData() {
  
  var id = location.search.split("?id=")
  console.log(location)
  console.log(location.search)
  console.log(id)
  var selectedId = id[1]
  console.log(selectedId)
  
  var datass = data.events.find((datos) =>{
        return datos._id == selectedId
  
  })
  console.log(datass)
  var tempHtml = `
    <div class="card p-3 bg-dark text-light mb-5" style="width: 30rem;">
    <div class="card-body">
    <img class="card-img" src="${datass.image}"></div>
    <div class=" text-center dataCard">
    <h5 class="card-title text-center mt-2">${datass.name}</h5>        
    <p class="card-text text-center ">${datass.description}</p>
    <p>Date: ${datass.date}</p>
    <p class="card-text text-center ">Category: ${datass.category}</p>
    <p class="card-text text-center ">Place: ${datass.place}</p> 
    <p class="card-text text-center ">Capacity: ${datass.capacity}</p> 
    <p class="card-text text-center ">Assistance: ${datass.assistance}</p>
    <p class="card-text text-center ">Price: $ ${datass.price}</p>
</div>
  </div> 
  `
  document.querySelector("#card_data").innerHTML = tempHtml
  
}

getData()






























// var args = location.search.substr(1).split('&');
// for (var i = 0; i < args.length; ++i) {
//   var parts = args[i].split('=');
//   if (parts != null) {
//     var field = parts[0];
//     var value = parts[1];
//   }

//   value = value.replace('%20', ' ');

//   switch (field) {
//       case 'img':
//           var imgHtml = `<img src="${value}" alt="logo" />`; 
//         document.querySelector('#imagen-logo').innerHTML = imgHtml
//         break;
//         case 'title':
//             document.querySelector('.card-title').innerHTML = value
//         break;
//         case 'date':
//           document.querySelector('.date').innerHTML = value
//         break;
//         case 'precio':
//           document.querySelector('.date').innerHTML = value
//         break;
        
//         default: 
//         //DO NOTHING
//         break;
//   }

// }
