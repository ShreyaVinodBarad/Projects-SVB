const title = document.getElementById("title");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const category = document.getElementById("category");
const note = document.getElementById("note");

const incomeData = document.getElementById("incomeData");
const expenseData = document.getElementById("expenseData");
const balanceData = document.getElementById("balanceData");

const transport = document.getElementById("transport");
const rent = document.getElementById("rent");
const food = document.getElementById("food");

// localStorage.clear()
const accountData = JSON.parse(localStorage.getItem("BudgetTracker")) || [];

/*
const accountData = [
    { title: "Budget Tracker", amount: 45000, type: "Income", category: "Salary", note: "Microsoft Monthly Salary" },
    { title: "Cidco Home Rent", amount: 12000, type: "Expense", category: "Rent", note: "Rent of the Home" },
    { title: "Petrol", amount: 2500, type: "Expense", category: "Transport", note: "Car Petrol" },
    { title: "Petrol", amount: 500, type: "Expense", category: "Transport", note: "Bike Petrol" },
    { title: "Birthday Party", amount: 2180, type: "Expense", category: "Food", note: "Chinese Food" },
    { title: "Snacks", amount: 1080, type: "Expense", category: "Food", note: "Evening Snacks" }
];
*/

const handleAdd = () => {
    /*
    console.log(title.value, amount.value, type.value, category.value, note.value);
    */
    accountData.splice(0, 0, {
        title: title.value,
        amount: +amount.value,
        type: type.value,
        category: category.value,
        note: note.value
    });
    // console.log(accountData);

    localStorage.setItem("BudgetTracker", JSON.stringify(accountData));

    resetInput();
    displayDataInTable();
};

const displayDataInTable = (arg, cate) => {
    let str = "";
    let id = 1;
    const filteredData = accountData
        .filter(item => arg ? item.type === arg : item)
        .filter(item => cate ? item.category === cate : item);
    // 👆 First filter => form-switch & second filter => form-select
    for (const item of filteredData) {
        str += `<tr class = "${item.type === "Expense" && "table-danger"}">
                    <td> ${id}</td >
                    <td>${item.title}</td>
                    <td class = "${item.type === "Income" && "table-success"}" > ${item.amount}</td > 
                    <td>${item.type}</td>
                    <td>${item.category}</td>
                    <td>${item.note}</td>
                </tr > `
        /*
        100 > 50 && "Hello" 
        👆
        true so after && there is no condition so "Hello" is printed!
        */
        id++;
    }
    document.getElementById("root").innerHTML = str;

    const totalIncome = accountData
        .filter(item => item.type === "Income")
        .reduce((sum, item) => sum + item.amount, 0);
    const totalExpense = accountData
        .filter(item => item.type === "Expense")
        .reduce((sum, item) => sum + item.amount, 0);
    const balanceAmount = totalIncome - totalExpense;

    incomeData.innerHTML = "&#8377; " + totalIncome;
    expenseData.innerHTML = "&#8377; " + totalExpense;
    balanceData.innerHTML = "&#8377; " + balanceAmount;

    const totalTransportCost = (accountData
        .filter(item => item.category === "Transport")
        .reduce((sum, item) => sum + item.amount, 0) / totalExpense * 100) || 0;
    const totalRentCost = (accountData
        .filter(item => item.category === "Rent")
        .reduce((sum, item) => sum + item.amount, 0) / totalExpense * 100) || 0;
    const totalFoodCost = (accountData
        .filter(item => item.category === "Food")
        .reduce((sum, item) => sum + item.amount, 0) / totalExpense * 100) || 0;

    transport.style.width = `${(Number(totalTransportCost).toFixed(2))}%`;
    rent.style.width = `${(Number(totalRentCost).toFixed(2))}%`;
    food.style.width = `${(Number(totalFoodCost).toFixed(2))}%`;

    transport.innerHTML = `Transport ${(Number(totalTransportCost).toFixed(2))}%`
    rent.innerHTML = `Rent ${(Number(totalRentCost).toFixed(2))}%`
    food.innerHTML = `Food ${(Number(totalFoodCost).toFixed(2))}%`
}
const handleFilter = (arg, e) => {
    // console.log(arg);
    // console.log(e);  => It's an Object
    // console.log(e.target); => Give complete select Data
    if (e) {
        displayDataInTable(null, e.target.value);
        // Give value of the selected option like: food, rent, etc => form-select
    }
    else {
        displayDataInTable(arg, null);
        // arg => Income and Expense => form-switch
    }
}

const resetInput = () => {
    for (const item of [title, amount, type, category, note]) {
        item.value = "";
    }
}
displayDataInTable();