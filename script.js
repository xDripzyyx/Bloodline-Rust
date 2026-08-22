const CONFIG={
  discord:"https://discord.gg/uJvjg8PWAp",
  store:"https://bloodline-rust.paynow.store/",
  wipeTime:"14:00:00",
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
function getFirstThursday(year,month){
  const d=new Date(year,month,1,14,0,0);
  d.setDate(1+((4-d.getDay()+7)%7));
  return d;
}
function getNextWipe(){
  const now=new Date();
  let wipe=getFirstThursday(now.getFullYear(),now.getMonth());
  if(wipe<=now) wipe=getFirstThursday(now.getFullYear(),now.getMonth()+1);
  return wipe;
}
function tick(){
  const wipe=getNextWipe();
  const d=Math.max(0,wipe-Date.now());
  document.getElementById("d").textContent=String(Math.floor(d/864e5)).padStart(2,"0");
  document.getElementById("h").textContent=String(d/36e5%24|0).padStart(2,"0");
  document.getElementById("m").textContent=String(d/6e4%60|0).padStart(2,"0");
  document.getElementById("s").textContent=String(d/1e3%60|0).padStart(2,"0");
  document.getElementById("wipeText").textContent="Next wipe: "+wipe.toLocaleString();
}
tick();setInterval(tick,1000);
