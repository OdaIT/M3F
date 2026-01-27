import { createUserService } from "./services/index.js";
import { userStatus } from "./ui/index.js";
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const createUserBtn = document.getElementById("createUserBtn");
const errorMsg = document.getElementById("error");
const modalOverlay = document.getElementById("modalOverlay");
const confirmYesBtn = document.getElementById("confirmYes");
const confirmNoBtn = document.getElementById("confirmNo");
let pendingUser = null;
let pendingTaskText = "";
createUserBtn.onclick = () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    errorMsg.textContent = "";
    const error = createUserService(name, email);
    if (error) {
        errorMsg.textContent = error;
        return;
    }
    nameInput.value = "";
    emailInput.value = "";
    userStatus();
};
confirmYesBtn.onclick = () => {
    if (pendingUser && pendingTaskText) {
        pendingUser.tasks.push({ text: pendingTaskText, completed: false });
    }
    closeModal();
    userStatus();
};
confirmNoBtn.onclick = closeModal;
function closeModal() {
    pendingUser = null;
    pendingTaskText = "";
    modalOverlay.classList.add("hidden");
}
