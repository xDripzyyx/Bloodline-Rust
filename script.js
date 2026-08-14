document.getElementById("year").textContent = new Date().getFullYear();
const toast = document.getElementById("toast");
document.querySelectorAll(".copy-btn").forEach(button => {
  button.addEventListener("click", async () => {
    const ip = button.dataset.ip;
    try { await navigator.clipboard.writeText(ip); }
    catch { /* fallback: still show the IP */ }
    toast.textContent = "Server IP copied!";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  });
});
