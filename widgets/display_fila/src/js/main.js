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

	function getEntities() {
		MashupPlatform.http.makeRequest('http://35.199.67.193:1026/v1/contextEntities/clinica_fila_unica/attributes/posicaoAtual', {
		    method: "GET",
		    contentType: "application/json",
		    onSuccess: function (response) {
		    	let responseJSON = JSON.parse(response.response);
		       	let posicaoAtual = responseJSON.attributes[0].value;
		       	console.log(posicaoAtual);
		       	document.getElementById("posicao-fila").innerHTML = posicaoAtual;
		    },
		    onFailure: function (response) {
		        // Something went wrong
		    },
		    onComplete: function () {
		    	setTimeout(getEntities, 100);
		    }
		});
	}

	getEntities();

    return DisplayFila;

})();
