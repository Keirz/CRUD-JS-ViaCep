import { valida } from './main.js'


// criando variavel para todos os inputs do form para tornar manuseavel
const inputs = document.querySelectorAll('input')

// agora passamos o forEach na array criada com a variavel acima de inputs.
// o forEach passara no input um event listener neste caso com o 'blur', ou seja saindo do campo do input
// e quando isto ocorrer passara uma arrow function com o evento como parametro(o blur) onde tera o retorno
// a passagem da funcao valida no blur no target atual, passando um por um
inputs.forEach(input => {
    /* if(input.dataset.tipo === 'preco') {
        SimpleMaskMoney.setMask(input, {
            prefix: 'R$ ',
            fixed: true,
            fractionDigits: 2,
            decimalSeparator: ',',
            thousandsSeparator: '.',
            cursor: 'end'
        })
    } */

    input.addEventListener('blur', (evento) => {
        valida(evento.target)
    })
})
