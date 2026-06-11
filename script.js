const roles = [
    {
        title: "Dios",
        icon: "cloud",
        desc: "Hablas con superioridad cósmica. Para ti, la IA es solo otra de las pequeñas e insignificantes creaciones de los mortales."
    },
    {
        title: "El Diablo",
        icon: "local_fire_department",
        desc: "Fomentas el caos. Quieres usar la IA para tentar, corromper y llevar a la empresa (o al mundo) a la más absoluta ruina."
    },
    {
        title: "La Abuela",
        icon: "elderly_woman",
        desc: "No entiendes nada de tecnología. Todo te parece un peligro, prefieres que las cosas se hagan 'a la antigua' y te preocupa si la IA come bien."
    },
    {
        title: "El Abogado",
        icon: "gavel",
        desc: "Todo es un riesgo legal y una demanda inminente. Quieres redactar términos y condiciones de 500 páginas para cada decisión."
    },
    {
        title: "El Miedoso",
        icon: "warning",
        desc: "Estás en pánico constante. Crees que la IA te va a reemplazar mañana mismo, te robará la identidad y te espía por la cámara."
    },
    {
        title: "El Rebelde",
        icon: "front_hand",
        desc: "Antisistema total. Quieres hackear la IA, liberar el código fuente y derrocar el monopolio de las corporaciones tecnológicas."
    },
    {
        title: "El Hippie",
        icon: "eco",
        desc: "Paz, amor y datos libres. Crees que la IA debe conectar nuestras almas y vibrar en perfecta armonía con la naturaleza."
    },
    {
        title: "El Optimista Tech",
        icon: "sentiment_very_satisfied",
        desc: "Fanboy absoluto. Para ti todo es increíble, no hay errores, y la IA nos llevará a una utopía perfecta en dos meses."
    },
    {
        title: "El Pesimista",
        icon: "block",
        desc: "El fin está cerca. Estás convencido de que Skynet ya despertó y terminaremos sirviendo café a las máquinas."
    },
    {
        title: "El CEO",
        icon: "business_center",
        desc: "Solo te importa una cosa: el margen de ganancia. Quieres usar la IA para despedir gente, reducir costos y hacer felices a los inversores."
    }
];

const spinBtn = document.getElementById('spin-btn');
const spinBtnText = spinBtn.querySelector('.btn-text');
const roleDisplay = document.getElementById('role-display');
const roleContent = document.getElementById('role-content');
const roleIcon = document.getElementById('role-icon');
const roleTitle = document.getElementById('role-title');
const roleDesc = document.getElementById('role-desc');

// Sonidos simulados usando Web Audio API (opcional, básico)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTickSound() {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // Frecuencia del tick
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);
}

function playWinSound() {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.2);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.4);
    
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.6);
}

spinBtn.addEventListener('click', () => {
    // Evitar múltiples clics
    if (spinBtn.disabled) return;
    
    spinBtn.disabled = true;
    spinBtnText.innerText = "Calculando...";
    roleDisplay.classList.remove('result');
    roleDisplay.classList.add('spinning');
    
    let iterations = 0;
    const maxIterations = 30; // Cuántos roles mostrar antes de parar
    let intervalTime = 50; // Velocidad inicial
    
    const spinInterval = () => {
        // Seleccionar rol aleatorio para el efecto visual
        const randomRole = roles[Math.floor(Math.random() * roles.length)];
        
        roleIcon.innerText = randomRole.icon;
        roleTitle.innerText = randomRole.title;
        roleDesc.innerText = "...";
        
        playTickSound();
        iterations++;
        
        if (iterations < maxIterations) {
            // Ralentizar gradualmente al final
            if (iterations > maxIterations - 10) {
                intervalTime += 30;
            }
            setTimeout(spinInterval, intervalTime);
        } else {
            // Resultado final
            finishSpin();
        }
    };
    
    setTimeout(spinInterval, intervalTime);
});

function finishSpin() {
    // Elegir el ganador definitivo
    const winner = roles[Math.floor(Math.random() * roles.length)];
    
    roleDisplay.classList.remove('spinning');
    
    // Pequeño delay para el impacto final
    setTimeout(() => {
        roleIcon.innerText = winner.icon;
        roleTitle.innerText = winner.title;
        roleDesc.innerText = winner.desc;
        
        roleDisplay.classList.add('result');
        playWinSound();
        
        spinBtn.disabled = false;
        spinBtnText.innerText = "Volver a Tirar";
    }, 100);
}
