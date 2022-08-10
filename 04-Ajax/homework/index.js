let URL = "http://localhost:5000/amigos"; //creamos una constante para no repetir lo mismo

let showFriends = function() {
	$("#lista").empty();
	$.get(`${URL}`, function(friends){ 
		// for (var i = 0; i < friends.length; i++) {
		// 	friends[i];
		// } hace lo mismo que ese forEach
		friends.forEach( f => {
			// let li = document.createElement("li");
			// li.id = f.id;
			// li.innerText = f.name;	
			$("#lista").append(`<li id="${f.id}"> ${f.name} <button onClick=deleteFriend(${f.id})>X</button> </li>`);
		})
	});
	$("img").hide(); //borra la imagen a lo que inicia la lista de amigos
};

    $("#boton").click(showFriends);
    //$("#boton").click(function(){ otra alternativa hace lo mismo
	// $.get("http://localhost:5000/amigos") // es lo mismo que lo de abajo
	
//boton buscar
$("boton").click(showFriends);

$("#search").click(function(){
	let id = $("#input").val();

	$.get(`${URL}/${id}`, function(friend){
		console.log(friend);
		if (friend) {
			$("#amigo").text(`${friend.name} ${friend.age} $friend.email`);
			$("#input").val("");	
		}else {
       	// Dentro del sever en amigos/:id COLOCAR PARA QUE FUNCIONE
		// if (friend) {
		//   res.status(200).json(friend);  
		// }else {
		//   res.status(200).json("");  
		// }
			$("#amigo").text(`No existe amigo con id número: ${id}`);
		}
		$("input").val("");
	})
});

let deleteFriend = function (idCruz){
	let id;
	if (typeof idCruz === "number") {
		id = idCruz;
	}else {
		id = $("inputDelete").val();
	}
	let friend;

	if (id) {
	    $.get(`${URL}/${id}`, function(data){
			friend = data;
		});
	
		$.ajax(
			{url: `${URL}/${id}`, 
			type: "DELETE", 
			success: function() {
				$("#success").text(`Tu Amigo ${friend.name} fue borrado con exito`);
				$("#inputDelete").val("");
				showFriends();
			}
			});	
	}else{
		$("#success").text(`Ingresa un ID valido`);	//min37	
	}
};

	$("#delete").click(function(deleteFriend){	
		
	});