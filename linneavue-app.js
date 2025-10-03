const app = Vue.createApp({
  data() {
    return {
      projekt: [],
      filterText: '',
      valdPlats: '',
      platser: [],
      valdMinstaStorlek: '',
      valdStörstaStorlek: '',
      sortKey: '',
      sortAsc: true
    }
  },

  computed: {
    filteredProjekt() {
      const filter = this.filterText.toLowerCase();

      let resultat = this.projekt.filter(p => {
        const matchText = !this.filterText ||
          p.projektnamn.toLowerCase().includes(filter) ||
          p.beskrivning.toLowerCase().includes(filter) ||
          p.plats.toLowerCase().includes(filter) ||
          p.storlek.toLowerCase().includes(filter);

        const matchPlats = !this.valdPlats || p.plats === this.valdPlats;

        const storlekTal = parseInt(p.storlek);
        const matchMin = !this.valdMinstaStorlek || storlekTal >= parseInt(this.valdMinstaStorlek);
        const matchMax = !this.valdStörstaStorlek || storlekTal <= parseInt(this.valdStörstaStorlek);

        return matchText && matchPlats && matchMin && matchMax;
      });
      if (this.sortKey) {
        resultat.sort((a, b) => {
          let va = a[this.sortKey];
          let vb = b[this.sortKey];

          va = va.toString().toLowerCase();
          vb = vb.toString().toLowerCase();

          if (va < vb) return this.sortAsc ? -1 : 1;
          if (va > vb) return this.sortAsc ? 1 : -1;
          return 0;

        });
      }
      return resultat;
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
    setSort(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
    },
    rensaFilter() {
      this.filterText = '';
      this.valdPlats = '';
      this.valdMinstaStorlek = '';
      this.valdStörstaStorlek = '';
      this.sortKey = '';
      this.sortAsc = true;
    }
  }

});


app.mount("#app");