document.addEventListener("DOMContentLoaded", function() {
  const dogsDiv = document.getElementById("dogs");
  const dogs = [
    {
      name: "Whiskey",
      age: 4,
      facts: [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!"
      ]
    },
    {
      name: "Hazel",
      age: 0,
      facts: [
        "Hazel has soooo much energy!",
        "Hazel is highly intelligent.",
        "Hazel loves people more than dogs."
      ]
    },
    {
      name: "Tubby",
      age: 4,
      facts: [
        "Tubby is really stupid.",
        "Tubby does not like walks.",
        "Angelina hates Tubby."
      ]
    }
  ];

  dogs.forEach(dog => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("col-4", "dog", "text-center");
    let { name } = dog;
    newDiv.innerHTML = `
        <img src="./images/${name.toLowerCase()}.jpg"/>
        <h3 class="mt-3"><a href="/dogs/${name}">${name}</a></h3>
    `;
    dogsDiv.appendChild(newDiv);
  });

  let links = document.querySelectorAll("#dogs a");

  links.forEach((link, idx) => {
    link.addEventListener("click", e => {
      e.preventDefault();
      let { href } = e.target;
      const state = { idx };
      window.history.pushState(state, "", href);
      showDogDetail(state);
    });
  });

  window.addEventListener("popstate", e => {
    showDogDetail(e.state);
  });

  function showDogDetail(idxObj) {
    let details = document.getElementById("details");
    let dogPics = document.querySelectorAll(".dog img");
    if (idxObj === null) {
      details.innerHTML = "";
      dogPics.forEach(img => img.classList.remove("inactive"));
      return;
    }
    let { idx } = idxObj;
    let dog = dogs[idx];
    details.innerHTML = `
      <h1 class="text-center">Name: ${dog.name}</h1>
      <h3 class="text-center">Age: ${dog.age}<h3>
      ${dog.facts.map(fact => `<p class="text-center">${fact}</p>`).join("")}
    `;
    dogPics.forEach((img, i) => {
      if (i !== idx) img.classList.add("inactive");
      else img.classList.remove("inactive");
    });
  }
});
