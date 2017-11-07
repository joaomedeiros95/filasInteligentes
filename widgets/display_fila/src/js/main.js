/*
 * display_fila
 * https://github.com/joaomedeiros95/filasInteligentes
 *
 * Copyright (c) 2017 UFRN
 * Licensed under the MIT license.
 */

/* exported DisplayFila */

let nsgi_server;

var DisplayFila = (function () {

    "use strict";

    nsgi_server = MashupPlatform.prefs.get('ngsi_server');

    // =========================================================================
    // CLASS DEFINITION
    // =========================================================================

    var DisplayFila = function DisplayFila() {
        MashupPlatform.prefs.registerCallback(function (new_preferences) {
            nsgi_server = new_preferences.nsgi_server;
        }.bind(this));
    };

    // =========================================================================
    // PRIVATE MEMBERS
    // =========================================================================

    /* test-code */
    DisplayFila.prototype = {
    };
    /* end-test-code */

    var options = {
        request_headers: {},
        use_user_fiware_token: false
    }

    MashupPlatform.wiring.registerCallback('entityInput', function(entity) {
        console.log(entity);
        let responseJSON = JSON.parse(entity);
        let posicaoAtual = responseJSON.posicaoAtual;
        document.getElementById("posicao-fila").innerHTML = posicaoAtual;
    });

    return DisplayFila;
})();
