const CONFIG={
  discord:"https://discord.gg/uJvjg8PWAp",
  store:"https://bloodlinerust.tebex.store",
  wipeDate:"2026-08-20T18:00:00",
  ips:["135.148.15.176:20002","135.148.172.229:28560"]
};
document.querySelectorAll("[data-ip]").forEach(btn=>btn.addEventListener("click",()=>{
  const ip=btn.dataset.ip;navigator.clipboard.writeText(ip).then(()=>toast("COPIED "+ip));
}));
document.querySelectorAll(".connect").forEach(btn=>btn.addEventListener("click",()=>{
  location.href="steam://connect/"+btn.dataset.ip;
}));
document.querySelectorAll('a[href="https://discord.gg/"]').forEach(a=>a.href=CONFIG.discord);
function toast(t){const x=document.getElementById("toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1800)}
function tick(){const d=Math.max(0,new Date(CONFIG.wipeDate)-Date.now());document.getElementById("d").textContent=String(Math.floor(d/864e5)).padStart(2,"0");document.getElementById("h").textContent=String(d/36e5%24|0).padStart(2,"0");document.getElementById("m").textContent=String(d/6e4%60|0).padStart(2,"0");document.getElementById("s").textContent=String(d/1e3%60|0).padStart(2,"0");document.getElementById("wipeText").textContent=d?"Next wipe: "+new Date(CONFIG.wipeDate).toLocaleString():"WIPE IS LIVE — GOOD LUCK";}tick();setInterval(tick,1000);
