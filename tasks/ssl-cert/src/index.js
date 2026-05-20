const terminalBody = document.getElementById('terminalBody');
const flagOutput = document.getElementById('flagOutput');
const fetchBtn = document.getElementById('fetchBtn');
const glitchBtn = document.getElementById('glitchBtn');

function pushLine(message, type = 'line') {
    const line = document.createElement('p');
    line.className = type;
    line.textContent = message;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function glitchText(text) {
    const symbols = '!@#$%^&*()_+=-<>?/\\{}[]';
    return text
        .split('')
        .map((char) => (Math.random() > 0.7 ? symbols[Math.floor(Math.random() * symbols.length)] : char))
        .join('');
}

async function fetchFlag() {
    pushLine('Connecting to /flag endpoint...');
    try {
        const response = await fetch('/flag');
        if (!response.ok) {
            throw new Error(`Server responded ${response.status}`);
        }
        const text = await response.text();
        pushLine('Flag retrieved. Decrypting payload...');
        return text.trim();
    } catch (error) {
        pushLine(`Fetch failed: ${error.message}`, 'line');
        return null;
    }
}

function showFlag(flag) {
    if (!flag) {
        flagOutput.textContent = 'Unable to retrieve flag.';
        return;
    }
    let progress = 0;
    const reveal = setInterval(() => {
        progress += 1;
        const slice = flag.slice(0, progress);
        flagOutput.textContent = slice.padEnd(flag.length, '_');
        if (progress >= flag.length) {
            clearInterval(reveal);
            flagOutput.textContent = flag;
        }
    }, 40);
}

function runGlitchScan() {
    const base = 'Scanning certificate buffers...';
    let count = 0;
    const scan = setInterval(() => {
        count += 1;
        pushLine(glitchText(base));
        if (count >= 4) {
            clearInterval(scan);
            pushLine('No anomalies detected.');
        }
    }, 200);
}

fetchBtn.addEventListener('click', async () => {
    flagOutput.textContent = 'Working...';
    const flag = await fetchFlag();
    showFlag(flag);
});

glitchBtn.addEventListener('click', runGlitchScan);
