const skickaKnapp = document.getElementById('skickaKnapp')
const namnInput = document.getElementById ('namnInput')
const namnHint = document.getElementById('namnHint')
let giltigtNamn = false

const uppdateraForm = () => {
    skickaKnapp.disabled = !(giltigtNamn && giltigTelefon && giltigEpost)
}

namnInput.addEventListener('input', (event) => {
    const value = event.target.value.trim()
    const regExMönster = /^[A-Za-zÅÄÖåäö\s]{2,}$/
    giltigtNamn = regExMönster.test(value);

    if(giltigtNamn){
        namnInput.classList.add('valid')
        namnInput.classList.remove('invalid')
        namnHint.classList.add('hidden')
    } else{
        namnInput.classList.add('invalid')
        namnInput.classList.remove('valid')
        namnHint.classList.remove('hidden')
    }

    uppdateraForm();
})

const telefonInput = document.getElementById('telefonInput')
const telefonHint = document.getElementById('telefonHint')
let giltigTelefon = false;

telefonInput.addEventListener('input', (event) => {
    const value = event.target.value.trim()
    const regExMönster = /^[0-9+\-\s]{7,}$/
    giltigTelefon = regExMönster.test(value)
   
    if (giltigTelefon) {
        telefonInput.classList.add('valid')
        telefonInput.classList.remove('invalid')
        telefonHint.classList.add('hidden')
    } else{
         telefonInput.classList.add('invalid')
        telefonInput.classList.remove('valid')
        telefonHint.classList.remove('hidden')
    }

    uppdateraForm(); 
})

const epostInput = document.getElementById('epostInput')
const epostHint = document.getElementById('epostHint')
let giltigEpost = false

epostInput.addEventListener('input', (event) => {
    const epostInmatning = event.target.value.trim()
    const regExMönster = /^[^@]+@[^@]+\.[^@]{2,}$/;
    giltigEpost = regExMönster.test(epostInmatning);


    if (giltigEpost) {
        epostInput.classList.add('valid')
        epostInput.classList.remove('invalid')
        epostHint.classList.add('hidden')
    } else {
        epostInput.classList.add('invalid')
        epostInput.classList.remove('valid')
        epostHint.classList.remove('hidden')
    }

    uppdateraForm();
})