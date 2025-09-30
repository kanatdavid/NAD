const app = Vue.createApp({
  data() {
    return {
      projekt: [],
      filterText: '',
      valdPlats: '',
      platser: [],
      valdMinstaStorlek: '',
      valdStörstaStorlek: ''
    }
  },

  computed: {
    filteredProjekt() {
      const filter = this.filterText.toLowerCase();

      return this.projekt.filter(p => {
        const matchText = !this.filterText ||
          p.projektnamn.toLowerCase().includes(filter) ||
          p.beskrivning.toLowerCase().includes(filter) ||
          p.plats.toLowerCase().includes(filter) ||
          p.storlek.toLowerCase().includes(filter);

        const matchPlats = !this.valdPlats || p.plats === this.valdPlats;

        const storlekTal = parseInt(p.storlek); // "150 kvm" ➜ 150
        const matchMin = !this.valdMinstaStorlek || storlekTal >= parseInt(this.valdMinstaStorlek);
        const matchMax = !this.valdStörstaStorlek || storlekTal <= parseInt(this.valdStörstaStorlek);

        return matchText && matchPlats && matchMin && matchMax;
      });
    }
},
  created() {
  axios.get('linnea.json')
    .then(response => {
      this.projekt = response.data;
      this.platser = [...new Set(this.projekt.map(p => p.plats))];
      this.storlek = [...new Set(this.projekt.map(p => p.storlek))];
    })
    .catch(error => {
      console.error("Det gick inte att hämta data: ", error);
    });
},
  methods: {
  addProjekt() {
    this.projekt.push({
      projektnamn: "Nytt Projekt",
      beskrivning: "Beskrivning av det nya projektet.",
      plats: "Plats för det nya projektet",
      storlek: "Storlek på det nya projektet",
      image: "default.jpg"
    });
  }
}
});

app.mount("#app");