
async function getData(){
    await fetch("https://amazing-events.herokuapp.com/api/events")
    .then(response => response.json())
    .then(json => data = json);
    localStorage.setItem('data', JSON.stringify(data));
    }
getData()    