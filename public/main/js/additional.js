function checkform(value) {
    document.querySelector('.login').innerHTML = `<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>`
}

function historyGo() {
    history.back()
}

// date
function changeEveryYear() {
    const d = new Date();
    let year = d.getFullYear();
    document.getElementById("getDate").innerHTML = year;
}
changeEveryYear()


// this code for form-wizard
// function formWizard() {
    
    
// }
// formWizard()
    // let getCurrentItem
    // let listButton = document.querySelectorAll('.form-wizard')
    //  listButton.forEach((listButton, index) => {
    //     if (listButton == index) {
    //         console.log('corrrt')
    //     }
    // })


function changeForm() {
    let firstForm = document.getElementById('1')
    let secondForm = document.getElementById('2')
    let thirdForm = document.getElementById('3')

    firstForm.classList.toggle('d-none')
    secondForm.classList.toggle('d-none')

   
    console.log('clicked')
}