export const validate = (...elements) => {
    let isValid = true // Used to check if anyone field of the field is empty than return isValid false and if not than return isValid as true
    for (const item of elements) {
        if (item.value === "") {
            item.classList.remove("is-valid")
            item.classList.add("is-invalid")
            isValid = false
        } // If does not goes in if than isValid will be true, but goes in than isValid will be false and return false
        else {
            item.classList.remove("is-invalid")
            item.classList.add("is-valid")
        }
    }
    return isValid
}

export const addToast = (message, varient) => {
    const toastContainer = document.getElementById("toast-container")
    toastContainer.innerHTML = `
    <div class = "alert alert-${varient} my-2 text-center">
        <h4>
            ${message}
        </h4>
    </div>   
    `
    setTimeout(() => {
        toastContainer.innerHTML = ""
    }, 3000)
}