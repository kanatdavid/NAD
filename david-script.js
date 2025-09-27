const app = Vue.createApp({
    data(){
        return{
            projects: [{bild: "", kategori: ""}],//Den tomma
            // egenskapen bild är bara en placeholder
            // då Vue kastar error eftersom att data()
            // sker före created() i Vues livscykel
            // och Vue försöker rendera bilden före
            // arrayen är fylld.
            imageIndex: 0,
            categoryChoice: '',
            sortingPick: ''
        }
    },
    computed: {
        filteredArray(){
            // För varje objekt i arrayen jämförs varje objekts kategori
            // mod this.categoryChoice, och om den kategorien
            // finns i this.categoryChoice strängen returnerar includes
            // true och det nuvarande array objektet returneras och
            // hamnar i filteredArray, det är därför includes returnerar true
            // på alla objekt när this.categoryChoice = '' alltså tom sträng
            // för att alla strängar som inte är null innehåller tom sträng
            const filteredArray = this.projects.filter((arrayObject) => 
                arrayObject.kategori.includes(this.categoryChoice)
            )

            if(this.sortingPick.includes('a-ö')){
                filteredArray.sort((objBefore, objAfter) =>
                    objBefore.titel.localeCompare(objAfter.titel)
                )
            }else if(this.sortingPick.includes('ö-a')){
                filteredArray.sort((objBefore, objAfter) =>
                    objBefore.titel.localeCompare(objAfter.titel)
                ).reverse()
            }

            return filteredArray
        }
    },
    created(){
        axios.get('david-projects.json').then((response) => {
            this.projects = response.data
        })
    },
    methods: {  
        chosenCategory(event){
            this.categoryChoice = event.target.value
        },
        sortingType(event){
            this.sortingPick = event.target.value
        },
        animateSlideshow(){
            //denna metod för att kunna trigga animationen fler än
            const slide = document.getElementById('slideImage')
            slide.classList.remove('anim-changeSlide')//ta bort classen från elementets classlist
            void slide.offsetWidth //trigga reflow, tvinga webbläsaren läsa om layouten
            // element.offsetWidth ger elementets bredd,
            // men vi är inte intresserade av det därmed använder vi void
            slide.classList.add('anim-changeSlide')//Lägg till classen i elementets klasslista igen
        },
        checkIndex(index){
            if(index < 0){
                return this.projects.length - 1
            }else{
                return index
            }
        },
        backImage(){
            this.imageIndex = this.checkIndex(this.imageIndex - 1)
            this.animateSlideshow()
        },
        nextImage(){
            this.imageIndex = (this.imageIndex + 1) % this.projects.length
            this.animateSlideshow()
        }
    }
})
app.mount('#app')