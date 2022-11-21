


// primeira funcao é a de puxar a lista
// uma funcao assincrona que tem como parametro uma arrow function que retorna um fetch
//o fetch serve para buscar as informacoes do cliente no url especificado
//o profile é determinado no db.json sobre as props dos objetos nele inclusos.
// o fetch gera uma Promise que entao pode ser puxada seu callback com .then
//dentro do callback temos a resposta que retorna, condicionada, se a resposta for .ok ou seja, estive true
// a resposta.json() sera o retorno, ou seja, os dados sofrerao um parse para o corpo do texto como JSON
// o retorno nao eh um JSON mas sim o produto das informacoes dele como um objeto JavaScript

const listaClientes = () =>  {
    return fetch(`http://localhost:3000/profile`)
    .then(resposta => {
        if(resposta.ok){
            return resposta.json()
        }
        throw new Error('Não foi possível listar os clientes')  //caso a resposta nao seja ok o Throw new Error no console para determinar o erro
    })
}


// a functor cria cliente com o parametros advindos do Profile que temos no db.json.
// note que nao trazemos o ID, pois o ID ja gera automatico pelo sistema.
// como estamos tentando nao apenas demonstrar no HTML como tbm incluir os dados no db.json
// precisamos passar DOIS parametros no fetch. o url do profile do objeto e entao passamos os OPTIONS do fetch.
// é neste caso que definimos, o method(para o caso de incluir dados no db.json o POST) e 
// incluimos o option HEADERS. é necessário pois estaremos agora efetuando uma acao HTTP request e response com o fetch
// estamos usando uma array de arrays entao devemos definir o content-type como (:) uma aplicacao em json neste caso application/json
//definido o method e o headers agora definiremos o body, o conteudo enviado pelo post, para isso temos que tornar os dados
// em strings com a funcao inata JSON.stringfy e definindo os valores e atributos do objeto

const criaCliente = (nome, email, senha, dataNascimento, cpf, cep, logradouro, cidade, estado) => { 
    return fetch(`http://localhost:3000/profile`, {
        method: 'POST', 
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha,
            dataNascimento: dataNascimento,
            cpf: cpf,
            cep: cep,
            logradouro: logradouro,
            cidade: cidade,
            estado: estado
        })
    })
    .then( resposta => {                    // o .then para retornar a promise do fetch como explicado acima
        if(resposta.ok){
            return resposta.body
        }
        throw new Error('Não foi possível criar um cliente') // o erro como explicado acima
    })
}

//funcao para remover o cliente com base em seu ID. pq pelo id? pois se nao correriamos o risco de 
//deletar todos os clientes ou qualquer outro.
// logo o fetch tem incluso no profile da page a string de code js ${id} para quando carregar a pagina
// ou executar a funcao ele dar o target do fetch no id especificado como parametro na funcao de remocao
const removeCliente = (id) => { 
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'DELETE' //method do fetch como delete
    })
    .then( resposta => { 
        if(!resposta.ok){  // retorno da promessa, com o ! antes para caso nao consiga a resposta.ok, joga o erro
        throw new Error('Não foi possível deletar um cliente')
        }
    })
}
 
const detalhaCliente = (id) => { 
    return fetch(`http://localhost:3000/profile/${id}`)
    .then(resposta => { 
        if(resposta.ok){
            return resposta.json()
        }
    
        throw new Error('Não foi possível detalhar um cliente')
    })
}


//funcao de atualizar o cliente passando todos os parametros (os atributos do objeto)
// com retorno de um fetch com o ID especificado desta vez para puxar os dados exatos do cliente
// logo apos passamos os options do method como PUT para apenas incluir na pagina
// os headers como definido acima e o body como explicado acima novamente
const atualizaCliente = (id, nome, email, senha, dataNascimento, cpf, cep, logradouro, cidade, estado) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha,
            dataNascimento: dataNascimento,
            cpf: cpf,
            cep: cep,
            logradouro: logradouro,
            cidade: cidade,
            estado: estado
        })
    })
    .then( resposta => {
        if(resposta.ok){
            return resposta.json()
        }
        throw new Error('Não foi possível detalhar um cliente')
    })
}

// criamos um export de um functor com todas as funcoes deste arquivo js para o import em seus controllers
export const clienteService = { 
    listaClientes,
    criaCliente, 
    removeCliente,
    detalhaCliente,
    atualizaCliente

}
