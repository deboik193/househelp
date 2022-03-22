function checkform(value) {
    document.querySelector('.login').innerHTML = `<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>`
}

function historyGo() {
    history.back()
}

// date
const d = new Date();
let year = d.getFullYear();
document.getElementById("getDate").innerHTML = year;
