import { clienteService } from '../services/cliente-service.js'

//O javascript em forma asssincrona aplicado: uma funcao tem como parametro o retorno de outra funcao.
// Async é fazer coom que uma function retorne uma Promise
// o await faz a funcao esperar pela Promise ser retornada
// isso evita o uso demasiado de .then
(async () => { 

 // criando variavel para utilizar o URL e tornar manuseavel esta info a seguir
  const pegaURL = new URL(window.location)
// usando o URL com o searchParams que podemos achar no console.log com o pegaURL()
// criando a a variavel id com o .get(id) dos parametros da URl para identificar o cliente que esta sendo
// editado no momento 
  const id = pegaURL.searchParams.get('id')
  

  // criacao de variaveis dos inputs e seus data tipos
  const inputNome = document.querySelector('[data-nome]')
  const inputEmail = document.querySelector('[data-email]')
  const inputSenha = document.querySelector('[data-senha]')
  const inputDataNascimento = document.querySelector('[data-dataNascimento]')
  const inputCpf = document.querySelector('[data-cpf')
  const inputCep = document.querySelector('[data-cep]')
  let inputLogradouro = document.querySelector('[data-logradouro]')
  let inputCidade = document.querySelector('[data-cidade]')
  let inputEstado = document.querySelector('[data-estado]')

  // inicio do bloco try e catch onde puxamos a funcao detalhaCliente com o parametro do ID do cliente
  // para automaticamente preencher os dados do formulario ao carregar
  try { 
    const dados = await clienteService.detalhaCliente(id)    // definindo os dados com a funcao passando no id
    inputNome.value = dados.nome
    inputEmail.value = dados.email
    inputSenha.value = dados.senha                           // preenchenco os inputs com os dados.values
    inputCpf.value = dados.cpf
    inputCep.value = dados.cep
   /*  inputDataNascimento = dados.dataNascimento */
/*     inputLogradouro = dados.logradouro                   // o via CEP estava dando problema para preencher auto
    inputEstado = dados.estado 
    inputCidade = dados.cidade  */
  }
  catch(erro){
    console.log(erro)                           //catch do erro manda para pagina do erro
    window.location.href="./erro.html"
  }

  // criando uma variavel para identificar o form para ficar mais manuseavel 
  const formulario = document.querySelector('[data-form]')
  

  // usando ja a variavel formulario para criar
  // o event listener em async com try e catch.
  // o que faz: ele escuta quando o botao da submit, entra no bloco de funcao async
  // de cara, como praxe, o preventDeFault para evitar a funcao do botao de recarregar a page
  // depois comecando o tratamento para erros com o o bloco try, onde ele vai tentar executar o bloco
  // caso nao consiga, caira no catch que define o erro, neste caso, imprime no console e manda para pagina erro.html
//o bloco do try comeca com o await puxando o clienteService e sua funcao atualizaCliente pasando os parametros 
//acima definidos como const
  formulario.addEventListener('submit', async (evento)=> { 
    evento.preventDefault()
    try {
      await clienteService.atualizaCliente(id, inputNome.value, inputEmail.value, inputSenha.value, inputCpf.value, inputCep.value, inputCidade.value, inputDataNascimento.value, inputLogradouro.value, inputEstado.value)
      window.location.href = "../telas/edicao_concluida.html"
    }
    catch(erro){
      console.log(erro)
      window.location.href="./erro.html"
    }
  })
})()
