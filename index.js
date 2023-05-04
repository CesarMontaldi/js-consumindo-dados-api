async function buscaEndereco(cep) {
    let mensageError = document.getElementById('erro');
    
    mensageError.innerHTML = '';   
    try {
        let consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        let consultaCEPConvertida = await consultaCep.json();
        if (consultaCEPConvertida.erro) {
            throw Error('Cep inválido');
        }
        
        let bairro = document.getElementById('bairro');
        let cidade = document.getElementById('cidade');
        let logradouro = document.getElementById('endereco');
        let estado = document.getElementById('estado');
        let telefone = document.getElementById('telefone');

        telefone.value = consultaCEPConvertida.ddd;
        bairro.value = consultaCEPConvertida.bairro;
        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch(error) {
        mensageError.innerHTML = `<p> CEP inválido. Tente novamente!</p>`;
        let cep = document.getElementById('cep');
        cep.value = '';
        console.log(error);
    }
}

let cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));

