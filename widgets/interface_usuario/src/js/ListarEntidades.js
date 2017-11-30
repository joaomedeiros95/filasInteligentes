/*
 * Listar Entidades
 * https://github.com/gustavo/listarEntidades
 *
 * Copyright (c) 2017 Vendor
 * Licensed under the Apache license.
 */

/* exported ListarEntidades */

var ngsi_url = MashupPlatform.prefs.get("ngsi_server");
	
        MashupPlatform.prefs.registerCallback(function (new_preferences) {
		ngsi_url =  new_preferences.ngsi_server;
        }.bind(this));


var ListarEntidades = (function () {

    "use strict";

    // =========================================================================
    // CLASS DEFINITION
    // =========================================================================
    
   
    var ListarEntidades = function ListarEntidades() {
	
	
	
    };

    // =========================================================================
    // PRIVATE MEMBERS
    // =========================================================================

    /* test-code */
    ListarEntidades.prototype = {
    };

    /* end-test-code */

    return ListarEntidades;

})();


function listarClinicas(){
	
	var url = ngsi_url + "/v1/contextEntityTypes/Clinica";

	MashupPlatform.http.makeRequest(url, {
		method: 'GET',
		onSuccess: function (response){

			console.log(response);
			console.log(response.status);
			console.log(response.response.contextResponses);
			
			var listagem = document.getElementById("listagem");
			console.log(response.responseText);
			var data = JSON.parse(response.response);
			
			console.log(data);
			console.log(data.contextResponses);
			console.log(data.contextResponses[0]);
			console.log(data.contextResponses[0].contextElement);
			var row = document.createElement("tr");
			
			var element = data.contextResponses[0].contextElement.attributes;
			console.log(element);

			//var clinicas = document.getElementById("listagem").innerHTML = data.contextResponses[0].contextElement.id;
			var clinicas = data.contextResponses;
			for(var i = 0;i < clinicas.length; i++){
				
				var card = document.createElement("div");
					card.setAttribute("class","card")

				console.log(i+": "+clinicas[i]);
				var nova = document.createElement("div");
					nova.setAttribute("class","card-body")
					var button = document.createElement("button");
						button.setAttribute("class","btn btn-info");
						button.setAttribute("onclick", "visualizarFilas('"+clinicas[i].contextElement.id+"')");
						
						button.innerHTML = "Detalhar Filas";
					

				nova.innerHTML = clinicas[i].contextElement.id;
			nova.append(button);
			card.append(nova);
				
			document.getElementById("listagem").append(card);
			
			}
						
		},
		onFailure: function (response){
			console.log(response);
			console.log('error');
		}
	});

}


function enviarDados(){

	var nome = document.getElementById("name").value;
	console.log(nome);
	
	
	var url = ngsi_url + "/v1/updateContext";

	MashupPlatform.http.makeRequest(url, {
		method: 'POST',
		postBody: JSON.stringify({
			"contextElements": [
			{	
				"type": "Pessoa",
				"isPattern": "false",
				"id": nome,
				"attributes": [
				{
					"name": "posicaoFila",
					"type": "integer",
					"value": ""
				},
				{
					"name": "localizacao",
					"type": "geolocalization",
					"value": ""
				},
				{
					"name": "idFila",
					"type": "Fila",
					"value": ""
				}
			  ]
		      }
		  ],
		"updateAction": "APPEND"

		}),
		contentType: "application/json",
		onSuccess: function (response){
			alert("O usuário " + nome + " foi cadastrado!");
			console.log(response);
		},
		onFailure: function (response){
			console.log(response);
		}


	});

}

function cadastrarClinica(){
		
	var url = ngsi_url + "/v1/updateContext";
	console.log(url);
	var nomeClinica = document.getElementById("nomeClinica").value;
	var lat = document.getElementById("lat").value;
	var lng = document.getElementById("lng").value;
       
	MashupPlatform.http.makeRequest(url, {
		method: 'POST',
		postBody: JSON.stringify({
			"contextElements": [
			{	
				"type": "Clinica",
				"isPattern": "false",
				"id": nomeClinica,
				"attributes": [
				{
					"name": "latitude",
					"type": "double",
					"value": lat
				},
				{
					"name": "longitude",
					"type": "double",
					"value": lng
				}
			  ]
		      }
		  ],
		"updateAction": "APPEND"

		}),
		contentType: "application/json",
		onSuccess: function (response){
			alert("A clinica" + nomeClinica + " foi cadastrada!");
				console.log("cadatro clinica: "+data);
		},
		onFailure: function (response){
			console.log(response);
		}


	});
	
}		

function visualizarFilas(clinica){
	
	menu_04();
	var url = ngsi_url + "/v1/contextEntityTypes/Fila";
	console.log("visualizar filas: "+url);

	MashupPlatform.http.makeRequest(url, {
		method: 'GET',
		onSuccess: function (response){

			console.log(response);
			var listagem = document.getElementById("detalheFila");
			document.getElementById("tituloFila").innerHTML = clinica;
			
			var data = JSON.parse(response.response);
			console.log("data: "+data);
			
			var filaId = data.contextResponses[0].contextElement.id;
				
			var filas = data.contextResponses;
			console.log(filas);
			for(var i = 0;i < filas.length; i++){

				console.log(i+": "+filas[i].contextElement.attributes[1].value);
				if(clinica == filas[i].contextElement.attributes[1].value){

					var row = document.createElement("tr");
						var col_1 = document.createElement("td");
							col_1.innerHTML = filaId;
						var col_2 = document.createElement("td");
							col_2.innerHTML = filas[i].contextElement.attributes[2].value;
						var col_3 = document.createElement("td");
							col_3.innerHTML = filas[i].contextElement.attributes[3].value;
						var btn = document.createElement("button");
							btn.setAttribute("class","btn btn-info");
							btn.setAttribute("onclick", "entrarFila('"+filaId+"',"+filas[i].contextElement.attributes[3].value+")");
						
							btn.innerHTML = "Entrar";
						
					row.append(col_1);
					row.append(col_2);
					row.append(col_3);
					row.append(btn);

				listagem.appendChild(row);

					
				}
			}
						
		},
		onFailure: function (response){
			console.log('error');
			console.log(response);
		}
	});
}

