

//criamos o export da funcao valida com parametro do input
// dentro dela cria-se o tipo de input, uma array com todos os dataset que pomos nos forms
// neste caso serao os data-tipo= "..." inclusos no forms

// condicionamos a passagem dos validadores em cada [objeto na array de tipo de Input]
// retornamos essa condicao como o value dele sendo o input
// apos isso, determinada a validity acima dos inputs com os validadores e os required do html
// condicionamos com caso a validade do input esteja como valido, pegamos o input, removemos a class de input invalido
// e setamos a div com a mensagem de erro como vazia em seu innerHTML = ''


// o else traz o input invalido, adiocionando a classe no input de invalida
//e entao setando a div da mesangem de erro no innerHTML com a funcao de mostrar a mensagemdeerro que recebe como
// parametro QUAL o input da array de tipo de input, e o input em si para determinar qual mensagem exibir

export function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }
    if(input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
        
    }

};

// criamos aqui um vetor com os tipos de erro em que iremos trabalhar,
// o value is missing eh para quando esta vazia o input
// o typeMismatch eh para quando o tipo inserido no input for divergente
// o patternMismatch eh quando o pattern for divergente do setado
// o customError é usado para quando usamos o setCustomValidity na funcao de validacao
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

// aqui criamos a array de objetos onde setamos cada mensagem de erro para cada input e seu tipodeErro
const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo de nome não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.',
        customError: 'O E-mail é inválido.'
    },
    senha: {
        valueMissing: 'O campo de senha não pode estar vazio.',
        patternMismatch: 'A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos.'
    },
    dataNascimento: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        customError: 'O CPF digitado não é válido.' 
    },
    cep: {
        valueMissing: 'O campo de CEP não pode estar vazio.',
        patternMismatch: 'O CEP digitado não é válido.',
        customError: 'Não foi possível buscar o CEP.'
    },
    logradouro: {
        valueMissing: 'O campo de logradouro não pode estar vazio.'
    },
    cidade: {
        valueMissing: 'O campo de cidade não pode estar vazio.'
    },
    estado: {
        valueMissing: 'O campo de estado não pode estar vazio.'
    },
    preco: {
        valueMissing: 'O campo de preço não pode estar vazio.'
    }
}

//aqui criamos os validadores onde definimos quais inputs receberao quais funcoes de validacao

const validadores = {
    dataNascimento:input => validaDataNascimento(input),
    email:input => validaEmail(input),
    cep:input => recuperarCEP(input)
}


// aqui temos a funcao de mostrar a mensagem de erro, onde puxa o tipodeInput(array criada acima)
// e o input atual como parametros
// definimos no escopo a variavel de mensagem como vazia
// passamos o tipodeErro criado acima com um forEach para percorrer por cada um
// logo, se houver o erro ele retorna uma condicional onde se houver erro na validacao do input
// a mensagem sera setada da seguinte maneira:
// sera buscada qual mensagemdeerro da array ja criada acima se encaixa no tipodeinput e no erro.
//caso nao haja erro, a mensagem continuara com o valor de bloco '' vazio.
function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })
    
    return mensagem
}

/* function formatCPF(input){
    let cpfCru = input.value;
    let cpfFormatado = cpfCru.format(`[\d]{3}.[\d]{3}.[\d]{3}-?[\d]{2}`)

    return cpfFormatado = input.value
} */

// funcao de validacao de email criada recebendo o input como parametro
// criamos a const variavel como sendo o valor de seu input
// definimos a mensagem de erro como '' no escopo
// criamos a variavel de formatacao do email com o regex
// condicionamos entao a validity do input como:
// caso nao (!) seja um match do regex (maildata = o input).match(mailformat = o regex)
// setara a mensagem de erro como E-mail inválido
// caso o match ocorra o customError sera posto como mensagem em branco com o ''
// nao mostrando erro no caso.
function validaEmail(input){
    const mailData = input.value
    let mensagem = '';
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if(!(mailData.match(mailformat)))
    {
        mensagem = "E-mail inválido";
   
    }
   
    
    input.setCustomValidity(mensagem);
    
}

