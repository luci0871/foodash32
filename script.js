const endPoint = "https://foobar32.herokuapp.com/";

window.addEventListener("load", init);

function init() {
  fetch(endPoint)
    .then((res) => res.json())
    .then(buildDOM);
}

setInterval(() => {
  //document.querySelector("#taps").innerHTML = "";
  fetch(endPoint)
    .then((res) => res.json())
    .then(updateDOM);
}, 1000);

function buildDOM(data) {
  //console.log(data);
  buildTaps(data.taps);
  buildStor(data.storage);
}

function updateDOM(data) {
  updateTaps(data.taps);
  updateStor(data.storage);
}
function updateTaps(taps) {
  taps.forEach((tap) => {
    const element = document.querySelector(`.tap[data-beername='${tap.beer}']`);
    element.querySelector(
       "p"
     ).textContent = `${tap.level} out of ${tap.capacity}`;
    //console.log(element);
    element.querySelector(".innertap").style.height =
      (tap.level / tap.capacity) * 100 + "%";
  });
}
function buildTaps(taps) {
  //console.log(taps);
  //grab the template
  const template = document.querySelector("#tapsTemp").content;
  //loop through the taps
  taps.forEach((tap) => {
    //console.log(tap);
    //3 clone the taps
    const myTap = template.cloneNode(true);
    myTap.querySelector("article").dataset.beername = tap.beer;
    //4 popultate
    myTap.querySelector("h2").textContent = tap.beer;
    myTap.querySelector(
       "p"
     ).textContent = `${tap.level} out of ${tap.capacity}`;
    //5 append to DOM
    myTap.querySelector(".innertap").style.height =
      (tap.level / tap.capacity) * 100 + "%";
    document.querySelector("#taps").appendChild(myTap);
  });
}

function updateStor(beers) {
    beers.forEach((beer) => {
      const element = document.querySelector(`.beer[data-beername='${beer.name}']`);
      element.querySelector(
        "p"
      ).textContent = `${beer.amount} out of 10`;
      //console.log(element);
      element.querySelector(".inner").style.height =
        (beer.amount / 10) * 100 + "%";
    });
  }
  function buildStor(beers) {
    //console.log(taps);
    //grab the template
    const template = document.querySelector("#storageTemp").content;
    //loop through the taps
    beers.forEach((beer) => {
      //console.log(tap);
      //3 clone the taps
      const myBeer = template.cloneNode(true);
      myBeer.querySelector("article").dataset.beername = beer.name;
      //4 popultate
      myBeer.querySelector("h2").textContent = beer.name;
      myBeer.querySelector(
        "p"
      ).textContent = `${beer.amount} out of 10`;
      //5 append to DOM
      myBeer.querySelector(".inner").style.height =
            (beer.amount / 10) * 100 + "%";
      document.querySelector("#beers").appendChild(myBeer);
    });
  }
