// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do Numero secreto Lobis Dev';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let numeroTentativas = 1;


//Evolução do codigo acima
function chamarTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

exibirMensagemTela();

function exibirMensagemTela() {
    chamarTextoNaTela('h1', 'Jogo do Numero secreto Lobis Dev')
    chamarTextoNaTela('p', 'Escolha um número entre 1 e 10')
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        chamarTextoNaTela('h1', 'Acertou !');
        let palavraTentativa = numeroTentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o numero secreto com ${numeroTentativas} ${palavraTentativa}`;
        chamarTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            chamarTextoNaTela('p', 'O número secreto é menor');
        } else {
            chamarTextoNaTela('p', 'O número secreto é maior');
        }
        numeroTentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEsolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementoNaLista = listaDeNumerosSorteados.length;


    if (quantidadeDeElementoNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEsolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEsolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEsolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    numeroTentativas = 1;
    exibirMensagemTela();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}