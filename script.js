const CONFIG={
  discord:"https://discord.gg/uJvjg8PWAp",
  store:"https://bloodlinerust.tebex.store",
  wipeDate:"2026-08-20T18:00:00",
  ips:["135.148.15.176:20002","135.148.172.229:28560"]
};

const toastEl=document.getElementById("toast");
function toast(message){toastEl.textContent=message;toastEl.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>toastEl.classList.remove("show"),1800)}

// Keep every placeholder Discord/store link in sync with CONFIG.
document.querySelectorAll('a[href="https://discord.gg/"]').forEach(a=>a.href=CONFIG.discord);
document.querySelectorAll('a[href*="bloodlinerust.tebex.store"]').forEach(a=>a.href=CONFIG.store);

// Copy server IPs.
document.querySelectorAll("[data-ip]").forEach(btn=>btn.addEventListener("click",async()=>{
  const ip=btn.dataset.ip;
  try{await navigator.clipboard.writeText(ip);toast("COPIED "+ip)}catch{toast("IP: "+ip)}
}));

// Launch Rust's Steam connect protocol.
document.querySelectorAll(".connect").forEach(btn=>btn.addEventListener("click",()=>{window.location.href="steam://connect/"+btn.dataset.ip}));

function tick(){
  const distance=new Date(CONFIG.wipeDate).getTime()-Date.now();
  const d=Math.max(0,distance);
  const days=Math.floor(d/864e5),hours=Math.floor(d/36e5)%24,mins=Math.floor(d/6e4)%60,secs=Math.floor(d/1e3)%60;
  document.getElementById("d").textContent=String(days).padStart(2,"0");
  document.getElementById("h").textContent=String(hours).padStart(2,"0");
  document.getElementById("m").textContent=String(mins).padStart(2,"0");
  document.getElementById("s").textContent=String(secs).padStart(2,"0");
  document.getElementById("wipeText").textContent=distance>0?"Next wipe: "+new Date(CONFIG.wipeDate).toLocaleString():"WIPE IS LIVE — GOOD LUCK";
}
tick();setInterval(tick,1000);

// Smooth reveal animations as sections enter the viewport.
const revealTargets=document.querySelectorAll(".section,.wipe,.final,.server-card,.feature-grid>div,.rule-grid>div,.faq-list");
revealTargets.forEach(el=>el.classList.add("reveal"));
if("IntersectionObserver" in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.08});
 revealTargets.forEach(el=>observer.observe(el));
}else revealTargets.forEach(el=>el.classList.add("visible"));

// Subtle cursor glow on desktop.
if(window.matchMedia("(pointer:fine)").matches){
 const glow=document.createElement("div");
 glow.style.cssText="position:fixed;width:280px;height:280px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(229,27,35,.07),transparent 65%);transform:translate(-50%,-50%);transition:left .12s,top .12s";
 document.body.appendChild(glow);
 window.addEventListener("mousemove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});
}
