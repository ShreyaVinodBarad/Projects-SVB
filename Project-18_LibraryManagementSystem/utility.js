export const validate = (...elements) => {
    let isvalid = true
    for (const item of elements) {
        if (item.value === "") {
            item.classList.remove("is-valid")
            item.classList.add("is-invalid")
            isvalid = false
        }
        else {
            item.classList.remove("is-invalid")
            item.classList.add("is-valid")
        }
    }
    return isvalid
}