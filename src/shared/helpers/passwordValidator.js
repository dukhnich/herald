const passwordValidator = function (password) {
    if (!password) {
        return ""
    }
    const lowerAlphabet = "abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    const upperAlphabet = lowerAlphabet.toUpperCase();
    let isUpperCaseinPassword = false;
    let isLowerCaseinPassword = false;
    let isNumberinPassword = false;
    for (let i = 0; i < password.length; i++) {
        if (!isUpperCaseinPassword && upperAlphabet.includes(password[i])) {
            isUpperCaseinPassword = true;
        }
        if (!isLowerCaseinPassword && lowerAlphabet.includes(password[i])) {
            isLowerCaseinPassword = true;
        }
        if (!isNumberinPassword && !isNaN(+password[i])) {
            isNumberinPassword = true;
        }
    }
    return  (isUpperCaseinPassword && isLowerCaseinPassword && isNumberinPassword) ? true : 'The password must include a number, a lowercase and an uppercase symbols. '
}

export default passwordValidator