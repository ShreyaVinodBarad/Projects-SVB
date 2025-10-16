import { validate, addToast } from "./utils.js"

const name = document.getElementById("name")
const price = document.getElementById("price")
const description = document.getElementById("description")
const image = document.getElementById("image")
const category = document.getElementById("category")
const addProduct = document.getElementById("addProduct")
// const URL = "http://localhost:5000/products"
const URL = "https://skillhub-svb.onrender.com/products"
const root = document.getElementById("root")
const updateProductBtn = document.getElementById("editProductBtn")
let selectedIdToEdit
const productLimit = document.getElementById("productLimit")
const pagination = document.getElementById("pagination")
const cancleUpdateProductBtn = document.getElementById("cancleUpdateProductBtn")

addProduct.addEventListener("click", () => {
    if (validate(name, price, description, image, category)) {
        // console.log(name.value, price.value, description.value, image.value, category.value)
        createProduct()
        readProduct()
        reset()
    }
    else {
        console.log("All fields are required!")
    }
})

const createProduct = async () => {
    try {
        const productData = {
            name: name.value,
            price: price.value,
            description: description.value,
            image: image.value,
            category: category.value
        }
        await fetch(URL, {
            method: "POST",
            body: JSON.stringify(productData),
            headers: {
                "Content-Type": "application/json"
            } // 👈 For Backend
        })
        console.log("Product Created Successfully!")
        addToast("Product Created Successfully!", "success")
    } catch (error) {
        console.log(error)
    }
}
const readProduct = async (limit = 2, page = 1) => {
    try {
        // const res = await fetch(URL, { method: "GET" })
        const res = await fetch(`${URL}/?_limit=${limit}&_page=${page}`, { method: "GET" })
        // limit => No. of items on page , page => Page on which limit should be there
        // 👆 Code for Pagination
        // After question mark ? in URL is known as Query String
        const result = await res.json()
        console.log(result)
        const x = result.map(item =>
            `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.description}</td>
                <td><img src="${item.image}" style="width:100px;height:100px;object-fit:contain;border-radius:4px;background-color: #f5f5f5;"/></td>
                <td>${item.category}</td>
                <td class="d-flex justify-content-center align-items-center gap-2">
                    <button type="button" class="btn btn-warning" id="editProduct" onclick = "handleEdit('${item.name}', '${item.price}','${item.description}','${item.image}','${item.category}','${item.id}')"><i class="bi bi-pencil"></i></button>
                    <button type="button" class="btn btn-danger" id="deleteProduct" onclick = "deleteProduct(${item.id})"><i class="bi bi-trash"></i></button>
                    </td>
                    </tr>
                    `
        ).join("")

        const totalRecord = res.headers.get("X-Total-Count")
        const totalBtn = totalRecord / limit
        console.log("Total Record: ", totalRecord)
        console.log("Total Button", Math.ceil(totalBtn))
        pagination.innerHTML = ""
        if (page > 1) {
            pagination.innerHTML = `<button class= "btn btn-primary" onclick ="handleButtonClick(${page - 1})">Previous</button>`
        }
        for (let i = 1; i <= Math.ceil(totalBtn); i++) {
            pagination.innerHTML += `
            <button class="btn btn-outline-primary" onclick ="handleButtonClick(${i})">
            ${i}
            </button>
            `
        }
        if (page < Math.ceil(totalBtn)) {
            pagination.innerHTML += `<button class= "btn btn-primary" onclick ="handleButtonClick(${page + 1})")>Next</button>`
        }

        // console.log(x)
        root.innerHTML = x
    } catch (error) {
        console.log(error)
    }
}

window.handleEdit = (eName, ePrice, eDescription, eImage, eCategory, eId) => {
    selectedIdToEdit = eId
    name.value = eName
    price.value = ePrice
    description.value = eDescription
    image.value = eImage
    category.value = eCategory

    addProduct.classList.add("d-none")
    updateProductBtn.classList.remove("d-none")
    cancleUpdateProductBtn.classList.remove("d-none")
}

updateProductBtn.addEventListener("click", async () => {
    try {
        const body = {
            name: name.value,
            price: price.value,
            description: description.value,
            image: image.value,
            category: category.value
        }
        await fetch(`${URL}/${selectedIdToEdit}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        readProduct()
        reset()
        addProduct.classList.remove("d-none")
        updateProductBtn.classList.add("d-none")
        cancleUpdateProductBtn.classList.add("d-none")
        addToast("Product Details Updated Successfully!", "success")


    } catch (error) {
        console.log(error)
    }
})

cancleUpdateProductBtn.addEventListener("click", () => {
    reset()
    cancleUpdateProductBtn.classList.add("d-none")
    addProduct.classList.remove("d-none")
    updateProductBtn.classList.add("d-none")
})

window.deleteProduct = async id => {
    // 👆 Goes to global scope because problem when using module
    try {
        await fetch(`${URL}/${id}`, { method: "DELETE" })
        console.log("Produt Deleted Successfully!")
        readProduct()
        addToast("Product Deleted Successfully!", "danger")
    } catch (error) {
        console.log(error)
    }
}

const reset = () => {
    // name.value = ""
    // price.value = ""
    // description.value = ""
    // image.value = ""
    // category.value = ""

    // name.classList.remove("is-valid", "is-invalid")
    // price.classList.remove("is-valid", "is-invalid")
    // description.classList.remove("is-valid", "is-invalid")
    // image.classList.remove("is-valid", "is-invalid")
    // category.classList.remove("is-valid", "is-invalid")

    for (const item of [name, price, description, image, category]) {
        item.value = ""
        item.classList.remove("is-valid")
    }
}

productLimit.addEventListener("change", () => {
    // 👆When change of value the change event runs
    readProduct(productLimit.value)
})

window.handleButtonClick = index => {
    readProduct(productLimit.value, index)
}

readProduct()
/*
            Method          Body            Id
Create      POST            Yes             No
Read        GET             No              No
Update      PUT/PATCH       Yes             Yes
Delete      DELETE          No              Yes
*/

