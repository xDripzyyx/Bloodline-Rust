document.querySelectorAll(".copy").forEach(btn=>{
  btn.addEventListener("click",async()=>{
    const ip=btn.dataset.ip;
    try{await navigator.clipboard.writeText(ip)}catch(e){
      const t=document.createElement("textarea");t.value=ip;document.body.appendChild(t);t.select();document.execCommand("copy");t.remove();
    }
    const toast=document.getElementById("toast");
    const old=btn.textContent;btn.textContent="COPIED!";
    toast.classList.add("show");
    setTimeout(()=>{btn.textContent=old;toast.classList.remove("show")},1200);
  });
});
