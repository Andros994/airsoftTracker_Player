var latitude, longitude, accuracy;
var nickname, asd, fazione, ruolo;

$(document).ready(function(){
    $('#salva').on('click', function(){
        nickname = $('#nickname').val();
        asd = $('#asd').val();
        fazione = $('#fazione').val();
        link = $('#ngLink').val();
        ruolo = $('#ruolo option:selected').val();

        // controllo i campi che siano stati compilati
        if(nickname != null && nickname != '' && nickname != undefined && asd != null && asd != '' && asd != undefined && fazione != null && fazione != '' && fazione != undefined && ruolo != null && ruolo != '' && ruolo != undefined){
            sendPosition(nickname, asd, fazione, ruolo, link);
        } else {
            alert('Compila tutti i campi')
        }
    })
})

function sendPosition(nick, asd, faz, role, link){
    if ("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(
            // Successo nel trovare la tua posizione
            (position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                accuracy = position.coords.accuracy;
                sendInfo(latitude, longitude, accuracy, nick, asd, faz, role, link);
            },
            (error) => {
                alert("Errore nel calcolo della posizione", error)
            }
        )
    } else {
        alert("Questo browser non supporta la geolocalizzazione");
    }
}

function sendInfo(latitude, longitude, accuracy, nick, asd, faz, role, link){
    var json = {
        nick: nick,
        asd: asd,
        fazione: faz,
        ruolo: role,
        coords: {
            latitude: latitude,
            longitude: longitude,
            accuracy: accuracy
        }
    }
    console.log(json);
    //salvataggio del json
    $.ajax({
        type: "POST",
        url: link+'/geoData/save',
        data: JSON.stringify(json),
        dataType: "application/json",
        success: function(){
            console.log('data transmitted');
        },
        error: function(){
            console.log('failed to send data')
        }
    });
    
    setInterval(sendPosition(nick,asd,faz,role, link), 60000);
}