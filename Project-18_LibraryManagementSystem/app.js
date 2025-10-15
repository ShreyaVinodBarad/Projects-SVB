import { validate } from "./utility.js"
const title = document.getElementById("title")
const author = document.getElementById("author")
const stock = document.getElementById("stock")
const image = document.getElementById("image")
const media = document.getElementById("media")
const addItemBtn = document.getElementById("addItemBtn")
const URL = "http://localhost:5000/items"
const root = document.getElementById("root")
let selectedIdToEdit
const productLimit = document.getElementById("productLimit")
/*
👆
selectedIdToEdit is used to remember which product you are editing.
selectedIdToEdit tells the code “this is the product I’m updating” so it updates the right one in the database.
*/
const updateItemBtn = document.getElementById("updateItemBtn")
const cancleUpdateBtn = document.getElementById("cancleUpdateBtn")

// Add Item Button Functionality 👇
addItemBtn.addEventListener("click", () => {
    // console.log(media.value)
    if (validate(title, author, stock, image, media)) {
        createItem()
        readItem()
        reset()
    }
    else {
        console.log("All Fields are Required...")
    }
})

// Function to Create Item 👇
const createItem = async () => {
    try {
        const itemData = {
            title: title.value,
            author: author.value,
            stock: stock.value,
            image: image.value,
            media: media.value
        }
        await fetch(URL, {
            method: "POST",
            body: JSON.stringify(itemData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log("Item Created Successfully!")
    }
    catch (error) {
        console.log(error)
    }
}

// Function to Read Item 👇
const readItem = async (limit = 2, page = 1) => {
    try {
        const res = await fetch(`${URL}/?_limit=${limit}&_page=${page}`, { method: "GET" })
        /*
        👆
        - This is a template string that builds the URL dynamically.
        - URL = "http://localhost:5000/items" → your backend endpoint for products.
        - ?_limit=${limit}&_page=${page} → query parameters that control pagination:
        a) _limit=${limit} → tells the server how many items per page.
        b) _page=${page} → tells the server which page of items to fetch.
        */
        const data = await res.json()
        console.log(data)
        const loopThroughArr = data.map(item =>
            `
            <tr>
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td>${item.author}</td>
                <td>${item.image}</td>
                <td>${item.media}</td>
                <td>${item.stock}</td>
                <td>Available</td>
                <td class = "d-flex justify-content-center align-items-center flex-column gap-2">
                    <button type="button" class="btn btn-warning" onclick="handleEdit('${item.title}', '${item.author}','${item.image}', '${item.media}', '${item.stock}','${item.id}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button type="button" class="btn btn-danger" onclick = "deleteItem(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
            `
        ).join("")

        const totalRecord = res.headers.get("X-Total-Count") // 👉 Total Records
        /*
        👆
        - Every time we fetch products with a limit (?_limit=2&_page=1), the server sends the total number of products in a header called "X-Total-Count".
        - Example: If there are 10 products in total, totalRecord will be 10.
        */
        const totalBtn = totalRecord / limit
        /*
        👆
        - limit = how many products we show per page (example: 2).
        - Divide total products by products per page to find out how many pages we need.
        - Example: 10 / 2 = 5 → we need 5 pages.
        */
        console.log("Total Record: ", totalRecord)
        console.log("Total Button: ", totalBtn)

        root.innerHTML = loopThroughArr
    }
    catch (error) {
        console.log(error)
    }
}

// handleEdit() => Function over Edit Icon placed inside Table 👇
window.handleEdit = (eTitle, eAuthor, eImage, eMedia, eStock, eId) => {
    selectedIdToEdit = eId
    title.value = eTitle
    author.value = eAuthor
    stock.value = eStock
    image.value = eImage
    media.value = eMedia

    // Adding and Removing class "d-none" so Add Item button get removed and Edit button get added + Same with Cancle Button 👇
    addItemBtn.classList.add("d-none")
    updateItemBtn.classList.remove("d-none")
    cancleUpdateBtn.classList.remove("d-none")
}
/*
👆
The handleEdit() function is used when you click the edit (✏️) button in the table.
- It does three main things:
a) Fills the form with that item’s details — so you can see and change them.
b) Remembers the item’s ID (using selectedIdToEdit) — so the right item gets updated later.
c) Hides the “Add Item” button and shows the “Update” button — switching the form into “edit mode.”
*/

// Code for the Update Button with Id - updateItemBtn 👇
updateItemBtn.addEventListener("click", async () => {
    try {
        const body = {
            title: title.value,
            author: author.value,
            stock: stock.value,
            image: image.value,
            media: media.value
        }
        await fetch(`${URL}/${selectedIdToEdit}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        readItem()
        reset()
        addItemBtn.classList.remove("d-none")
        updateItemBtn.classList.add("d-none")
        cancleUpdateBtn.classList.add("d-none")
    }
    catch (error) {
        console.log(error)
    }
})

// When Cancle Update Item button is clicked the form update button will disappered and add item button will appear + form will reset so other item can be added 👇
cancleUpdateBtn.addEventListener("click", () => {
    reset()
    addItemBtn.classList.remove("d-none")
    updateItemBtn.classList.add("d-none")
    cancleUpdateBtn.classList.add("d-none")
})

// reset() => Reset the form 👇
const reset = () => {
    for (const item of [title, author, stock, image, media]) {
        item.value = ""
        item.classList.remove("is-valid")
        /*
        👆
        a) item.classList.remove("is-valid") (used in reset()) is to clear that green success style when resetting the form — so that when you start typing new data, it looks like a brand-new empty form again.
        b) item.classList.remove("is-valid") is used to remove the green tick mark (✔️) and the green border that appear when a field is marked as valid.
        */
    }
}

// Delete functionality - Works when delete icon is clicked on table 👇
window.deleteItem = async id => {
    try {
        await fetch(`${URL}/${id}`, { method: "DELETE" })
        console.log("Item Deleted Successfully!")
        readItem()
    }
    catch (error) {
        console.log(error)
    }
}

// Function which gives the value that is selected from the dropdown which defines how many products per page 👇
productLimit.addEventListener("change", () => {
    /*
    👆
    - productLimit is a dropdown where the user can select how many products to show per page.
    - "change" is an event that triggers when the user selects a new value.
    - addEventListener("change", ...0) → run the code inside the function whenever the value changes.
    */
    readItem(productLimit.value)
    /*
    👆
    - productLimit.value = the new number of products per page selected by the user.
    - readItem(limit) → reloads the products with the new limit.
    - This allows dynamic pagination: the page shows more or fewer products immediately when the user changes the limit.
    */
})
// 👆 Whenever the user changes the number of products per page, this code fetches and shows products according to the new limit. 

// Calling readItem() so data, can be displayed directly 👇
readItem()