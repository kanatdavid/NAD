const proj = Vue.createApp({
    data(){
        return{
            minaProjekt:[],
            valdProjekt: "", //det projekt som matchar id i url
            activePic: null,
            filter: "",
            relateradeProjekt: [],
            currentPic: 0
        }
    },
    computed: {
        filtreradeProjekt(){
            if(!this.filter){
                return this.minaProjekt
            }else{
                return this.minaProjekt.filter(
                    kategori => kategori.typ === this.filter)
            }
        }
    },
    created(){
        //params används för att läsa query-parametrar från url:en
        const params = new URLSearchParams(window.location.search);
        //hämta id från url
        const annanProjId = params.get('id');
        //hämta hela JSON-filen
        axios.get('rostyk.json').then((jsonResponse)=>{
            this.minaProjekt = jsonResponse.data;
            //leta upp rätt projekt baserad på id
            //find är en array metod, går genom listan och returnerar första träff
            this.valdProjekt = this.minaProjekt.find(projekt => projekt.id == annanProjId);
            if(this.valdProjekt){
                this.activePic = this.valdProjekt.huvudBild
                this.currentPic = 0;

                this.relateradeProjekt = this.minaProjekt.filter(
                    projekt => projekt.typ === this.valdProjekt.typ && projekt.id != this.valdProjekt.id
                )
            };
        })

    },
    methods:{
        väljProjekt(projektId){
            //i webbläsarens fält sätter jag ett värde i form av id, då 
            //öppnas rostyksProjekt.html och skickar med vilket projekt som ska visas
            window.location.href = "rostyksprojekt.html?id=" + projektId
        },
        nextPic(){
            if(this.valdProjekt){//kontroll om valdproejkt finns/inte null
                //ökar index med ett, samt kollar om den är på sista bilden, då sätts index till 0
                this.currentPic = (this.currentPic + 1) % this.valdProjekt.bilder.length;
                //uppdaterar activepic
                this.activePic = this.valdProjekt.bilder[this.currentPic];
            }
        },
        prevPic(){
            if(this.valdProjekt){
                //adderar lisans storlek för att undvika negativa tal
                this.currentPic = (this.currentPic - 1 + this.valdProjekt.bilder.length) % this.valdProjekt.bilder.length;
                this.activePic = this.valdProjekt.bilder[this.currentPic];
            }
        },
        choosePic(index){
            this.currentPic = index;
            this.activePic = this.valdProjekt.bilder[index];
        }

    }
});
proj.mount('#proj')
