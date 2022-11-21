import { clienteService } from '../services/cliente-service.js'

const formulario = document.querySelector('[data-form]')
//criamos a variavel do formulario para tornalo mais manuseavel no codigo

//acessamos o formulario adicionando o event listener de seu submit, para quando o fizer executar
// a funcao assincrona quando houver o evento(submit)
// inicialmente já definimos que ao ocorrer o evento deve ser executada a prevendDefault() para nao recarregar
// ou abrir nova pagina

// logo em seguida iniciamos o bloco de codigo com o try onde setamos as variaveis dos inputs.values
// ou seja, pegamos o valor de cada input apos o evento, selecionando pelo DOM, e setamos como variaveis com os
// mesmos nomes dos parametros e atributos a serem passados para o db.json
// apos criamos a promise com o await e a funcao de criar cliente com os parametros das variaveis acima setadas
// entao definimos que caso ocorra a funcao, devera ser redirecionado com o window.location para a pagina que
// informa da conclusao do cadastro.
formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault()
  try {
    const nome = evento.target.querySelector('[data-nome]').value
    const email = evento.target.querySelector('[data-email]').value
    const senha = evento.target.querySelector('[data-senha]').value
    const dataNascimento = evento.target.querySelector('[data-dataNascimento]').value
    const cpf = evento.target.querySelector('[data-cpf').value
    const cep = evento.target.querySelector('[data-cep]').value
    const logradouro = evento.target.querySelector('[data-logradouro]').value
    const cidade = evento.target.querySelector('[data-cidade]').value
    const estado = evento.target.querySelector('[data-estado]').value

    await clienteService.criaCliente(nome, email, senha, dataNascimento, cpf, cep, logradouro, cidade, estado )
    window.location.href = './cadastro-concluido.html'
  }
  catch (erro) {
    console.log(erro)                                       // jogamos o erro no console e 
    window.location.href = "./erro.html"            // enviamos para a pagina de erro caso o try falhe
  }
})