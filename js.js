// NØGLE OG LINK TIL DATABASE
const url = "https://siptip-62ea.restdb.io/rest/cocktails";
const options = {
  headers: {
    "x-apikey": "620f5f1734fd6215658587a4",
  },
};

//container til articles med en drink
const section = document.querySelector("#cocktail");
//tager fat i indholdet af html skabelon (article)
const template = document.querySelector("template").content;

let filter = "alle";
let data;
const h1 = document.querySelector("h1");

//fanger alle mine knapper
const filterKnapper = document.querySelectorAll("button");
// console.log(filterKnapper);

//looper igennem en forEach og tilføjer en eventListner med et klik på alle mine knapper
filterKnapper.forEach((knap) => knap.addEventListener("click", filterDrinks));

// eventlistner knyttet til knapperne der vælger gvad for et filter der er aktivt
function filterDrinks() {
  // sæt variabel "filter" til værdien af data-kategori på den knap der er klikket på
  filter = this.dataset.kategori;
  console.log(filter);

  //fjern klassen valgt fra knappen
  document.querySelector(".valgt").classList.remove("valgt");
  //makere den knap der er klikket på (this er knappen)
  this.classList.add("valgt");

  //kald funktionen vis(data) efter det nye filter er sat på
  vis();

  // ændre overskriften
  h1.textContent = this.textContent;
}

async function hentData() {
  const resspons = await fetch(url, options);
  data = await resspons.json();

  vis();
}

function vis() {
  console.log({ data });

  section.textContent = "";

  data.forEach((drink) => {
    //loop igennem json
    //tjek hvilken drink  og sammenlign med filter eller vis alle, hvis filter har værdien "alle"
    if (filter == drink.kategori || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector(".kategori").textContent =
        drink.kategori + " cocktail";
      klon.querySelector(".navn").textContent = drink.navn;
      klon.querySelector("img").src = "img/" + drink.billede + ".webp";

      klon.querySelector("article").addEventListener("click", () => {
        location.href = `singleview.html?id=${drink._id}`;
      }); //sender til en anden side

      section.appendChild(klon);
    }
  });
}
hentData();

// ------- BURGER FUNKTION TIL ÅBNE OG LUKKE I MOBILE------------
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

// -------------- kategori drag funktion i mobil
// https://www.youtube.com/watch?v=KHGc7eZyxKY

let slider = document.querySelector(".slider");
let innerSlider = document.querySelector(".slider_inner");

let pressed = false;
let startx;
let x;

slider.addEventListener("mousedown", (e) => {
  pressed = true;
  startx = e.offsetX - innerSlider.offsetLeft;
  // console.log(innerSlider.offsetLeft);
  slider.style.cursor = "grabbing";
});

slider.addEventListener("mouseenter", () => {
  slider.style.cursor = "grab";
});

// slider.addEventListener(
//   "mouseleave",
//   () => {
//     slider.style.cursor = "default";
//   }
// );

slider.addEventListener("mouseup", () => {
  slider.style.cursor = "grab";
});

window.addEventListener("mouseup", () => {
  pressed = false;
});

slider.addEventListener("mousemove", (e) => {
  if (!pressed) return;
  e.preventDefault();

  x = e.offsetX;

  innerSlider.style.left = `${x - startx}px`;
  // console.log(startx);
  checkboundray();
});

function checkboundray() {
  let outer = slider.getBoundingClientRect();
  let inner = innerSlider.getBoundingClientRect();
  console.log(outer);

  if (parseInt(innerSlider.style.left) > 0) {
    innerSlider.style.left = "0 px";
  } else if (inner.right < outer.right) {
    innerSlider.style.left = `-${inner.width - outer.width}px`;
  }
}
