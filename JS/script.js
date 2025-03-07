const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotToggle = document.querySelector('.chatbot-toggle-btn')
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

let userName = "";
let userLocation = "";
let userWebsite = "";

function toggleChat() {
    chatbotContainer.classList.toggle('show');
    chatbotToggleBtn.classList.toggle('resize');
}

const handleContinue = () => {
    if(firstInput.reportValidity()) {
        userName = firstInput.value;
        requestedInfo.textContent = "Por favor, coloque su contactos";
        const phoneCont = document.createElement('div');
        phoneCont.classList.add('phone-cont');
        phoneCont.innerHTML = `
            <div class="selector-cont">
                <div class="country-code-selector blue-circle"></div>
            </div>
            <input type="tel" class="phone contact" placeholder="Celular..." required />
            <div class="dropdown" id="country-code-dropdown">
                <div class="dropdown-item" data-country-code="+57">
                    <img src="./Images/co.png" alt="Colombia flag" />
                    <span>Colombia</span>
                </div>
                <div class="dropdown-item" data-country-code="+1">
                    <img src="./Images/us.png" alt="USA flag" />
                     <span>USA</span>
                </div>
                <div class="dropdown-item" data-country-code="+34">
                    <img src="./Images/es.png" alt="Spain flag" />
                    <span> Spain</span>
                </div>
                <div class="dropdown-item" data-country-code="+351">
                    <img src="./Images/pt.png" alt="Portugal flag" />
                    <span> Portugal</span>
                </div>
                <div class="dropdown-item" data-country-code="+91">
                    <img src="./Images/in.png" alt="India flag" />
                    <span>India</span>
                </div>
                <div class="dropdown-item" data-country-code="+61">
                    <img src="./Images/jp.png" alt="Japang" />
                    <span> Japan</span>
                </div>
            </div>
        `
        chatbotBody.insertBefore(phoneCont, firstInput);
        firstInput.placeholder = "Correo electrónico...";
        firstInput.type = "email";
        firstInput.value = "";
        secondInput.placeholder = "Página web (Opcional)...";
        secondInput.value = "";
        continueBtn.classList.add('hide');
        startBtn.classList.add('block');
    }
    const countryCodeSelector = document.querySelector('.country-code-selector');
    const phoneInput = document.querySelector('.phone');
    countryCodeSelector.addEventListener('click', toggleDropdown);

    const selectCountryCode = (code, event) => {
        countryCodeSelector.classList.remove('blue-circle');
        countryCodeSelector.innerHTML = event.currentTarget.children[0].outerHTML;
        userLocation = event.currentTarget.children[1].textContent;
        document.getElementById('country-code-dropdown').classList.remove('block');
        phoneInput.value = code;
    }
    const items = document.querySelectorAll('.dropdown-item');
    items.forEach((item) => {
        item.addEventListener('click', (event) => {
            const code = event.currentTarget.getAttribute('data-country-code');
            selectCountryCode(code, event)
        })
    });
 
    phoneInput.addEventListener('input', (event) => {
        if (event.target.value === '') {  
            countryCodeSelector.classList.add('blue-circle');
            countryCodeSelector.innerHTML = '';
        }
    });
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
                <span>Precios de sus agentes</span>
                <span>Formas de contacto</span>
                <span>¿En qué canales funciona?</span>
                <span>Quiero probar sus agentes</span>
            </div>
        `;
        chatbotFooter.classList.add('show');   
    }
    userWebsite = secondInput.value;
    document.querySelectorAll('.suggestions span').forEach((span) => {
        span.addEventListener('click', (event) => {
            sendMessage(event.target.textContent);
        })
    })
}

function toggleDropdown() {
    const dropdown = document.getElementById('country-code-dropdown');
    dropdown.classList.toggle('block');
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
            const botResponse = await generateContent(messageToSend, userName, userLocation, userWebsite);
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

async function generateContent(userInput, userName, userLocation, userWebsite = '') {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing Gemini API key!");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    // Define the context for the landing page
    const pageContext = `
        Context: This is a landing page named AI Views that promotes intelligent agents trained to solve sales challenges. 
        The main feature of this page is offering solutions and services related to improving sales through the use of smart agents. 
        The page also includes a call to action for users to hire an agent.

        User Information:
        Name: ${userName}
        Location: ${userLocation}
        ${userWebsite ? `Website: ${userWebsite}` : ''}
    `;

    // Combine context with user input
    const prompt = `${pageContext}\nUser Question: ${userInput}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            console.log("API Error:", response.status, response.statusText);
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Debugging

        // Extract response safely
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
    } catch (error) {
        console.error('Error generating content:', error.message);
        return "An error occurred while generating content.";
    }
}


chatbotToggle.addEventListener('click', toggleChat);
continueBtn.addEventListener('click', handleContinue);
startBtn.addEventListener('click', handleStart);

document.querySelector('.send-btn').addEventListener('click', () => {
    sendMessage();
});

document.querySelector('.close-btn').addEventListener('click', toggleChat);

document.querySelector('.chatbot-footer input').addEventListener('keydown', (event) => {
   if(event.key === 'Enter') {
    sendMessage();
   }
});





