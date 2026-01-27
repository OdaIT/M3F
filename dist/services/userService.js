export const users = [];
export function createUserService(name, email) {
    function validateEmail(email_) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email_);
    }
    if (!validateEmail(email))
        return "Email invalid";
    if (!name || !email)
        return "Name and email are required";
    if (users.some(u => u.email === email))
        return "Email already exists";
    users.push({ name, email, status: "active", tasks: [] });
    return null;
}
export function toggleUserStatus(user) {
    user.status = user.status === "active" ? "inactive" : "active";
}
export function deleteUser(user) {
    const index = users.indexOf(user);
    if (index !== -1)
        users.splice(index, 1);
}
