'use strict';


class DateHelper{



	dataParaTexto(data){
		return data.getDate()+"/"+ (data.getMonth()+1)+"/"+ data.getFullYear();
	}

	textoParaData(txtData){
		if(!/\d{2}\/\d{2}\/\d{4}/.test(txtData))
			throw new Error("Formato inválido para a data. Deve ser dd/MM/yyyy");
		
		return new Date(txtData.split('/')[2], txtData.split('/')[1] - 1, txtData.split('/')[0]);
	}
	
}

module.exports = new DateHelper();