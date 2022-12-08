export default interface User {
    name: String,
    email: String,
    photo: String,
    role: String,
    password: String,
    passwordConfirm: String,
    passwordChangeAt: Date,
    active: Boolean
};