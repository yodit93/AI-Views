(()=>{var e={},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var s=t[a]={exports:{}};return e[a](s,s.exports,n),s.exports}n.rv=function(){return"1.0.5"},n.ruid="bundler=rspack@1.0.5";let a=document.querySelector(".chatbot-container"),o=document.querySelector(".chatbot-toggle-btn"),s=document.querySelector(".chatbot-toggle-icon"),r=document.querySelector(".chatbot-body"),c=document.querySelector(".chatbot-footer");document.querySelector(".chatbot-close-btn img");let d=document.querySelector(".info-request"),l=document.querySelector(".name"),i=document.querySelector(".surname"),u=document.querySelector(".continue"),m=document.querySelector(".start"),p=document.querySelector(".chat-robot"),g=document.querySelector(".info-request"),v="",y="",h="";function L(){a.classList.toggle("show"),s.classList.toggle("resize")}function f(){document.getElementById("country-code-dropdown").classList.toggle("block")}async function b(e){let t=document.getElementById("userInput"),n=e||t.value.trim();if(""!==n){let e=document.querySelector(".suggestions");p.classList.add("hide"),g.classList.add("hide"),e.classList.add("hide");let a=document.createElement("div");a.classList.add("user-message-cont");let o=document.createElement("div");o.classList.add("user-message"),o.textContent=n,a.appendChild(o);let s=document.createElement("img");s.src="./Images/Frame.png",s.alt="user image",o.classList.add("message","user-message"),a.appendChild(s),r.appendChild(a);try{let e=await S(n,v,y,h);e&&setTimeout(()=>{let t=document.createElement("div");t.classList.add("bot-message-cont");let n=document.createElement("img");n.src="./Images/chat.png",n.alt="chatbot image",t.appendChild(n);let a=document.createElement("div");a.classList.add("bot-message"),a.textContent=e,t.appendChild(a),r.appendChild(t),r.scrollTop=r.scrollHeight},1e3)}catch(e){console.log("Error sending message:",e)}t.value=""}}async function S(e,t,n,a=""){let o="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCLvJCHHYlkycpevdWSsJ5sDJA3z6tovVw",s=`
        Context: This is a landing page named AI VIews that promotes intelligent agents trained to solve sales challenges. 
        The main feature of this page is offering solutions and services related to improving sales through the use of smart agents. 
        The page also includes a call to action for users to hire an agent.

        User Information:
        Name: ${t}
        Location: ${n}
    `;a&&(s+=`
Website: ${a}`);let r=`${s}
User Question: ${e}`;try{let e=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:r}]}]})});if(!e.ok)throw Error(`HTTP error! status: ${e.status}`);return(await e.json()).candidates[0].content.parts[0].text}catch(e){console.error("Error generating content:",e)}}window.addEventListener("scroll",()=>{let e=document.querySelector(".fixed");window.scrollY>0?e.classList.add("header-scrolled"):e.classList.remove("header-scrolled")}),o.addEventListener("click",L),u.addEventListener("click",()=>{if(l.reportValidity()){v=l.value,d.textContent="Por favor, coloque su contactos";let e=document.createElement("div");e.classList.add("phone-cont"),e.innerHTML=`
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
        `,r.insertBefore(e,l),l.placeholder="Correo electr\xf3nico...",l.type="email",l.value="",i.placeholder="P\xe1gina web (Opcional)...",i.value="",u.classList.add("hide"),m.classList.add("block")}let e=document.querySelector(".country-code-selector"),t=document.querySelector(".phone");e.addEventListener("click",f);let n=(n,a)=>{e.classList.remove("blue-circle"),e.innerHTML=a.currentTarget.children[0].outerHTML,y=a.currentTarget.children[1].textContent,document.getElementById("country-code-dropdown").classList.remove("block"),t.value=n};document.querySelectorAll(".dropdown-item").forEach(e=>{e.addEventListener("click",e=>{n(e.currentTarget.getAttribute("data-country-code"),e)})}),t.addEventListener("input",t=>{""===t.target.value&&(e.classList.add("blue-circle"),e.innerHTML="")})}),m.addEventListener("click",()=>{document.querySelector(".phone").reportValidity()&&l.reportValidity()&&(d.innerHTML=`
            Empecemos a ayudarte
            <span>Puede seleccionar una opci\xf3n o
            escribir una pregunta abajo.</span>
        `,d.classList.add("info-resize"),m.classList.add("hide"),r.innerHTML=`
            <div class="suggestions">
                <span>Precios de sus agentes</span>
                <span>Formas de contacto</span>
                <span>\xbfEn qu\xe9 canales funciona?</span>
                <span>Quiero probar sus agentes</span>
            </div>
        `,c.classList.add("show")),h=i.value,document.querySelectorAll(".suggestions span").forEach(e=>{e.addEventListener("click",e=>{b(e.target.textContent)})})}),document.querySelector(".send-btn").addEventListener("click",()=>{b()}),document.querySelector(".close-btn").addEventListener("click",L),document.querySelector(".chatbot-footer input").addEventListener("keydown",e=>{"Enter"===e.key&&b()})})();
//# sourceMappingURL=bundle.js.map