function entrarFila(fila, posicao){
	
	var url = ngsi_url + "/v1/updateContext";

	MashupPlatform.http.makeRequest(url, {
		method: 'POST',
		postBody: JSON.stringify({
			"contextElements": [
			{	
				"type": "Pessoa",
				"isPattern": "false",
				"id": "fernanda",
				"attributes": [
				{
					"name": "posicaoFila",
					"type": "integer",
					"value": (posicao + 1)
				},
				{
					"name": "localizacao",
					"type": "geolocalization",
					"value": ""
				},
				{
					"name": "idFila",
					"type": "Fila",
					"value": fila
				}
			  ]
		      }
		  ],
		"updateAction": "APPEND"

		}),
		contentType: "application/json",
		onSuccess: function (response){
			alert("O usuário " + nome + " entrou na fila"+fila);
			console.log(response);
		},
		onFailure: function (response){
			console.log(response);
		}


	});
	
}

function minhasFila(){

	menu_05();

	var url = ngsi_url + "/v1/contextEntities/fernanda";

	MashupPlatform.http.makeRequest(url, {
		method: 'GET',
		onSuccess: function (response){
			
			console.log("resposta: "+response);
			var data = JSON.parse(response.response);
			console.log("data: "+data);
			
			var pessoas = data.contextElement
			var table = document.getElementById("detalheFila");

			console.log(pessoas);
			console.log(pessoas.id);

			
			console.log(pessoas.attributes[0]);
			var row = document.createElement("tr");
					var col_1 = document.createElement("td");
						col_1.innerHTML = pessoas.attributes[0].value;
					var col_2 = document.createElement("td");
						col_2.innerHTML = pessoas.attributes[2].value;
			row.append(col_1);
			row.append(col_2);

			table.appendChild(row);	
			
		},
		onFailure: function(response){
			console.log(response);
		}
	});
}

function menu_01(){
	document.getElementById("cadastrarUsuario").setAttribute("class","visible");
	$("#cadastrarUsuario").css("display","inline");
	document.getElementById("clinicas").setAttribute("class","invisible");
	$("#clinicas").css("display","none");
	document.getElementById("cadastroClinica").setAttribute("class","invisible");
	$("#cadastroClinica").css("class","none");
	$("#clinicas").css("display","none");
	document.getElementById("minhasfilas").setAttribute("class","invisible");
	$("#minhasfilas").css("display","none");
	
}

function menu_02(){
	
	document.getElementById("clinicas").setAttribute("class","visible");
	$("#clinicas").css("display","inline");
	document.getElementById("cadastrarUsuario").setAttribute("class","invisible");
	$("#cadastrarUsuario").css("display","none");
	document.getElementById("cadastroClinica").setAttribute("class","invisible");
	$("#cadastroClinica").css("display","none");
	document.getElementById("minhasfilas").setAttribute("class","invisible");
	$("#minhasfilas").css("display","none");
	
	listarClinicas();
}
		
function menu_03(){
	document.getElementById("cadastroClinica").setAttribute("class","visible");
	$("#cadastroClinica").css("display","inline");
	document.getElementById("cadastrarUsuario").setAttribute("class","invisible");
	$("#cadastrarUsuario").css("display","none");
	document.getElementById("clinicas").setAttribute("class","invisible");
	$("#clinicas").css("display","none");
	document.getElementById("minhasfilas").setAttribute("class","invisible");
	$("#minhasfilas").css("display","none");
	

}

function menu_04(){
	document.getElementById("filas").setAttribute("class","visible");
	$("#filas").css("display","inline");
	document.getElementById("cadastroClinica").setAttribute("class","invisible");
	$("#cadastroClinica").css("display","none");
	document.getElementById("cadastrarUsuario").setAttribute("class","invisible");
	$("#cadastrarUsuario").css("display","none");
	document.getElementById("clinicas").setAttribute("class","invisible");
	$("#clinicas").css("display","none");
	document.getElementById("minhasfilas").setAttribute("class","invisible");
	$("#minhasfilas").css("display","none");
	
}

function menu_05(){
	document.getElementById("minhasfilas").setAttribute("class","visible");
	$("#minhasfilas").css("display","inline");
	document.getElementById("filas").setAttribute("class","invisible");
	$("#filas").css("display","none");
	document.getElementById("cadastroClinica").setAttribute("class","invisible");
	$("#cadastroClinica").css("display","none");
	document.getElementById("cadastrarUsuario").setAttribute("class","invisible");
	$("#cadastrarUsuario").css("display","none");
	document.getElementById("clinicas").setAttribute("class","invisible");
	$("#clinicas").css("display","none");
}



