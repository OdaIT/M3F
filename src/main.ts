import { createUserService } from "./services/index.js";
import { userStatus } from "./ui/index.js";

const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const emailInput = document.getElementById("emailInput") as HTMLInputElement;
const createUserBtn = document.getElementById("createUserBtn") as HTMLButtonElement;
const errorMsg = document.getElementById("error") as HTMLParagraphElement;

const modalOverlay = document.getElementById("modalOverlay") as HTMLDivElement;
const confirmYesBtn = document.getElementById("confirmYes") as HTMLButtonElement;
const confirmNoBtn = document.getElementById("confirmNo") as HTMLButtonElement;

let pendingUser: any = null;
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
