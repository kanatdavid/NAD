const proj = Vue.createApp({
    data(){
        return{
            minaProjekt:[],
            valdProjekt: "", 
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
        const parameter = new URLSearchParams(window.location.search);
        const annanProjId = parameter.get('id');

        axios.get('rostyk.json').then((jsonResponse)=>{
            this.minaProjekt = jsonResponse.data;

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
            window.location.href = "rostyksprojekt.html?id=" + projektId
        },

        nextPic(){
            if(this.valdProjekt){
                this.currentPic = (this.currentPic + 1) % this.valdProjekt.bilder.length;
                this.activePic = this.valdProjekt.bilder[this.currentPic];
            }
        },
        prevPic(){
            if(this.valdProjekt){
                this.currentPic = (this.currentPic - 1 + this.valdProjekt.bilder.length) % this.valdProjekt.bilder.length;
                this.activePic = this.valdProjekt.bilder[this.currentPic];
            }
        },

        choosePic(index){
            this.currentPic = index;
            this.activePic = this.valdProjekt.bilder[index];
        },

        toggleScale(){
            const image = document.getElementById('bild');
            if(image){
                image.classList.toggle('scaled');
            }
        }

    }
});
proj.mount('#proj')


