(()=>{var e={},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.rv=()=>"1.2.7",n.ruid="bundler=rspack@1.2.7";let o=document.querySelector(".chatbot-container"),a=document.querySelector(".chatbot-toggle-btn"),s=document.querySelector(".chatbot-toggle-icon"),r=document.querySelector(".chatbot-body"),c=document.querySelector(".chatbot-footer");document.querySelector(".chatbot-close-btn img");let i=document.querySelector(".info-request"),d=document.querySelector(".name"),l=document.querySelector(".surname"),u=document.querySelector(".continue"),p=document.querySelector(".start"),g=document.querySelector(".chat-robot"),m=document.querySelector(".info-request"),y="",h="",v="";function L(){o.classList.toggle("show"),s.classList.toggle("resize")}function b(){document.getElementById("country-code-dropdown").classList.toggle("block")}async function f(e){let t=document.getElementById("userInput"),n=e||t.value.trim();if(""!==n){let e=document.querySelector(".suggestions");g.classList.add("hide"),m.classList.add("hide"),e.classList.add("hide");let o=document.createElement("div");o.classList.add("user-message-cont");let a=document.createElement("div");a.classList.add("user-message"),a.textContent=n,o.appendChild(a);let s=document.createElement("img");s.src="./Images/Frame.png",s.alt="user image",a.classList.add("message","user-message"),o.appendChild(s),r.appendChild(o);try{let e=await E(n,y,h,v);e&&setTimeout(()=>{let t=document.createElement("div");t.classList.add("bot-message-cont");let n=document.createElement("img");n.src="./Images/chat.png",n.alt="chatbot image",t.appendChild(n);let o=document.createElement("div");o.classList.add("bot-message"),o.textContent=e,t.appendChild(o),r.appendChild(t),r.scrollTop=r.scrollHeight},1e3)}catch(e){console.log("Error sending message:",e)}t.value=""}}async function E(e,t,n,o=""){let a="AIzaSyAmrbX783UEzM5A5uL-Xj5oL0VXIMinqFM";if(!a)throw Error("Missing Gemini API key!");let s=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${a}`,r=`
        Context: This is a landing page named AI Views that promotes intelligent agents trained to solve sales challenges. 
        The main feature of this page is offering solutions and services related to improving sales through the use of smart agents. 
        The page also includes a call to action for users to hire an agent.

        User Information:
        Name: ${t}
        Location: ${n}
        ${o?`Website: ${o}`:""}
    `,c=`${r}
User Question: ${e}`;try{let e=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:c}]}]})});if(!e.ok)throw console.log("API Error:",e.status,e.statusText),Error(`API Error: ${e.status} - ${e.statusText}`);let t=await e.json();return console.log("API Response:",t),t?.candidates?.[0]?.content?.parts?.[0]?.text||"No response received."}catch(e){return console.error("Error generating content:",e.message),"An error occurred while generating content."}}a.addEventListener("click",L),u.addEventListener("click",()=>{if(d.reportValidity()){y=d.value,i.textContent="Please provide your contact details";let e=document.createElement("div");e.classList.add("phone-cont"),e.innerHTML=`
            <div class="selector-cont">
                <div class="country-code-selector blue-circle"></div>
            </div>
            <input type="tel" class="phone contact" placeholder="Cell phone..." required />
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
        `,r.insertBefore(e,d),d.placeholder="Email...",d.type="email",d.value="",l.placeholder="Website (Optional)...",l.value="",u.classList.add("hide"),p.classList.add("block")}let e=document.querySelector(".country-code-selector"),t=document.querySelector(".phone");e.addEventListener("click",b);let n=(n,o)=>{e.classList.remove("blue-circle"),e.innerHTML=o.currentTarget.children[0].outerHTML,h=o.currentTarget.children[1].textContent,document.getElementById("country-code-dropdown").classList.remove("block"),t.value=n};document.querySelectorAll(".dropdown-item").forEach(e=>{e.addEventListener("click",e=>{n(e.currentTarget.getAttribute("data-country-code"),e)})}),t.addEventListener("input",t=>{""===t.target.value&&(e.classList.add("blue-circle"),e.innerHTML="")})}),p.addEventListener("click",()=>{document.querySelector(".phone").reportValidity()&&d.reportValidity()&&(i.innerHTML=`
            Let's start helping you
            <span>You can select an option or write a question below.</span>
        `,i.classList.add("info-resize"),p.classList.add("hide"),r.innerHTML=`
            <div class="suggestions">
                <span>What types of agents do you sell?</span>
                <span>Who owns the bot if I buy it?</span>
                <span>Is this bot GDPR compliant?</span>
                <span>I want to try your agents</span>
            </div>
        `,c.classList.add("show")),v=l.value,document.querySelectorAll(".suggestions span").forEach(e=>{e.addEventListener("click",e=>{f(e.target.textContent)})})}),document.querySelector(".send-btn").addEventListener("click",()=>{f()}),document.querySelector(".close-btn").addEventListener("click",L),document.querySelector(".chatbot-footer input").addEventListener("keydown",e=>{"Enter"===e.key&&f()})})();
//# sourceMappingURL=bundle.js.map