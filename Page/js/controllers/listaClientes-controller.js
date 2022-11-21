import { clienteService } from '../services/cliente-service.js'


//criamos aqui a funcao para popular a tabela de clientes com os parametros de:
//APENAS nome email cep cpf e id, pois apenas usaremos esses parametros, apesar de possuir mais atributos
// no objeto do json.
// criamos a variavel de nova linha com o createElement('tr')
//depois, setamos uma variavel de conteudo de tr para o codigo abaixo.

const criaNovaLinha = (nome, email, cep, cpf, id) =>  { 
  const linhaNovoCliente = document.createElement('tr')
  const conteudo = `
      <td class="td" data-td>${nome}</td>
                  <td>${email}</td>
                  <td>${cep}</td>
                  <td>${cpf}</td>
                  <td>
                      <ul class="tabela__botoes-controle">
                          <li><a href="./editar-cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                          <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
                      </ul>
                  </td> 
                  `

//setamos o innerHTML da nova linha como a variavel de conteudo                  
  linhaNovoCliente.innerHTML = conteudo
  // definimos o id do cliente dentro da tabela como sendo o id recebido pelo arquivo json
  linhaNovoCliente.dataset.id = id
  return linhaNovoCliente
}
//a href="./editar-cliente.html?id=${id}" se refere a incluir o numero do ID do cliente que estamos acessando
// para edicao para termos certeza de qual cliente estamos futucando.

const tabela = document.querySelector('[data-tabela]')
//variavel da tabela para torná-la mais manuseavel

//utilizando a variavel, criamos um eventlistener onde, ao clicar, retornara uma funcao assincrona do evento onde
// o botao de excluir eh setado em uma variavel booleana.
// caso o target do click seja da classe e tipo 'botao-simples botao-simples--excluir', ele sera o ehBotaoDeDeleta
//entao condicionamos isso como caso seja verdadeiro ele fara o try do bloco:
// onde a linha do cliente sera o elemento pai mais proximo do target do evento que possua aquelaa data-id
// o id sera declarado como o tipo de data id da linhaCliente
//entao criamos a promise do await com a funcao removeCliente passando o ID dele como parametro
// logo apos, usamos a linhaCliente.remove() para deletar de maneira mais responsiva e imediata a linha em conjunto 
// com deletar os dados do cliente
tabela.addEventListener('click', async (evento)=> {
    let ehBotaoDeDeleta = evento.target.className === 'botao-simples botao-simples--excluir'
    if(ehBotaoDeDeleta){
        try {
            const linhaCliente = evento.target.closest('[data-id]')
            let id = linhaCliente.dataset.id
            await clienteService.removeCliente(id)
            linhaCliente.remove()
        }
        catch(erro){
            console.log(erro)                                   // caso nao consiga efetuar o codigo, vai pro erro.html
            window.location.href="../erro.html"
        }
    }
})

// criamos entao o render, que ira incluir a linha na lista de clientes
// ele retorna uma funcao assincrona onde o try do bloco fara:
// cria uma variavel setada para uma promise de await onde executa a funcao de busca do db.json (listaClientes)
// e passa uma funcao por cada elemento da array recebida com o forEach onde pegara do elemento e apensara como
//elemento filho com a funcao de criar nova linha na tabela com os parametros desejados no caso,
// o nome email cep cpf e id de cada elemento
const render = async () =>  {
    try {
        const listaClientes = await clienteService.listaClientes()
        listaClientes.forEach(elemento => {
            tabela.appendChild(criaNovaLinha(elemento.nome,elemento.email, elemento.cep, elemento.cpf, elemento.id))
    })
    }
    catch(erro){
        console.log(erro)                        // caso haja erro envia para erro.html
        window.location.href="../erro.html"
    }
    
}

//executa a funcao de render
render()