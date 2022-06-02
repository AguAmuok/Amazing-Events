let data = localStorage.getItem('data');
data = JSON.parse(data);

console.log(data);
// SETEAR MAYOR % ASISTENCIA
var highestName = getHighName(data);
document.getElementById('highest').innerHTML = highestName;

// SETEAR MENOR % ASISTENCIA
var lowestName = getLowestName(data);
document.getElementById('lowest').innerHTML = lowestName;

// SETEAR EVENTO CON MAS CAPACIDAD
var largestName = getLargestName(data);
document.getElementById('largest').innerHTML = largestName;


// SETEAR STATS DE CATEGORIAS UPCOMMING

var upcommingStats = getUpcommingStatsHtml(data);
document.getElementById('upcoming-stats').innerHTML = upcommingStats;

// SETEAR STATS DE CATEGORIAS UPCOMMING

var pastStats = getPastStatsHtml(data);
document.getElementById('past-stats').innerHTML = pastStats;


function getHighName(data){
    var highestPosition = 0;
    var highestPositionPercent = 0;
    var iPercent = 0;

    for (var i = 0; data.events.length > i; i++) {

        highestPositionPercent = (Number(data.events[highestPosition].assistance) / Number(data.events[highestPosition].capacity)) * 100;
        iPercent = (Number(data.events[i].assistance) / Number(data.events[i].capacity)) * 100;

        if(highestPositionPercent < iPercent){
            highestPosition = i;
        }
    }

    var name = data.events[highestPosition].name;

    return name;
}

function getLowestName(data){
    var lowestPosition = 0;
    var lowestPositionPercent = 0;
    var iPercent = 0;

    for (var i = 0; data.events.length > i; i++) {

        lowestPositionPercent = (Number(data.events[lowestPosition].assistance) / Number(data.events[lowestPosition].capacity)) * 100;
        iPercent = (Number(data.events[i].assistance) / Number(data.events[i].capacity)) * 100;

        if(lowestPositionPercent >  iPercent){
            lowestPosition = i;
        }
    }

    var name = data.events[lowestPosition].name;

    return name;
}

function getLargestName(data){
    var largestPosition = 0;
    for (var i = 0; data.events.length > i; i++) {
        if(Number(data.events[largestPosition].capacity) < Number(data.events[i].capacity)){
            largestPosition = i;
        }
    }

    var name = data.events[largestPosition].name;

    return name;
}

function getUpcommingStatsHtml(data){
    var categorias = [];
    var categoriasHtml = '';
    var ingresos = 0;
    var porcentajeAsistencia = 0;
    var sumaiPercent = 0;
    var cantidad = 0;
    data.events.forEach(card => {
        if(!categorias.includes(card.category)){
            categorias.push(card.category);
        }
    });

    categorias.forEach(categoria => {
        cantidad = 0;
        ingresos = 0;
        porcentajeAsistencia = 0;
        sumaiPercent = 0;
        for (var i = 0; data.events.length > i; i++) {


            if(data.events[i].category == categoria && data.currentDate < data.events[i].date){
                sumaiPercent += (Number(data.events[i].estimate) / Number(data.events[i].capacity)) * 100;
                ingresos += Number(data.events[i].estimate) * Number(data.events[i].price);
                cantidad ++;
            }
        }
        porcentajeAsistencia = sumaiPercent / cantidad;

        if(ingresos !== 0){
            
        categoriasHtml += `
        <tr>
        <td>${categoria}</td>
        <td class="text-center">$${Math.round(ingresos)}</td>
        <td class="text-center">%${Math.round(porcentajeAsistencia)}</td>
        </tr>
        `;
        }

    });

    return categoriasHtml;

}

//past events stats

function getPastStatsHtml(data){
    var categorias = [];
    var categoriasHtml = '';
    var ingresos = 0;
    var porcentajeAsistencia = 0;
    var sumaiPercent = 0;
    var cantidad = 0;
    data.events.forEach(card => {
        if(!categorias.includes(card.category)){
            categorias.push(card.category);
        }
    });

    categorias.forEach(categoria => {
        cantidad = 0;
        ingresos = 0;
        porcentajeAsistencia = 0;
        sumaiPercent = 0;
        for (var i = 0; data.events.length > i; i++) {


            if(data.events[i].category == categoria && data.currentDate > data.events[i].date){
                sumaiPercent += (Number(data.events[i].assistance) / Number(data.events[i].capacity)) * 100;
                ingresos += Number(data.events[i].assistance) * Number(data.events[i].price);
                cantidad ++;
            }
        }
        porcentajeAsistencia = sumaiPercent / cantidad;

        if(ingresos !== 0){
            
        categoriasHtml += `
        <tr>
        <td>${categoria}</td>
        <td class="text-center">$${Math.round(ingresos)}</td>
        <td class="text-center">%${Math.round(porcentajeAsistencia)}</td>
        </tr>
        `;
        }
    });
    return categoriasHtml;
}

