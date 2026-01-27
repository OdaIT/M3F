import { User } from "../models/userClass";

export const users: User[] = [];

export function createUserService(name: string, email: string): string | null {
  validateEmail(email);

  if (!validateEmail(email)) return "Email invalid";
  if (!name || !email) return "Name and email are required";
  if (users.some(u => u.email === email)) return "Email already exists";

  users.push({ name, email, status: "active", tasks: [] });
  return null;
}

export function validateEmail(email_: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email_);

export function toggleUserStatus(user: User) {
  user.status = user.status === "active" ? "inactive" : "active";
}

export function deleteUser(user: User) {
  const index = users.indexOf(user);
  if (index !== -1) users.splice(index, 1);
}
