const app = Vue.createApp({
    data(){
        return{
            projects: [{bild: "", kategori: "", titel: ""}],
            imageIndex: 0,
            categoryChoice: '',
            sortingPick: '',
            searchValue: ''
        }
    },
    computed: {
        filteredArray(){
            const filteredArray = this.projects.filter((arrayObject) => 
                arrayObject.kategori.includes(this.categoryChoice) && arrayObject.titel.toLowerCase().startsWith(this.searchValue)
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
    mounted(){
        const searchField = document.getElementById('searchField')
        searchField.addEventListener('input', (event) => {
            this.searchValue = event.target.value.toLowerCase()
        })

        searchField.addEventListener('focus', (event) => {
            event.target.classList.add('highlight-trans')
        })

        searchField.addEventListener('blur',(event) => {
            event.target.classList.remove('highlight-trans')
        })

    },
    created(){
        axios.get('david-projects.json').then((response) => {
            this.projects = response.data
        })
    },
    methods: {
        pageLoad(event){
            event.target.classList.add('pageLoad-anim')
        },
        chosenCategory(event){
            this.categoryChoice = event.target.value
        },
        sortingType(event){
            this.sortingPick = event.target.value
        },
        animateSlideshow(){
            const slide = document.getElementById('slideImage')
            slide.classList.remove('anim-changeSlide')
            void slide.offsetWidth
            slide.classList.add('anim-changeSlide')
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