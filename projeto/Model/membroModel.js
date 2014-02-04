var membroModel = function(){

	var membro = new Array();

	membro.push(new membros(01, 'Gleison'));
	membro.push(new membros(02, 'Luis'));
	membro.push(new membros(03, 'Silva'));
	membro.push(new membros(04, 'Tatiane'));

	this.setMembro = function(cod, name){

		membro.push(new membros(cod, name));

	}

	this.getMembro = function(){

		

		return membro;

	}

}

this.membros = function(cod, name){

		this.cod = cod;
		this.name = name

	}