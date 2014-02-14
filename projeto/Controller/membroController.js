var controller = function(){

	var lastRow;

	var dataMembros;

	var socket = io.connect('http://localhost:80');

	this.loadMembros = function(nameInst){
	
		socket.on('loadMembros', function (membro) {

			var data = new Array();

			for (var i in membro){

				data.push(new membros(membro[i].cod, membro[i].name));

			}

			disingTable(nameInst, data);

			dataMembros = data;
			
		});

	}

	this.newMembro = function(){

		$( "#membrosNew" ).dialog("open");
		this.generateCod('codInputN');

	}

	this.writeNew = function(nameInst, nameDialog){

		var cod = document.getElementById("codInputN").value;
		var name = document.getElementById("nameInputN").value;

		dataMembros.push(new membros(cod, name));

		socket.emit('gravarMembros', new membros(cod, name));

		if(cod == 1){

			lastRow = 0;

		}

		var table = document.getElementById("membrosTable");
			  {
				  var row = table.insertRow(parseInt(lastRow) + 1);
				  
				  var cell1 = row.insertCell(0);
				  var cell2 = row.insertCell(1);
				  var cell3 = row.insertCell(2);
				  var cell4 = row.insertCell(3);
				  var cell5 = row.insertCell(4);
				  var cell6 = row.insertCell(5);

				  cell1.innerHTML = parseInt(lastRow) + 1;
				  cell2.innerHTML = dataMembros[lastRow].cod;
				  cell3.innerHTML = dataMembros[lastRow].name;
				  cell4.innerHTML = "<input type='button' value='Editar' onclick='javascript:" + nameInst + ".edit(" + lastRow + ")'>";
				  cell5.innerHTML = "<input type='button' value='Visualizar'onclick='javascript:" + nameInst + ".viewMembro(" + lastRow + ")'>";
				  cell6.innerHTML = "<input type='button' value='Excluir' onclick='javascript:" + nameInst + ".delete(" + lastRow + ",\""+nameInst+"\")'>";
			  }

		lastRow = parseInt(lastRow) + 1;

		document.getElementById("nameInputN").value = '';

		this.cancelDialog(nameDialog);
		
	}

	this.read = function(){

		this.data = membro.getMembro();

	}

	function disingTable(nameInst, data){

		//console.log(data);

		var j = 0;

		for(i in data){

			j = parseInt(i) + 1;

			var table = document.getElementById("membrosTable");
			  {
				  var row = table.insertRow(j);
				  
				  var cell1 = row.insertCell(0);
				  var cell2 = row.insertCell(1);
				  var cell3 = row.insertCell(2);
				  var cell4 = row.insertCell(3);
				  var cell5 = row.insertCell(4);
				  var cell6 = row.insertCell(5);

				  cell1.innerHTML = j;
				  cell2.innerHTML = data[i].cod;
				  cell3.innerHTML = data[i].name;
				  cell4.innerHTML = "<input type='button' value='Editar' onclick='javascript:" + nameInst + ".edit(" + i + ")'>";
				  cell5.innerHTML = "<input type='button' value='Visualizar'onclick='javascript:" + nameInst + ".viewMembro(" + i + ")'>";
				  cell6.innerHTML = "<input type='button' value='Excluir' onclick='javascript:" + nameInst + ".delete(" + i + ",\""+nameInst+"\")'>";
			  }

			  lastRow = j;
		}

	}

	this.delete = function(index, nameInst){

		console.log(index);
		console.log(dataMembros[index]);

		for(i in dataMembros){

			document.getElementById("membrosTable").deleteRow(1);

			if(dataMembros[index].cod == dataMembros[i].cod){

				j = i;

			}
			else
			{
				console.log("Nenhum Registro Encontrado!!");
			}

		}

		socket.emit("deleteMembro", new membros(dataMembros[index].cod));

		socket.on("deleteMembroCarrega", function(){

			this.loadMembros(nameInst);

			console.log("PASSEI");

		});

		socket.on("deleteMembroMostra", function(){

			//dataMembros.splice(j,1);

			//console.log("TO PASSANDO!!!");

			//disingTable(nameInst, dataMembros);

		});
		

	}

	this.edit = function(index){

		console.log(dataMembros[index]);
		console.log(index);


		document.getElementById("codInput").value = dataMembros[index].cod;
		document.getElementById("nameInput").value = dataMembros[index].name;

		$( "#membrosEdit" ).dialog("open");

	}

	this.writeEdit = function(nameInst, nameDialog){

		var cod = document.getElementById("codInput").value;
		var name = document.getElementById("nameInput").value;

		for(i in this.data){

			document.getElementById("membrosTable").deleteRow(1);

			if(cod == this.data[i].cod){

				j = i;

			}
			else
			{
				console.log("Nenhum Registro Encontrado!!");
			}

		}

		this.data[j].cod = cod;
		this.data[j].name = name;

		this.disingTable(nameInst);
		this.cancelDialog(nameDialog);

	}

	this.cancelDialog = function(nameDialog){

		$("#" + nameDialog + "").dialog("close");

	}

	this.generateCod = function(nameInput){

		var index = parseInt(dataMembros.length) - 1;

		//console.log(index);

		if(index == -1){

			document.getElementById(nameInput).value = 1;

		}
		else{
			
			document.getElementById(nameInput).value = parseInt(dataMembros[index].cod) + 1;
		
		}

	}

	this.viewMembro = function(index){

		console.log(dataMembros[index]);

		document.getElementById("codInputV").value = dataMembros[index].cod;
		document.getElementById("nameInputV").value = dataMembros[index].name;

		$( "#membrosView" ).dialog("open");


	}

}