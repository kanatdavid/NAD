const skickaKnapp = document.getElementById('skickaKnapp')
const namnInput = document.getElementById ('namnInput')
const namnHint = document.getElementById('namnHint')
let giltigtNamn = false
/* Skicka knapp är disabled så länge alla 3 inte är uppfyllda*/
const uppdateraForm = () => {
    skickaKnapp.disabled = !(giltigtNamn && giltigTelefon && giltigEpost)
}


namnInput.addEventListener('input', (event) => {
    const namn = event.target.value
    /*Deklarerar ett regEx med det inbyggda stödet. Mönstret används för att testa inmatning. 
    Om mönstret passerar testet så returneras true */
    const regExMönster = /^[A-ZÅÄÖa-åäö -]{5,75}$/
    giltigtNamn = regExMönster.test(namn);

    if(giltigtNamn){
        namnInput.classList.add('valid')
        namnInput.classList.remove('invalid')
        namnHint.classList.add('hidden')
        namnHint.textContent = ''
    } else{
        namnInput.classList.add('invalid')
        namnInput.classList.remove('valid')
        namnHint.classList.remove('hidden')
        namnHint.textContent = ': Endast text, 5-75 tecken'
    }

    uppdateraForm();
})

const telefonInput = document.getElementById('telefonInput')
const telefonHint = document.getElementById('telefonHint')
let giltigTelefon = false;

telefonInput.addEventListener('input', (event) => {
    const value = event.target.value
    const regExMönster = /^[0-9+\-\s]{7,20}$/
    giltigTelefon = regExMönster.test(value)
   
    if (giltigTelefon) {
        telefonInput.classList.add('valid')
        telefonInput.classList.remove('invalid')
        telefonHint.classList.add('hidden')
        telefonHint.textContent = ''
    } else{
         telefonInput.classList.add('invalid')
        telefonInput.classList.remove('valid')
        telefonHint.classList.remove('hidden')
        telefonHint.textContent = ': 7-20 tecken, endast 0-9 samt "+" "-"'
    }

    uppdateraForm(); 
})

const epostInput = document.getElementById('epostInput')
const epostHint = document.getElementById('epostHint')
let giltigEpost = false

epostInput.addEventListener('input', (event) => {
    const epostInmatning = event.target.value
    const regExMönster = /^[^@\s]+@[^@]+\.[^@]{2,}$/;
    giltigEpost = regExMönster.test(epostInmatning);


    if (giltigEpost) {
        epostInput.classList.add('valid')
        epostInput.classList.remove('invalid')
        epostHint.classList.add('hidden')
        epostHint.textContent = ''
    } else {
        epostInput.classList.add('invalid')
        epostInput.classList.remove('valid')
        epostHint.classList.remove('hidden')
        epostHint.textContent = 'Ex: abc@hotmail.com'
    }

    uppdateraForm();
})