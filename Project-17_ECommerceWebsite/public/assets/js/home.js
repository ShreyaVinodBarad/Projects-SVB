import { addToast } from "./utils.js"

const home = document.getElementById("home")
const count = document.getElementById("count")
// const URL = "http://localhost:5000"
const URL = "https://skillhub-svb.onrender.com"
const productLimit = document.getElementById("productLimit")
const pagination = document.getElementById("pagination")

const getAllProducts = async (limit = 2, page = 1) => {
    try {
        const res = await fetch(`${URL}/products/?_limit=${limit}&_page=${page}`, { method: "GET" })
        const data = await res.json()

        const totalRecord = res.headers.get("X-Total-Count") // 👉 total entries
        const totalBtn = Math.ceil(totalRecord / limit)

        pagination.innerHTML = ""

        // 👈 Previous Button
        if (page > 1) {
            pagination.innerHTML += `<button class="btn btn-primary" onclick="handlePagination(${page - 1})">Previous</button>`
        }

        // 👈 Page Buttons
        for (let i = 1; i <= totalBtn; i++) {
            if (page === i) {
                pagination.innerHTML += `<button class="btn btn-primary">${i}</button>`
            } else {
                pagination.innerHTML += `<button class="btn btn-outline-primary" onclick="handlePagination(${i})">${i}</button>`
            }
        }

        // 👈 Next Button
        if (page < totalBtn) {
            pagination.innerHTML += `<button class="btn btn-primary" onclick="handlePagination(${page + 1})">Next</button>`
        }

        // 👇 Display Products
        home.innerHTML = data.map(item => `
            <div class="col-sm-4 my-3">
                <div class="card">
                    <div class="card-body d-flex flex-column flex-grow-1" style = "height:480px">
                        <img src="${item.image}" alt="" style="width:100%; height:150px; object-fit:contain; background-color:#f5f5f5;">
                        <div class="alert alert-success my-3" style = "height:420px">
                            <h5 class="text-center">${item.name}</h5>
                            <h5 class="text-center">Item Id: ${item.id}</h5>
                            <div class="text-center">Price: Rs. ${item.price}</div>
                            <div class="text-center">${item.description}</div>
                        </div>
                        <button type="button" onclick="handleAddToCart('${item.id}','${item.name}','${item.price}','${item.description}','${item.image}')" class="btn btn-primary w-100 mt-auto">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join("")
    }
    catch (error) {
        console.log(error)
    }
}

window.handleAddToCart = async (id, name, price, description, image) => {
    try {
        const cartData = { pid: id, name, price, description, image }
        await fetch(`${URL}/cart`, {
            method: "POST",
            body: JSON.stringify(cartData),
            headers: { "Content-type": "application/json" }
        })
        displayCart()
        console.log("Add to Cart Successfully!")
        addToast("Item Added to Cart!", "success")
    }
    catch (error) {

    }
}

const displayCart = async () => {
    try {
        const res = await fetch(`${URL}/cart`)
        const data = await res.json()
        count.innerHTML = data.length

        if (data.length === 0) {
            return document.querySelector("#cart>.offcanvas-body").innerHTML = `  <div class="alert alert-success text-center"><h4>Cart is Empty!<h4/></div>  `
        }

        const total = data.reduce((sum, item) => sum + +item.price, 0)
        console.log(total)
        const gst = total * 18 / 100
        const bill = gst + total
        console.log(gst)
        console.log(bill)
        document.querySelector("#cart>.offcanvas-body").innerHTML = data.map(item => `
            <div class="card my-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-4">
                            <img src="${item.image}" alt="" style = "width:100%; height:150px; object-fit:contain;background-color: #f5f5f5;">
                        </div>
                        <div class="col-sm-8 text-center d-flex justify-content-center align-items-center flex-column alert alert-success mb-0">
                            <h5>${item.name}</h5>
                            <h6>Price: ${item.price} Rs.</h6>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-sm-12">
                            <button type="button"                           onclick = "handleDeleteFromCart('${item.id}')" class="btn btn-danger w-100">
                                Remove Item
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join("")
        document.querySelector("#cart>.offcanvas-body").innerHTML += `
        <div class="card mt-3">
            <div class="card-header alert alert-success text-center mb-0"><h3>Total Bill<h3/></div>
            <div class="card-body alert alert-warning mb-0">
                <div class="d-flex justify-content-between">
                    <span>Total</span>
                    <strong>${total}</strong>
                </div>
                <div class="d-flex justify-content-between">
                    <span>Tax</span>
                    <strong>${gst}</strong>
                </div>
                <hr/>
                <div class="d-flex justify-content-between">
                    <span>Bill</span>
                    <strong>${bill}</strong>
                </div>
            </div>
        </div>
        `
    }
    catch (error) {
        console.log(error)
    }
}

window.handleDeleteFromCart = (async id => {
    try {
        await fetch(`${URL}/cart/${id}`, { method: "DELETE" })
        console.log("Product Removed Successfully from the Cart!")
        displayCart()
        addToast("Item Removed from Cart Successfully!", "danger")
    }
    catch (error) {
        console.log(error)
    }
})

productLimit.addEventListener("change", () => {
    // 👆When change of value the change event runs
    getAllProducts(productLimit.value)
})

window.handlePagination = (index) => {
    getAllProducts(productLimit.value, index)
}

getAllProducts()
displayCart()