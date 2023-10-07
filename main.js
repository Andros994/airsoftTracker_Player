var latitude, longitude, accuracy;
var nickname, asd, fazione, phone, link, plotone, ruolo, color;
var myInterval;

$(document).ready(function(){
    $('#spinner').hide();
    $('#successMsg').hide();
    $('#errorMsg').hide();

    $('#salva').on('click', function(){
        nickname = $('#nome').val();
        asd = $('#asd').val();
        fazione = $('#fazione').val();
        phone = $('#phone').val();
        link = ($('#ngLink').val()).split(" ").join("");
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

    $('#stopSending').on('click', function(){
        clearInterval(myInterval);
        $('#spinner').hide();
        $('#successMsg, #errorMsg').hide();
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
        async: false,
        url: link+'/geoData/save',
        data: JSON.stringify(json),
        dataType: "application/json",
        contentType: "application/json",
        success: function(jsonResposne){
            console.log(jsonResposne);
            $('#successMsg').show();
            $('#errorMsg').hide();
        },
        error: function(err){
            if (err.status == 200){
                $('#successMsg').show();
                $('#errorMsg').hide();
            } else {
                $('#successMsg').hide();
                $('#errorMsg').show();
            }
        }
    });
    
    myInterval = setInterval(sendPosition(), 60000);
}