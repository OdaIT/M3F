import { createUserService } from "./services/index.js";
import { userStatus } from "./ui/index.js";
import { User } from "./models/userClass.js";
import { UserRole } from "./models/user.js";
import { SystemConfig } from "./services/SystemConfig.js";
import { SystemLogger } from "./logs/SystemLogger.js";
import { BusinessRules } from "./services/BusinessRules.js";
import { WatcherSystem } from "./utils/WatcherSystem.js";
import { RatingSystem } from "./utils/RatingSystem.js";
import { DependencyGraph } from "./utils/DependecyGraph.js";

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

User.createUser("Um", "um@um.um", "admin" as UserRole);
User.createUser("Dois", "dois@dois.dois", "user" as UserRole);
User.createUser("Tres", "tres@tres.tres", "user" as UserRole);
User.getIdByEmail("um@um.um")
SystemConfig.getInfo();
SystemLogger.log("Application started");
SystemLogger.getLogs();
BusinessRules.canUserBeDeactivated(1);

const watcherSystem = new WatcherSystem();

watcherSystem.watch(1, "um@um.um");
watcherSystem.watch(1, "dois@dois.dois");
console.log(watcherSystem.getWatchers(1));

const ratingSystem = new RatingSystem();
ratingSystem.rate(1, 5);
ratingSystem.rate(1, 3);
console.log(ratingSystem.getAverage(1));

const depGraph = new DependencyGraph();
depGraph.addDependency(2, 1);
depGraph.addDependency(3, 2);
console.log(depGraph.getDependencies(2));