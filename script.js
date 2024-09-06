const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotToggleBtn = document.querySelector('.chatbot-toggle-btn img');
const chatbotCloseBtn = document.querySelector('.chatbot-close-btn img');
const requestedInfo = document.querySelector('.info-request');
const nameInput = document.querySelector('.name');
const surnameInput = document.querySelector('.surname');
const continueBtn = document.querySelector('.continue');
function toggleChat() {
    chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
    chatbotToggleBtn.style.width = chatbotContainer.style.display === 'flex' ? '100px' : '70px';
}

const handleContinue = () => {
    requestedInfo.textContent = "Por favor, coloque su contactos";
    const phoneCont = document.createElement('div');
    phoneCont.classList.add('phone-cont');
    phoneCont.innerHTML = `
        <div class="selector-cont">
            <div class="country-code-selector" onclick="toggleDropdown()"></div>
        </div>
        <input type="tel" class="phone contact" placeholder="Enter your phone number">
        <div class="dropdown" id="country-code-dropdown">
            <div class="dropdown-item" onclick="selectCountryCode('+1')">+1 (USA)</div>
            <div class="dropdown-item" onclick="selectCountryCode('+34')">+34 (Spain)</div>
            <div class="dropdown-item" onclick="selectCountryCode('+351')">+351 (Portugal)</div>
            <div class="dropdown-item" onclick="selectCountryCode('+91')">+91 (India)</div>
            <div class="dropdown-item" onclick="selectCountryCode('+61')">+81 (Japan)</
            </div>
    `
    chatbotContainer.insertBefore(phoneCont, nameInput);
    nameInput.placeholder = "Correo electrónico...";
    surnameInput.placeholder = "Página web (Opcional)...";
    continueBtn.textContent = "Empezar";
}

function toggleDropdown() {
    const dropdown = document.getElementById('country-code-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function selectCountryCode(code) {
    document.getElementById('country-code-dropdown').style.display = 'none';
    const phoneInput = document.querySelector('.phone');
    phoneInput.value = code;
}


async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatbotBody = document.getElementById('chatbotBody');
    
    if (userInput.value.trim() !== "") {
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user-message');
        userMessage.textContent = userInput.value;
        chatbotBody.appendChild(userMessage);

        // Call the AI to generate a response
        const botResponse = await generateContent(userInput.value);
        console.log(botResponse);

        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.classList.add('message', 'bot-message');
            botMessage.textContent = botResponse;
            chatbotBody.appendChild(botMessage);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }, 1000);

        userInput.value = "";
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
}

// async function generateAIResponse(userInput) {
//     const url = 'https://api.openai.com/v1/completions';
    
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${apiKey}`
//         },
//         body: JSON.stringify({
//             model: 'text-davinci-003',  // Or another model of your choice
//             prompt: userInput,
//             max_tokens: 150,
//             temperature: 0.7
//         })
//     });
    
//     const data = await response.json();
//     return data.choices[0].text.trim();
// }

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
        console.log(data);  // Log the response data to the console

        // Extract and return the relevant text from the response
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error generating content:', error);
    }
}





