const fbNamn = document.getElementById('fb-namn')
const formNamn = document.getElementById('form-namn')

const checkTeckenAntal = (sträng, min, max) => {
    if(sträng.length >= min && sträng.length <= max){
        return true
    }else{
        return false
    }
}

const namnRegex = /^[A-ZÅÄÖa-zåäö -]+$/

formNamn.addEventListener('input', (event) => {
    const namn = formNamn.value

    if(namnRegex.test(namn)){
        formNamn.classList.remove('fb-style-input-fel')
        fbNamn.classList.remove('fb-style-label-fel')
        fbNamn.textContent = ''
        if(checkTeckenAntal(namn, 5, 75)){
            formNamn.classList.remove('fb-style-input-fel')
            fbNamn.classList.remove('fb-style-label-fel')
            fbNamn.textContent = ''
        }else{
            formNamn.classList.add('fb-style-input-fel')
            fbNamn.classList.add('fb-style-label-fel')
            fbNamn.textContent = ': krav 5-75 tecken'
        }
    }else{
        formNamn.classList.add('fb-style-input-fel')
        fbNamn.classList.add('fb-style-label-fel')
        fbNamn.textContent = ': tillåtna tecken A-Ö, a-ö, " " och "-"'
    }
});

const felMedTel = document.getElementById('fb-tel')
const telInp = document.getElementById('form-telefon')
const regexTelefon = /^[0-9+-]+$/

telInp.addEventListener('input', (event) => {
    const telSträng = telInp.value

    if(regexTelefon.test(telSträng)){
        felMedTel.classList.remove('fb-style-label-fel')
        telInp.classList.remove('fb-style-input-fel')
        felMedTel.textContent = ''
    }else{
        felMedTel.classList.add('fb-style-label-fel')
        telInp.classList.add('fb-style-input-fel')
        felMedTel.textContent = ': tillåtna tecken 0-9, "+" "-"'
    }
})

const felMedEpost = document.getElementById('fb-epost')
const epostInp = document.getElementById('form-epost')
const regexEpost = /[A-ZÅÄÖa-zåäö.-]+@[A-ZÅÄÖa-zåäö-]+\.[A-ZÅÄÖa-zåäö]{2,}/

const hint = document.getElementById('hint')

epostInp.addEventListener('input', (event) => {
    const epost = epostInp.value

    if(regexEpost.test(epost)){
        felMedEpost.classList.remove('fb-style-label-fel')
        epostInp.classList.remove('fb-style-input-fel')
        felMedEpost.textContent = ''
        hint.textContent = ''
    }else{
        felMedEpost.classList.add('fb-style-label-fel')
        epostInp.classList.add('fb-style-input-fel')
        felMedEpost.textContent = ': Se hint nedan'
        hint.textContent = 'Hint: Genom hela eposten är stora/små bokstäver tillåtna, ' +
        'epostens användarnamn tillåter även "." "-", men kräver att det följs av "@" ' +
        'domännamnet tillåter även "-", men kräver att den följs av "." och ' +
        'toppdomänen ska bestå av minst två bokstäver'
    }
})

//Deklarerar en variabel som pekar på input fältet som vi ska lyssna på
//för att det ska synas för användare

//const felmeddelande = document.getElementById('felmeddelande')
// const fbNamn = document.getElementById('fb-namn')
//Hämtar Namn input fältets element för att 
// const formNamn = document.getElementById('form-namn')

//funktioner att kalla på för att validera

//Antal tecken universiell
// const checkTeckenAntal = (sträng, min, max) => {
//     if(sträng.length >= min && sträng.length <= max){
//         return true
//     }else{
//         return false
//     }
// }

//Variabel med regex som innehåller reglerna för namn
// const namnRegex = /^[A-ZÅÄÖa-zåäö -]+$/

//tecken namn
// const namnTeckenCheck = (element, feedbackelement, sträng, regex) =>{
//     if(regex.test(sträng)){
//         element.classList.add('validering-feedback-fel')
//         feedbackelement.textContent = 'Namn får endast bestå av bokstäver, mellanslag, apostrof och bindestreck samt får ej lämnas tomt.'
//     }else{
//         formNamn.classList.remove('validering-feedback-fel')
//         formNamn.value.textContent = ''
//     }
// }


//elementViSkaLyssnaPå.addEventListener('realtidslyssnig för input', (event är objektet som innehåller all information om ändringar) => {}) 
// formNamn.addEventListener('input', (event) => {
//     //i formNamn.value så innehåller value det användaren har skrivit
//     const namn = formNamn.value

//     if(namnRegex.test(namn)){
//         formNamn.classList.remove('fb-style-namn-input-fel')
//         fbNamn.classList.remove('fb-style-namn-label-fel')
//         fbNamn.textContent = ''
//         if(checkTeckenAntal(namn, 5, 75)){
//             formNamn.classList.remove('fb-style-namn-input-fel')
//             fbNamn.classList.remove('fb-style-namn-label-fel')
//             fbNamn.textContent = ''
//         }else{
//             formNamn.classList.add('fb-style-namn-input-fel')
//             fbNamn.classList.add('fb-style-namn-label-fel')
//             fbNamn.textContent = ': krav 5-75 tecken'
//         }
//     }else{
//         formNamn.classList.add('fb-style-namn-input-fel')
//         fbNamn.classList.add('fb-style-namn-label-fel')
//         fbNamn.textContent = ': tillåtna tecken A-Ö, a-ö, " " och "-"'
//     }

    // if(namnRegex.test(namn)){
    //     formNamn.classList.remove('validering-feedback-fel')
    //     if(checkTeckenAntal(namn, 0, 75)){
    //         formNamn.classList.add('validering-feedback-fel')
    //         felmeddelande.textContent = 'Namn måste vara högst 75 tecken.'
    //     }else{
    //         namn.classList.remove('validering-feedback-fel')
    //         felmeddelande.textContent = ''
    //     }
    // }else{
    //     formNamn.classList.add('validering-feedback-fel')
    //     felmeddelande.textContent = 'Namn får endast bestå av bokstäver, mellanslag, och bindestreck samt får ej lämnas tomt.'
    // }
// })



// //va de funkade nång timma sen

// const telefon = document.getElementById('form-telefon')

// const regexTelefon = /^[0-9+-]+$/

// telefon.addEventListener('input', (event) => {
//     const nummer = telefon.value

//     if(!(regexTelefon.test(nummer))){
//         telefon.classList.add('validering-feedback-fel')
//         felmeddelande.textContent = 'Telefonnummer får bara bestå av siffror, "+" och "-"'
//     }else{
//         telefon.classList.remove('validering-feedback-fel')
//         felmeddelande.textContent = ''
//     }
// })



// //va de funkade nång timma sen
// const epost = document.getElementById('form-epost')

// const epostRegex = /^[A-ZÅÄÖa-zåäö.-]+@[A-ZÅÄÖa-zåäö-]+\.[A-ZÅÄÖa-zåäö]{2,4}$/

// epost.addEventListener('input', (event) => {
//     const aktuellEpost = epost.value

//     if(!(epostRegex.test(aktuellEpost))){
//         epost.classList.add('validering-feedback-fel')
//         felmeddelande.textContent = 'Korrekt epost format i andvändarnam är a-ö(stora/små), "." och "-", följt av "@" och domännamnet vilket endast får innehålla bokstäver a-z(stora/små) och "-". Följt av "." och ett toppdomännamn som måste innehålla minst 2 bokstäver a-ö(stora/små)'
//     }else{
//         epost.classList.add('validering-feedback-rätt')
//         felmeddelande.textContent = ''
//     }
// })


