(()=>{var e={},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.rv=()=>"1.2.7",n.ruid="bundler=rspack@1.2.7";let o=document.querySelector(".chatbot-container"),a=document.querySelector(".chatbot-toggle-btn"),s=document.querySelector(".chatbot-toggle-icon"),r=document.querySelector(".chatbot-body"),c=document.querySelector(".chatbot-footer");document.querySelector(".chatbot-close-btn img");let d=document.querySelector(".info-request"),i=document.querySelector(".name"),l=document.querySelector(".surname"),u=document.querySelector(".continue"),g=document.querySelector(".start"),m=document.querySelector(".chat-robot"),p=document.querySelector(".info-request"),v="",y="",h="";function L(){o.classList.toggle("show"),s.classList.toggle("resize")}function f(){document.getElementById("country-code-dropdown").classList.toggle("block")}async function b(e){let t=document.getElementById("userInput"),n=e||t.value.trim();if(""!==n){let e=document.querySelector(".suggestions");m.classList.add("hide"),p.classList.add("hide"),e.classList.add("hide");let o=document.createElement("div");o.classList.add("user-message-cont");let a=document.createElement("div");a.classList.add("user-message"),a.textContent=n,o.appendChild(a);let s=document.createElement("img");s.src="./Images/Frame.png",s.alt="user image",a.classList.add("message","user-message"),o.appendChild(s),r.appendChild(o);try{let e=await E(n,v,y,h);e&&setTimeout(()=>{let t=document.createElement("div");t.classList.add("bot-message-cont");let n=document.createElement("img");n.src="./Images/chat.png",n.alt="chatbot image",t.appendChild(n);let o=document.createElement("div");o.classList.add("bot-message"),o.textContent=e,t.appendChild(o),r.appendChild(t),r.scrollTop=r.scrollHeight},1e3)}catch(e){console.log("Error sending message:",e)}t.value=""}}async function E(e,t,n,o=""){let a="AIzaSyAmrbX783UEzM5A5uL-Xj5oL0VXIMinqFM";if(!a)throw Error("Missing Gemini API key!");let s=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${a}`,r=`
        Context: This is a landing page named AI Views that promotes intelligent agents trained to solve sales challenges. 
        The main feature of this page is offering solutions and services related to improving sales through the use of smart agents. 
        The page also includes a call to action for users to hire an agent.

        User Information:
        Name: ${t}
        Location: ${n}
        ${o?`Website: ${o}`:""}
    `,c=`${r}
User Question: ${e}`;try{let e=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:c}]}]})});if(!e.ok)throw console.log("API Error:",e.status,e.statusText),Error(`API Error: ${e.status} - ${e.statusText}`);let t=await e.json();return console.log("API Response:",t),t?.candidates?.[0]?.content?.parts?.[0]?.text||"No response received."}catch(e){return console.error("Error generating content:",e.message),"An error occurred while generating content."}}a.addEventListener("click",L),u.addEventListener("click",()=>{if(i.reportValidity()){v=i.value,d.textContent="Por favor, coloque su contactos";let e=document.createElement("div");e.classList.add("phone-cont"),e.innerHTML=`
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
        `,r.insertBefore(e,i),i.placeholder="Correo electr\xf3nico...",i.type="email",i.value="",l.placeholder="P\xe1gina web (Opcional)...",l.value="",u.classList.add("hide"),g.classList.add("block")}let e=document.querySelector(".country-code-selector"),t=document.querySelector(".phone");e.addEventListener("click",f);let n=(n,o)=>{e.classList.remove("blue-circle"),e.innerHTML=o.currentTarget.children[0].outerHTML,y=o.currentTarget.children[1].textContent,document.getElementById("country-code-dropdown").classList.remove("block"),t.value=n};document.querySelectorAll(".dropdown-item").forEach(e=>{e.addEventListener("click",e=>{n(e.currentTarget.getAttribute("data-country-code"),e)})}),t.addEventListener("input",t=>{""===t.target.value&&(e.classList.add("blue-circle"),e.innerHTML="")})}),g.addEventListener("click",()=>{document.querySelector(".phone").reportValidity()&&i.reportValidity()&&(d.innerHTML=`
            Empecemos a ayudarte
            <span>Puede seleccionar una opci\xf3n o
            escribir una pregunta abajo.</span>
        `,d.classList.add("info-resize"),g.classList.add("hide"),r.innerHTML=`
            <div class="suggestions">
                <span>Precios de sus agentes</span>
                <span>Formas de contacto</span>
                <span>\xbfEn qu\xe9 canales funciona?</span>
                <span>Quiero probar sus agentes</span>
            </div>
        `,c.classList.add("show")),h=l.value,document.querySelectorAll(".suggestions span").forEach(e=>{e.addEventListener("click",e=>{b(e.target.textContent)})})}),document.querySelector(".send-btn").addEventListener("click",()=>{b()}),document.querySelector(".close-btn").addEventListener("click",L),document.querySelector(".chatbot-footer input").addEventListener("keydown",e=>{"Enter"===e.key&&b()})})();
//# sourceMappingURL=bundle.js.map