//aqui temos uma validacao da data inserida, se for maior q 18 anos. usando a funcao maiorque18
//criamos uma const com o new Date como seu valor sendo o valor colocado no input
// mensagem setada como '' no escopo
// condicionamos a const do input a passar pela funcao maiorque18, caso negativa (!) a mensagem de erro sera
// preenchida em seu customError e sera mostrada
function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)
    let mensagem = ''

    if(!maiorQue18(dataRecebida)) {
        mensagem = 'Você deve ser maior que 18 anos para se cadastrar.'
    }

    input.setCustomValidity(mensagem)
}

//aqui temos a funcao para checar se a data colocada no input garante que o usuario tenha mais de 18 anos.

// criamos a funcao passando uma data por ele como parametro, 
// criamos uma variavel para a data de hoje com o new Date() sem parametros
// criamos a variavel para saber se faz 18 anos ou nao com o new Date de data atual(
// formatando a data dentro dele pegando o ano e adicionando 18, o data mes, e o data dia
// por fim retornando uma checagem booleana se a data atual for maior ou igual a datamais18 para dizer se fazem
// 18 anos ou nao do input colocado pelo usuario.
function maiorQue18(data) {
    const dataAtual = new Date()
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual
}


//a funcao de checar o cep atraves da api do via cep
// passamos o input como parametro.
// criamos o a variavel do cep afirmando que ela é o valor inserido no input com o replace de um regex
// que diz que qualquer(g) nao digito(\D) sera replaced por '' dando um resultado de apenas numeros.
//criamos a variavel url do endereco da via cep json com a variavel {$cep} em seu endereco para sofrer o
// replace automaticamente
// agora, precisamos definir os options da funcao de consumo da api:
// o method sera de GET(pegando informacoes em HTTP request)
// o modo sera de cors(Cross-Origin Resource Sharing) por default da api
// o headers sera o mesmo de antes onde definimos o content para ser uma appplication em json, porem 
// ja utilizamos a estilizacao da respota dop json em utf-8
function recuperarCEP(input) {
    const cep = input.value.replace(/\D/g, '')
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    }
//agora condicionaremos a validade do input 
//caso a validade do tipo de pattern e/ou a validade de possuir valor estiver negada (!)
// faremos um fetch da api com a resposta em json
// logo, na resposta, .then, caso a data recebida esteja com erro, colocaremos o customErro a mensagem
// com o set Custom Validity com o return para fechar o bloco
// caso nao haja erro, a mensagem de customError sera '' e
// rodara a funcao de preencher os campos dos inputs com a data recebida pelo fetch do cep
    if(!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(url,options).then(
            response => response.json()
        ).then(
            data => {
                if(data.erro) {
                    input.setCustomValidity('Não foi possível buscar o CEP.')
                    return
                }
                input.setCustomValidity('')
                preencheCamposComCEP(data)
                return
            }
        )
    }
}
/* function fetchEmail(input){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '74b44b31cemsh6bbcd3fcf6fff29p1e2767jsn38b0883a5ca6',
            'X-RapidAPI-Host': 'email-checker.p.rapidapi.com'
        }
    };
    
  
fetch('https://email-checker.p.rapidapi.com/verify/v1?email=name%40example.com', options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));
} */


// funcao criada para preencher o formulario automaticamente com os dados(data) adiquiridos pela api
// via CEP, definimos as variaveis dentro do DOM com o query selector
// logo apos setamos os values dos inputs com as informacoes dos dados obtidas, sabendo que,
// na api do via CEP cidade é localidade e estado é uf
function preencheCamposComCEP(data) {
    const logradouro = document.querySelector('[data-tipo="logradouro"]')
    const cidade = document.querySelector('[data-tipo="cidade"]')
    const estado = document.querySelector('[data-tipo="estado"]')

    logradouro.value = data.logradouro
    cidade.value = data.localidade
    estado.value = data.uf
}
