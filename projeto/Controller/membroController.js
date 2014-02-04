var controller = function(){

	membro = new membroModel();
	this.data = new Array();
	this.data = membro.getMembro();

	var lastRow;

	this.write = function(nameInst){

		var cod = '00000';
		var name = 'TESTE';

		membro.setMembro(cod, name);

		var table = document.getElementById("membrosTable");
			  {
				  var row = table.insertRow(parseInt(lastRow) + 1);
				  
				  var cell1 = row.insertCell(0);
				  var cell2 = row.insertCell(1);
				  var cell3 = row.insertCell(2);
				  var cell4 = row.insertCell(3);
				  var cell5 = row.insertCell(4);

				  cell1.innerHTML = parseInt(lastRow) + 1;
				  cell2.innerHTML = this.data[lastRow].cod;
				  cell3.innerHTML = this.data[lastRow].name;
				  cell4.innerHTML = "<input type='button' value='Editar'>";
				  cell5.innerHTML = "<input type='button' value='Excluir' onclick='javascript:" + nameInst + ".delete(" + nameInst + ".data[" + lastRow + "].cod,\""+nameInst+"\")'>";
			  }

		lastRow = parseInt(lastRow) + 1;
		
	}

	this.read = function(){

		this.data = membro.getMembro();

	}

	this.disingTable = function(nameInst){

		var j = 0;

		for(i in this.data){

			j = parseInt(i) + 1;

			var table = document.getElementById("membrosTable");
			  {
				  var row = table.insertRow(j);
				  
				  var cell1 = row.insertCell(0);
				  var cell2 = row.insertCell(1);
				  var cell3 = row.insertCell(2);
				  var cell4 = row.insertCell(3);
				  var cell5 = row.insertCell(4);

				  cell1.innerHTML = j;
				  cell2.innerHTML = this.data[i].cod;
				  cell3.innerHTML = this.data[i].name;
				  cell4.innerHTML = "<input type='button' value='Editar' onclick='javascript:c.edit()'>";
				  cell5.innerHTML = "<input type='button' value='Excluir' onclick='javascript:" + nameInst + ".delete(" + nameInst + ".data[" + i + "].cod,\""+nameInst+"\")'>";
			  }

			  lastRow = j;
		}

	}

	this.delete = function(cod, nameInst){

		console.log(nameInst);

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

		this.data.splice(j,1);

		this.disingTable(nameInst);

	}

	this.edit = function(){

		$( "#dialog" ).dialog("open");
    	
	}

}