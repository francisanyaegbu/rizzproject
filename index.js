function toggleSideBar() {
    // e.preventDefault()
    const menuBar = document.querySelector(".menu-bar-display");
    if (menuBar.classList.contains("close")) {
        menuBar.classList.remove("close")
    } else {
        menuBar.classList.add("close")
    }
    document.getElementById("dropdown-content").classList.add("hide");
    document.getElementById("filter-dropdown-content").classList.add("hide");[]
}

function showLanguageOptions() {
    const showLangauage = document.getElementById("dropdown-content");
    if (showLangauage.classList.contains("hide")) {
        showLangauage.classList.remove("hide");
    }
    else {
        showLangauage.classList.add("hide");
    }
    document.getElementById("filter-dropdown-content").classList.add("hide");
}

function filterDisplay() {
    const filter = document.getElementById("filter-dropdown-content");
    if (filter.classList.contains("hide"))
        filter.classList.remove("hide");
    else {
        filter.classList.add("hide");
    }
    document.getElementById("dropdown-content").classList.add("hide");
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header-display").style.width = "98%";
    document.getElementById("header-display").style.marginLeft = "1%";
    document.getElementById("header-display").style.marginRight = "1%";
    document.getElementById("header-display").style.paddingTop = "25px";
    document.getElementById("header-display").style.borderBottomLeftRadius = "12px";
    document.getElementById("header-display").style.borderBottomRightRadius = "12px";
    document.getElementById("header-display").classList.add("header-display-s");
  } else {
    document.getElementById("header-display").style.width = "100%";
    document.getElementById("header-display").style.marginLeft = "0";
    document.getElementById("header-display").style.marginRight = "0";
    document.getElementById("header-display").style.paddingTop = "30px";
    document.getElementById("header-display").style.borderBottomLeftRadius = "0";
    document.getElementById("header-display").style.borderBottomRightRadius = "0";
    document.getElementById("header-display").style.marginInline = "auto";
    document.getElementById("header-display").classList.remove("header-display-s");
  }
}

function darkMode() {
    const bodyDark = document.querySelector("body");
    if (bodyDark.classList.contains("dark")) {
        bodyDark.classList.remove("dark");
        document.getElementById("theme").innerHTML = `<i class="icofont-sun"></i>`;
        document.getElementById("menu-bar-images").innerHTML =
            `<span><img src="images/logo-sm.png" alt=""></span>
            <img src="images/logo-dark.png" alt="">`;
        localStorage.setItem("theme", "light"); 
    } else {
        bodyDark.classList.add("dark");
        document.getElementById("theme").innerHTML = `<i class="ri-moon-fill"></i>`;
        document.getElementById("menu-bar-images").innerHTML =
            `<span><img src="images/logo-sm.png" alt=""></span>
            <img src="images/logo-light.png" alt="">`;
        localStorage.setItem("theme", "dark"); 
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        document.getElementById("theme").innerHTML = `<i class="ri-moon-fill"></i>`;
        document.getElementById("menu-bar-images").innerHTML =
            `<span><img src="images/logo-sm.png" alt=""></span>
            <img src="images/logo-light.png" alt="">`;
    } else {
        document.body.classList.remove("dark");
        document.getElementById("theme").innerHTML = `<i class="icofont-sun"></i>`;
        document.getElementById("menu-bar-images").innerHTML =
            `<span><img src="images/logo-sm.png" alt=""></span>
            <img src="images/logo-dark.png" alt="">`;
    }
});
function checkAll() {
    const mainCheckbox = document.getElementById("main-checkbox");
    const checks = document.querySelectorAll("#details-content tbody input[type=checkbox]");

    checks.forEach(cb => {
        cb.checked = mainCheckbox.checked;
    });

    mainCheckbox.indeterminate = false;
}

document.addEventListener("change", function(e) {
    if (e.target.matches("#details-content tbody input[type=checkbox]")) {
        const mainCheckbox = document.getElementById("main-checkbox");
        const checks = document.querySelectorAll("#details-content tbody input[type=checkbox]");
        const checkedCount = Array.from(checks).filter(cb => cb.checked).length;

        if (checkedCount === 0) {
            mainCheckbox.checked = false;
            mainCheckbox.indeterminate = false;
        } else if (checkedCount === checks.length) {
            mainCheckbox.checked = true;
            mainCheckbox.indeterminate = false;
        } else {
            mainCheckbox.checked = false;
            mainCheckbox.indeterminate = true;
        }
    }
});

function addUser() {
    const newUser = document.querySelector(".add-new");
    newUser.classList.add("slidein");
    newUser.classList.remove("slideout");
}

document.addEventListener("DOMContentLoaded", function() {
    const cancelBtn = document.getElementById("cancel-add-user");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", function() {
            const newUserForm = document.querySelector(".add-new");
            newUserForm.classList.remove("slidein");
            newUserForm.classList.add("slideout");
        });
    }
});

window.addEventListener("load", function(e) {
    const data = [
        {
            customer_name: "Francis Mercier",
            email: "francis@gmail.com",
            status: "VIP",
            order: 5,
            spent: 10
        }
    ]
    let customerData = localStorage.getItem("customerData");
    if (!customerData) {
        localStorage.setItem("customerData", JSON.stringify(data));
        customerData = localStorage.getItem("customerData");
    }
    const customerDataParse = JSON.parse(customerData);
    const customerTable = document.querySelector("#details-content tbody");
    customerDataParse.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <label>
                    <input type="checkbox">
                    <span id="check-mark"></span>
                </label>
            </td>
            <td>${item.customer_name}</td>
            <td>${item.email}</td>
            <td><span class="status-badge ${item.status.toLowerCase()}">${item.status}</span></td>
            <td>${item.order}</td>
            <td>${item.spent}</td>
            <td><i class="ri-pencil-line" onclick="editUser('${item.email}')"></i><i class="ri-delete-bin-5-line" onclick="deleteUser()"></i></td>
        `;
        customerTable.appendChild(tr);
    })
});

function addNewUser() {
    const customerName = document.getElementsByName("customer_name")[0].value;
    const email = document.getElementsByName("email")[0].value;
    const status = document.getElementsByName("status")[0].value;
    const order = document.getElementsByName("order")[0].value;
    const spent = document.getElementsByName("spent")[0].value;

    if (customerName && email && status && order && spent) {
        const newUser = {
            customer_name: customerName,
            email: email,
            status: status,
            order: order,
            spent: spent
        }
        let customerData = localStorage.getItem("customerData");
        if (!customerData) {
            localStorage.setItem("customerData", JSON.stringify([newUser]));
        } else {
            customerData = JSON.parse(customerData);
            customerData.unshift(newUser);
            localStorage.setItem("customerData", JSON.stringify(customerData));
        }
        window.location.reload();
    }
}
function deleteUser() {
    const customerData = JSON.parse(localStorage.getItem("customerData"));
    const updatedData = customerData.filter((item, index) => index !== 0);
    localStorage.setItem("customerData", JSON.stringify(updatedData));
    window.location.reload();
}