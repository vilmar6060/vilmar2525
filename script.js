// ===================================================
// PARTE 1: CÓDIGO PARA CONTROLAR A JANELA DO CHAT
// ===================================================

// Seleciona os elementos da interface do chat (balão, janela, botão de fechar)
const chatBubble = document.getElementById('chat-bubble');
const chatContainer = document.getElementById('chat-container');
const closeChatBtn = document.getElementById('close-chat-btn');

// Verifica se os elementos realmente existem antes de adicionar os eventos
if (chatBubble && chatContainer && closeChatBtn) {
    // Quando o balão for clicado, mostra a janela do chat e esconde o balão
    chatBubble.addEventListener('click', () => {
        chatContainer.classList.remove('hidden');
        chatBubble.classList.add('hidden');
    });

    // Quando o botão de fechar for clicado, esconde a janela e mostra o balão
    closeChatBtn.addEventListener('click', () => {
        chatContainer.classList.add('hidden');
        chatBubble.classList.remove('hidden');
    });
} else {
    console.error("Erro: Um ou mais elementos do chat (balão, container, botão de fechar) não foram encontrados. Verifique os IDs no HTML.");
}


// ===================================================
// PARTE 2: CÓDIGO PARA FAZER A IA FUNCIONAR
// (Seu código original que já estava funcionando)
// ===================================================

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function addMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    const msgContent = document.createElement('div');
    msgContent.classList.add('message-content');
    
    // Converte o negrito (**) em tags <b>
    msgContent.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    
    msgDiv.appendChild(msgContent);
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage('user', text);
    userInput.value = '';

    try {
        const apiUrl = 'https://chat-ia-server-763138772735.southamerica-east1.run.app/chat';
        
        const payload = {
            message: text
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Erro na rede: ${response.status}`);
        }

        const data = await response.json();
        const botReply = data.reply;
        addMessage('bot', botReply);

    } catch (error) {
        console.error('Ocorreu um erro:', error);
        addMessage('bot', '⚠️ Desculpe, ocorreu um erro na comunicação com o servidor.');
    }
}