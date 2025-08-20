const passwordInp = document.getElementById("password");
const length = 12;
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "@#$%^&*()_+~|{}[]></-=";
const allChars = upperCase + lowerCase + number + symbol;
const generatePassword = () => {
    let password = ""; // Starts with an empty password.
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    /*
    1) Math.random()
    - Returns a random number between 0 (inclusive) and 1 (exclusive).
    Example → 0.53.
    2) Math.random() * upperCase.length
    - upperCase.length is 26 (because there are 26 uppercase letters).
    - So → 0.53 * 26 = 13.78.
    3) Math.floor(...)
    - Rounds down to the nearest whole number.
    - Example → Math.floor(13.78) = 13.
    upperCase[13]
    - Picks the character at index 13 in "ABCDEFGHIJKLMNOPQRSTUVWXYZ".
    - That would be "N" (since indexes start from 0).
    4) password += ...
    - Adds that random character to the password string.
    */
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];
    // 👆 Ensures the password always includes at least one uppercase, lowercase, number, and symbol.
    while (password.length < length) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    // 👆 Keeps adding random characters from allChars until the password length reaches 12.
    passwordInp.value = password;
    // 👆 Finally, puts the generated password inside the input field with ID "password".
}
const passwordCopy = () => {
    navigator.clipboard.writeText(passwordInp.value);
}