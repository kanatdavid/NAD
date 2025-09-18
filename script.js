//Deklarerar en variabel som pekar på input fältet som vi ska lyssna på
//för att det ska synas för användare
const felmeddelande = document.getElementById('felmeddelande')

//Hämtar Namn input fältets element för att 
const formNamn = document.getElementById('form-namn')
//Variabel med regex som innehåller reglerna för namn
const namnRegex = /^[A-ZÅÄÖa-zåäö' -]+$/

//elementViSkaLyssnaPå.addEventListener('realtidslyssnig för input', (event är objektet som innehåller all information om ändringar) => {}) 
formNamn.addEventListener('input', (event) => {
    //i formNamn.value så innehåller value det användaren har skrivit
    const namn = formNamn.value

    if(namnRegex.test(namn)){
        if(namn.length < 6){
            felmeddelande.textContent = 'Namn måste vara minst 5 tecken'
        }else if(namn.length > 75){
            felmeddelande.textContent = 'Namn måste vara max 75 tecken'
        }else{
            felmeddelande.textContent = ''
        }
    }else{
        felmeddelande.textContent = 'Namn får endast bestå av bokstäver, mellanslag, apostrof och bindestreck samt får ej lämnas tomt'
    }
})

