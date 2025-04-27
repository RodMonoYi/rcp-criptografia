tooltipModal = document.getElementById('tooltipModal');
let showModal = true;

function toggleShowModal() {
    showModal = !showModal;
    tooltipModal.style.display = showModal ? 'flex' : 'none';
}



let mode = 'criptografia';
document.getElementById('btnCriptografia').addEventListener('click', function () {
    mode = 'criptografia';
    document.getElementById('criptografia').style.display = 'block';
    document.getElementById('descriptografia').style.display = 'none';
});
document.getElementById('btnDescriptografia').addEventListener('click', function () {
    mode = 'descriptografia';
    document.getElementById('criptografia').style.display = 'none';
    document.getElementById('descriptografia').style.display = 'block';
});


function dividirPraConquistar(palavra) {
    let textoA = '';
    let textoB = '';

    for (let i = 0; i < palavra.length; i++) {
        if (i < (palavra.length / 2)) {
            textoA = palavra[i] + textoA;
        } else {
            textoB = palavra[i] + textoB;
        }
    }

    return textoA + textoB;
}

function cifraAlternada(texto, encodeLevel, ...deslocamentos) {
    if (deslocamentos.length !== encodeLevel) {
        throw new Error("O número de deslocamentos deve ser igual ao encodeLevel.");
    }

    let resultado = '';
    for (let i = 0; i < texto.length; i++) {
        let charCode = texto.charCodeAt(i);
        let nivelAtual = i % encodeLevel;
        let deslocamento = deslocamentos[nivelAtual];

        if (nivelAtual % 2 === 0) {
            charCode += deslocamento;
        } else {
            charCode -= deslocamento;
        }

        resultado += String.fromCharCode(charCode);
    }

    return resultado;
}

function inserirCaracteresLixo(texto, intervalo) {
    const caracteresPossiveis = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let resultado = '';

    for (let i = 0; i < texto.length; i++) {
        resultado += texto[i];

        if ((i + 1) % intervalo === 0) {
            const randomIndex = Math.floor(Math.random() * caracteresPossiveis.length);
            const caractereLixo = caracteresPossiveis[randomIndex];
            resultado += caractereLixo;
        }
    }

    return resultado;
}

function inverterString(texto) {
    return texto.split('').reverse().join('');
}

function criptografar(texto, encodeLevel, deslocamentos, intervaloLixo) {
    let dividido = dividirPraConquistar(texto);
    let cifrado = cifraAlternada(dividido, encodeLevel, ...deslocamentos);
    let comLixo = inserirCaracteresLixo(cifrado, intervaloLixo);
    let invertido = inverterString(comLixo);
    return invertido;
}

function descriptografar(texto, encodeLevel, deslocamentos, intervaloLixo) {
    let invertido = inverterString(texto);

    let textoSemLixo = '';
    for (let i = 0, contador = 0; i < invertido.length; i++) {
        if ((contador + 1) % (intervaloLixo + 1) === 0) {
            contador = 0;
            continue;
        }
        textoSemLixo += invertido[i];
        contador++;
    }

    let textoDecifrado = '';
    for (let i = 0; i < textoSemLixo.length; i++) {
        let charCode = textoSemLixo.charCodeAt(i);
        let nivelAtual = i % encodeLevel;
        let deslocamento = deslocamentos[nivelAtual];

        if (nivelAtual % 2 === 0) {
            charCode -= deslocamento;
        } else {
            charCode += deslocamento;
        }

        textoDecifrado += String.fromCharCode(charCode);
    }

    let meio = Math.floor(textoDecifrado.length / 2);
    let parteA = textoDecifrado.slice(0, meio).split('').reverse().join('');
    let parteB = textoDecifrado.slice(meio).split('').reverse().join('');

    const palavraSintetizada = parteA + parteB;

    if (palavraSintetizada.length % 2 != 0) {
        const moverUltimaLetraParaInicio = palavraSintetizada => palavraSintetizada ? palavraSintetizada[palavraSintetizada.length - 1] + palavraSintetizada.slice(0, -1) : palavraSintetizada;
        return moverUltimaLetraParaInicio(palavraSintetizada);
    } else {
        return palavraSintetizada;
    }
}

function gerarResultados(tipo) {

    let textoOriginal, encodeLevel, deslocamentos, intervaloLixo;

    let erro = false;
    const errorElement = document.getElementById('deslocamentosError');
    errorElement.style.display = 'none';

    if (tipo === 'advanced') {
        const chaveAvancada = document.getElementById('advancedParams').value;
        [encodeLevel, deslocamentos, intervaloLixo] = chaveAvancada.split(';');
        deslocamentos = deslocamentos.split(',').map(Number);
        encodeLevel = Number(encodeLevel);
        intervaloLixo = Number(intervaloLixo);
        textoOriginal = document.getElementById('advancedText').value;
        console.log(chaveAvancada)
    } else {
        textoOriginal = document.getElementById('inputText').value;
        encodeLevel = Number(document.getElementById('encodeLevel').value);
        deslocamentos = document.getElementById('deslocamentos').value.split(',').map(Number);
        intervaloLixo = Number(document.getElementById('intervaloLixo').value);
    }

    if (deslocamentos.length !== encodeLevel) {
        erro = true;
        errorElement.style.display = 'block';
    }


    if (!erro) {
        const criptografado = criptografar(textoOriginal, encodeLevel, deslocamentos, intervaloLixo);
        const descriptografado = descriptografar(criptografado, encodeLevel, deslocamentos, intervaloLixo);

        document.getElementById('cryptedText').textContent = criptografado;
        document.getElementById('decryptedText').textContent = descriptografado;

        document.getElementById('resultContainer1').style.display = 'block';
    }

    const chaveDeCodificacao = `${encodeLevel};${deslocamentos.join(',')};${intervaloLixo}`;
    document.getElementById('keyText').textContent = chaveDeCodificacao;
}

function toggleInterface(tipo) {
    const simpleInterface = document.getElementById('simpleInterface');
    const advancedInterface = document.getElementById('advancedInterface');
    const resultContainer1 = document.getElementById('resultContainer1');
    const resultContainer2 = document.getElementById('resultContainer2');

    if (tipo === 'advanced') {
        simpleInterface.classList.remove('active');
        advancedInterface.classList.add('active');
    } else {
        advancedInterface.classList.remove('active');
        simpleInterface.classList.add('active');
    }
}

function DescriptografarTexto() {
    const textoCriptografado = document.getElementById('inputTextoCriptografado').value;
    const parametros = document.getElementById('inputParametrosDescriptografar').value.split(';');
    const encodeLevel = Number(parametros[0]);
    const deslocamentos = parametros[1].split(',').map(Number);
    const intervaloLixo = Number(parametros[2]);

    const resultado = descriptografar(textoCriptografado, encodeLevel, deslocamentos, intervaloLixo);
    document.getElementById('decryptedText2').textContent = resultado;
    document.getElementById('resultContainer2').style.display = 'block';
}

