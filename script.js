const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotToggleBtn = document.querySelector('.chatbot-toggle-icon');
const chatbotBody = document.querySelector('.chatbot-body');
const chatbotFooter = document.querySelector('.chatbot-footer');
const chatbotCloseBtn = document.querySelector('.chatbot-close-btn img');
const requestedInfo = document.querySelector('.info-request');
const firstInput = document.querySelector('.name');
const secondInput = document.querySelector('.surname');
const continueBtn = document.querySelector('.continue');
const startBtn = document.querySelector('.start');
const chatRobot = document.querySelector('.chat-robot');
const infoRequest = document.querySelector('.info-request');

function toggleChat() {
    chatbotContainer.classList.toggle('show');
    chatbotToggleBtn.classList.toggle('resize');
}

const handleContinue = () => {
    if(firstInput.reportValidity() && secondInput.reportValidity()) {

        requestedInfo.textContent = "Por favor, coloque su contactos";
        const phoneCont = document.createElement('div');
        phoneCont.classList.add('phone-cont');
        phoneCont.innerHTML = `
            <div class="selector-cont">
                <div class="country-code-selector" onclick="toggleDropdown()"></div>
            </div>
            <input type="tel" class="phone contact" placeholder="Celular..." required />
            <div class="dropdown" id="country-code-dropdown">
                <div class="dropdown-item" onclick="selectCountryCode('+1')">+1 (USA)</div>
                <div class="dropdown-item" onclick="selectCountryCode('+34')">+34 (Spain)</div>
                <div class="dropdown-item" onclick="selectCountryCode('+351')">+351 (Portugal)</div>
                <div class="dropdown-item" onclick="selectCountryCode('+91')">+91 (India)</div>
                <div class="dropdown-item" onclick="selectCountryCode('+61')">+81 (Japan)</div>
            </div>
        `
        chatbotBody.insertBefore(phoneCont, firstInput);
        firstInput.placeholder = "Correo electrónico...";
        firstInput.type = "email";
        firstInput.value = "";
        secondInput.placeholder = "Página web (Opcional)...";
        secondInput.value = "";
        secondInput.removeAttribute('required');
        continueBtn.classList.add('hide');
        startBtn.classList.add('block');
    }
}

const handleStart = () => {
    const phoneInput = document.querySelector('.phone');
    if(phoneInput.reportValidity() && firstInput.reportValidity()) {
        requestedInfo.innerHTML = `
            Empecemos a ayudarte
            <span>Puede seleccionar una opción o
            escribir una pregunta abajo.</span>
        `;
        requestedInfo.classList.add('info-resize');
        startBtn.classList.add('hide');
        chatbotBody.innerHTML = `
            <div class="suggestions">
                <span onclick="sendMessage('Precios de sus agentes')">Precios de sus agentes</span>
                <span onclick="sendMessage('Formas de contacto')">Formas de contacto</span>
                <span onclick="sendMessage('¿En qué canales funciona?')">¿En qué canales funciona?</span>
                <span onclick="sendMessage('Quiero probar sus agentes')">Quiero probar sus agentes</span>
            </div>
        `;
        chatbotFooter.classList.add('show');   
    }
}

function toggleDropdown() {
    const dropdown = document.getElementById('country-code-dropdown');
    dropdown.classList.toggle('block');
}

function selectCountryCode(code) {
    document.getElementById('country-code-dropdown').classList.remove('block');
    const phoneInput = document.querySelector('.phone');
    phoneInput.value = code;
}

async function sendMessage(inputValue) {
    const userInput = document.getElementById('userInput');
    const messageToSend = inputValue || userInput.value.trim(); 
    if (messageToSend !== "") {
        const suggestions = document.querySelector('.suggestions');
        chatRobot.classList.add('hide');
        infoRequest.classList.add('hide');
        suggestions.classList.add('hide');
        const userMessageCont = document.createElement('div');
        userMessageCont.classList.add('user-message-cont');
        const userMessage = document.createElement('div');
        userMessage.classList.add('user-message');
        userMessage.textContent = messageToSend;
        userMessageCont.appendChild(userMessage);
        const userprofile = document.createElement('img');
        userprofile.src = './Images/Frame.png';
        userprofile.alt = 'user image'; userMessage.classList.add('message', 'user-message');
        userMessageCont.appendChild(userprofile);
        chatbotBody.appendChild(userMessageCont);

        try {
            const botResponse = await generateContent(messageToSend);
            if(botResponse) {
                setTimeout(() => {
                    const botMessageCont = document.createElement('div');
                    botMessageCont.classList.add('bot-message-cont');
                    const botImage = document.createElement('img');
                    botImage.src = './Images/chat.png';
                    botImage.alt = 'chatbot image';
                    botMessageCont.appendChild(botImage);
                    const botMessage = document.createElement('div');
                    botMessage.classList.add('bot-message');
                    botMessage.textContent = botResponse;
                    botMessageCont.appendChild(botMessage);
                    chatbotBody.appendChild(botMessageCont);
                    chatbotBody.scrollTop = chatbotBody.scrollHeight;
                }, 1000);
            }
        }
        catch (error) {
            console.log('Error sending message:', error);
        }
        userInput.value = "";    
    }
}

async function generateContent(userInput) {
    const apiKey = 'GEMINI_API_KEY';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    // Define the context for the landing page
    const pageContext = `
        Context: This is a landing page that promotes intelligent agents trained to solve sales challenges. 
        The main feature of this page is offering solutions and services related to improving sales through the use of smart agents. 
        The page also includes a call to action for users to hire an agent.
    `;

    // Combine page context with user input
    const prompt = `${pageContext}\nUser Question: ${userInput}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error generating content:', error);
    }
}





