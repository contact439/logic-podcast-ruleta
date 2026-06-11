const roles = [
    {
        title: "El Empleado",
        icon: "engineering",
        desc: "Teme por su trabajo y el de sus compañeros. Valora el toque humano, la estabilidad y desconfía de las intenciones de la dirección."
    },
    {
        title: "El CEO / Empresa",
        icon: "business_center",
        desc: "Enfocado en la rentabilidad, la eficiencia y no quedarse atrás en la competencia. Ve a la IA como la herramienta clave para la supervivencia."
    },
    {
        title: "El Optimista Tech",
        icon: "psychology",
        desc: "Cree ciegamente que la IA solucionará todo. Ve cualquier resistencia como un atraso injustificado hacia una utopía inminente."
    },
    {
        title: "El Pesimista / Ludita",
        icon: "block",
        desc: "Considera que la IA es una caja de Pandora que deshumaniza, genera sesgos incontrolables y eventualmente será destructiva."
    },
    {
        title: "El Abogado / Regulador",
        icon: "gavel",
        desc: "Solo ve riesgos legales: derechos de autor, privacidad de datos, compliance, demandas laborales y la necesidad de regulaciones estrictas."
    },
    {
        title: "El Capitalista",
        icon: "payments",
        desc: "Busca maximizar el ROI, disrupción total del mercado para generar monopolios y escalar a toda costa ignorando fricciones temporales."
    },
    {
        title: "El Socialista",
        icon: "groups",
        desc: "Exige que las ganancias de la IA se redistribuyan (renta básica universal), impuestos a robots y protección social agresiva frente al cambio."
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
