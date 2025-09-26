
document.addEventListener('mousemove', (event) => {
    const xPos = event.innerWidth
    const yPos = event.innerheight

    const xProcent = (event.clientX / xPos) * 100
    const yProcent = (event.clientY / yPos) * 100

    const moveX = 50 - (xProcent - 50) / 5
    const moveY = 50 - (yProcent - 50) / 5

    document.body.style.backgroundPosition = moveX + "% " + moveY + "%"
})

const app = Vue.createApp({
    data(){
        return{
            projects: [{bild: ""}],//Den tomma
            // egenskapen bild är bara en placeholder
            // då Vue kastar error eftersom att data()
            // sker före created() i Vues livscykel
            // och Vue försöker rendera bilden före
            // arrayen är fylld.
            imageIndex: 0
        }
    },
    created(){
        axios.get('david-projects.json').then((response) => {
            this.projects = response.data
        })
    },
    methods: {
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