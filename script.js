// Variáveis globais
let audioContext;
let oscillators = []; // Armazena os osciladores ativos
let intervalId; // Armazena o ID do intervalo

// Função para gerar uma frequência aleatória entre 20 Hz e 20000 Hz
function getRandomFrequency() {
    return Math.random() * (19000 - 20) + 20;
}

// Função para atualizar as frequências dos osciladores
function updateFrequencies() {
    oscillators.forEach(oscillator => {
        oscillator.frequency.value = getRandomFrequency();
    });
}

// Função para iniciar as frequências aleatórias
function startRandomFrequencies() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Cria 10 osciladores com frequências aleatórias
    for (let i = 0; i < 10; i++) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        // Define a frequência aleatória
        oscillator.frequency.value = getRandomFrequency();

        // Conecta o oscilador ao ganho e o ganho ao destino de áudio
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Define o volume (ganho) para evitar distorção
        gainNode.gain.value = 0.1;

        // Inicia o oscilador
        oscillator.start();

        // Armazena o oscilador na lista
        oscillators.push(oscillator);
    }

    // Atualiza as frequências a cada 0,5 segundos
    intervalId = setInterval(updateFrequencies, 1);
}

// Função para parar as frequências aleatórias
function stopRandomFrequencies() {
    // Para o intervalo de atualização de frequências
    clearInterval(intervalId);

    // Para e desconecta todos os osciladores
    oscillators.forEach(oscillator => {
        oscillator.stop();
        oscillator.disconnect();
    });
    oscillators = []; // Limpa a lista de osciladores
}

// Eventos dos botões
document.getElementById('start-button').addEventListener('click', () => {
    startRandomFrequencies();
});

document.getElementById('stop-button').addEventListener('click', () => {
    stopRandomFrequencies();
});