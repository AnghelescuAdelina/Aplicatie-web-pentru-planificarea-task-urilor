const form =document.getElementById("form");
const firstnameInput = document.getElementById("firstname-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const numberInput = document.getElementById("number-input");
const errorMessage= document.getElementById("error-message");
form.addEventListener("submit", (e) => {
    const errors = getLogInError(firstnameInput, emailInput, passwordInput, numberInput);
    errors = getLogInError(firstnameInput, emailInput, passwordInput, numberInput); 

if(errors.length > 0) {
    e.preventDefault();
    errorMessage.innerText = error.join(". ");
}
});
function getLogInError(firstnameInput, emailInput, passwordInput, numberInput) {
    const errors =[];
    if(firstnameInput.value === "" || firstnameInput.value === null) {
        errors.push("First name is required");
        firstnameInput.parentElement.classList.add("errors");
    }

    if(emailInput.value === "" || emailInput.value === null) {
           
        errors.push("Email is required");
        emailInput.parentElement.classList.add("errors");
    }    
    //e.preventDefault();
    if(passwordInput.value === "" || passwordInput.value === null) {
        errors.push("Password is required");
        passwordInput.parentElement.classList.add("errors");
    }    

    if(numberInput.value === "" || numberInput.value === null) {
        errors.push("User type is required");
        numberInput.parentElement.classList.add("errors"); 
    }    
        
  return errors;
}

const allInputs = [firstnameInput, emailInput, passwordInput, numberInput]; 

allInputs.forEach((input) => {
input.addEventListener("input", () => {
    if(input.parentElement.classList.contains("errors")) {
        input.parentElement.classList.remove("errors");
        errorMessage.innerText = "";
    }
});
});
