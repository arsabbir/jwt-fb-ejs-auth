const closeBtn = document.querySelector(".closeBtn");
const openModal = document.querySelector(".openModal");
// const userSign = document.getElementById("userSign");

// modal close

if (closeBtn) {
  closeBtn.onclick = () => {
    window.location.href = "/login";
  };
}

// modal open

if (openModal) {
  openModal.onclick = () => {
    window.location.href = "/signUp";
  };
}