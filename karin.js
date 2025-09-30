const container = document.getElementById("projekt-lista");

axios.get("karin.json") 
  .then(response => {
    const projektLista = response.data; 
    console.log(projektLista); 

    let html = ""; 

    projektLista.forEach(projekt => {
      html += `
        <div class="projektStyle"> 
          <h3>${projekt.title}</h3>
          <img src="${projekt.image}" alt="Bild på ${projekt.alt}">
          <p><b>Kund:</b> ${projekt.client}</p>
          <p><b>År:</b> ${projekt.startYear}–${projekt.endYear}</p>
          <p>${projekt.description}</p>
        </div>
      `;
    });

    container.innerHTML = html; 
  })
  .catch(error => {
    console.error("Fel vid inläsning:", error);
  });

  const bilder = [
    "imgkarin/odling.jpg",
    "imgkarin/stadspark.jpg",
    "imgkarin/innergard.jpg",
    "imgkarin/tradgard.jpg",
    "imgkarin/villatradgard.jpg",
    "imgkarin/herrgard.jpg",
    "imgkarin/svartan.jpg",
    "imgkarin/botaniska.jpg"
  ];

  let nuvarandeIndex = 0;

  const bildElement = document.getElementById("slides-image");
  const knappPrev = document.getElementById("prev");
  const knappNext = document.getElementById("next");

  function seBild(index) {
      bildElement.src = bilder[index];
  }

  knappNext.addEventListener("click", () => {
    nuvarandeIndex++;
    if(nuvarandeIndex >= bilder.length) {
      nuvarandeIndex =0;
    }
    seBild(nuvarandeIndex);
  });

    knappPrev.addEventListener("click", () => {
    nuvarandeIndex--;
    if(nuvarandeIndex < 0) {
      nuvarandeIndex = bilder.length -1;
    }
    seBild(nuvarandeIndex);
  });
