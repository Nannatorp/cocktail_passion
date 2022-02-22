// NØGLE OG LINK TIL DATABASE
const url =
  "https://siptip-62ea.restdb.io/rest/cocktails";
const options = {
  headers: {
    "x-apikey":
      "620f5f1734fd6215658587a4",
  },
};

//container til articles med en drink
const section = document.querySelector(
  "#cocktail"
);
//tager fat i indholdet af html skabelon (article)
const template =
  document.querySelector(
    "template"
  ).content;

let filter = "alle";
let data;
const h1 = document.querySelector("h1");

//fanger alle mine knapper
const filterKnapper =
  document.querySelectorAll("button");
// console.log(filterKnapper);

//looper igennem en forEach og tilføjer en eventListner med et klik på alle mine knapper
filterKnapper.forEach((knap) =>
  knap.addEventListener(
    "click",
    filterDrinks
  )
);

// eventlistner knyttet til knapperne der vælger gvad for et filter der er aktivt
function filterDrinks() {
  // sæt variabel "filter" til værdien af data-kategori på den knap der er klikket på
  filter = this.dataset.kategori;
  console.log(filter);

  //fjern klassen valgt fra knappen
  document
    .querySelector(".valgt")
    .classList.remove("valgt");
  //makere den knap der er klikket på (this er knappen)
  this.classList.add("valgt");

  //kald funktionen vis(data) efter det nye filter er sat på
  vis();

  // ændre overskriften
  h1.textContent = this.textContent;
}

async function hentData() {
  const resspons = await fetch(
    url,
    options
  );
  data = await resspons.json();

  vis();
}

function vis() {
  console.log({ data });

  section.textContent = "";

  data.forEach((drink) => {
    //loop igennem json
    //tjek hvilken drink  og sammenlign med filter eller vis alle, hvis filter har værdien "alle"
    if (
      filter == drink.kategori ||
      filter == "alle"
    ) {
      const klon =
        template.cloneNode(true);
      klon.querySelector(
        ".kategori"
      ).textContent =
        drink.kategori + " cocktail";
      klon.querySelector(
        ".navn"
      ).textContent = drink.navn;
      klon.querySelector("img").src =
        "img/" +
        drink.billede +
        ".webp";

      klon
        .querySelector("article")
        .addEventListener(
          "click",
          () => {
            location.href = `singleview.html?id=${drink._id}`;
          }
        ); //sender til en anden side

      section.appendChild(klon);
    }
  });
}
hentData();
