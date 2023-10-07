var latitude, longitude, accuracy;
var nickname, asd, fazione, phone, link, plotone, ruolo, color;

$(document).ready(function(){
    $('#spinner').hide();
    $('#successMsg').hide();
    $('#errorMsg').hide();

    $('#salva').on('click', function(){
        nickname = $('#nome').val();
        asd = $('#asd').val();
        fazione = $('#fazione').val();
        phone = $('#phone').val();
        link = $('#ngLink').val();
        plotone = $('#plotone').val();
        ruolo = $('#ruolo option:selected').val();
        color = $('#colore option:selected').val();

        // controllo i campi che siano stati compilati
        if(nickname != null && nickname != '' && nickname != undefined && asd != null && asd != '' && asd != undefined && link != '' && link != null && link != undefined){
            $('#spinner').show();
            sendPosition();
        } else {
            alert('Compila tutti i campi');
            $('#spinner').hide();
        }
    })
})

function sendPosition(){
    if ("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(
            // Successo nel trovare la tua posizione
            (position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                accuracy = position.coords.accuracy;
                sendInfo();
            },
            (error) => {
                alert("Errore nel calcolo della posizione", error)
            }
        )
    } else {
        alert("Questo browser non supporta la geolocalizzazione");
    }
}

function sendInfo(){
    var json = {
        nick: nickname,
        asd: asd,
        fazione: fazione,
        ruolo: ruolo,
        iconColor: color,
        phone: phone,
        plotone: plotone,
        coords: {
            latitude: latitude,
            longitude: longitude,
            accuracy: accuracy
        }
    }

    //salvataggio del json
    $.ajax({
        type: "POST",
        url: link+'/geoData/save',
        data: JSON.stringify(json),
        dataType: "application/json",
        success: function(){
            $('#successMsg').show();
            $('#errorMsg').hide();
        },
        error: function(){
            $('#successMsg').hide();
            $('#errorMsg').show();
        }
    });
    
    setInterval(sendPosition(), 60000);
}