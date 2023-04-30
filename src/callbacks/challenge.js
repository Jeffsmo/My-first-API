const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://api.escuelajs.co/api/v1';

function fetchData(urlApi, callback){
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlApi, true);
    xhttp.onreadystatechange = function(event){
        if(xhttp.readyState === 4){ ///El ready state puede devolver 4 diferentes valores
            if(xhttp.status === 200 )
            {
                callback(null, JSON.parse(xhttp.responseText)); // convertimos el texto de respuesta de la API en un objeto
            }
        } else{
            const error = new Error('Error'+ urlApi);
            return callback(error, null);
        }
    }
    xhttp.send();
}

//0 -> NO SE HA INICIALIZADO
//1 -> LOGIN
//2 ->  YA SE EJECUTÓ EL LOGIN
//3 -> INTERACTUANDO CON LA SOLICITUD
//4 -> YA SE PROCESÓ LA SOLICITUD


fetchData(`${API}/products`, function(error1, data1){
    if (error1) return console.error(error1);
    fetchData(`${API}/products/${data1[0].id}`, function(error2, data2){
        if(error2) console.error(error2);
        fetchData(`${API}/categories/${data2?.category?.id}`, function(error3, data3){
            if(error3) console.error(error3);
            console.log(data1[0]);
            console.log(data2.title);
            console.log(data3.name);
        });
    });
});