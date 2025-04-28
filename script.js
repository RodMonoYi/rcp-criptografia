function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random size between 1px and 3px
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random animation
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        particlesContainer.appendChild(particle);
    }
}

createParticles();

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');

        // Update active tab
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update active content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

document.getElementById('btnCriptografia').addEventListener('click', function () {
    document.getElementById('criptografia').style.display = 'block';
    document.getElementById('descriptografia').style.display = 'none';
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
});

document.getElementById('btnDescriptografia').addEventListener('click', function () {
    document.getElementById('criptografia').style.display = 'none';
    document.getElementById('descriptografia').style.display = 'block';
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
});

document.getElementById('encodeLevel').addEventListener('input', function () {
    const level = parseInt(this.value);
    const percentage = (level / 5) * 100;
    document.querySelector('.security-level').style.width = `${percentage}%`;
    document.getElementById('securityLevelDisplay').textContent = level;
    document.getElementById('encodeLevelLabel').textContent = "Security Level: " + level;
});

function toggleShowModal() {
    const modal = document.getElementById('tooltipModal');
    modal.classList.toggle('active');
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = element.previousElementSibling.querySelector('.copy-btn');
        const icon = copyBtn.querySelector('i');
        icon.classList.remove('fa-copy');
        icon.classList.add('fa-check');

        setTimeout(() => {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-copy');
        }, 2000);
    });
}

// Advanced help
function showAdvancedHelp() {
    alert('Advanced Parameters Format:\n\nSecurityLevel;ShiftValues;NoiseInterval\n\nExample: 2;1,2;3\n\n- SecurityLevel: Number of encryption layers (1-5)\n- ShiftValues: Comma-separated shift values (must match SecurityLevel count)\n- NoiseInterval: Interval for random noise characters');
}

// Original cryptography functions
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
        // document.getElementById('decryptedText').textContent = descriptografado;
        document.getElementById('securityLevelDisplay').textContent = encodeLevel;

        document.getElementById('resultContainer1').style.display = 'block';
    }

    const chaveDeCodificacao = `${encodeLevel};${deslocamentos.join(',')};${intervaloLixo}`;
    document.getElementById('keyText').textContent = chaveDeCodificacao;
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

const languageSwitcher = document.getElementById('languageSwitcher');

function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(response => response.json())
    .then(translations => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });
    })
    .catch(err => console.error('Erro ao carregar idioma:', err));
}

loadLanguage('pt');

// Muda idioma
languageSwitcher.addEventListener('change', (e) => {
  loadLanguage(e.target.value);
});
