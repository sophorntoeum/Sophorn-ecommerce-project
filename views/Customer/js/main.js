
function createCard(title, price, description, image) {
    const card = document.createElement('div');
    card.classList.add('card');

    const titleElement = document.createElement('div');
    titleElement.classList.add('title');
    titleElement.textContent = title;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardImage = document.createElement('img');
    cardImage.src = image;
    const priceElement = document.createElement('div');
    priceElement.classList.add('price');
    priceElement.textContent = "$" + price;

// =================input star===============
    let div1 = document.createElement("div");
      for (let i=0; i<3; i++){
        let star = document.createElement("i")
        star.className ="material-icons";
        star.textContent ="star";
        div1.appendChild(star);
      };
      for (let i=0; i<2; i++){
        let starHalf = document.createElement("i")
        starHalf.className ="material-icons";
        starHalf.textContent ="star_half";
        div1.appendChild(starHalf);
      };
      const descriptionElement = document.createElement('div');
      descriptionElement.classList.add('description');
      descriptionElement.textContent = description;
      
      cardBody.appendChild(cardImage);
      cardBody.appendChild(priceElement);
      cardBody.appendChild(descriptionElement);
      cardBody.appendChild(div1)

      card.appendChild(titleElement);
      card.appendChild(cardBody);
      // console.log(card);

    return card;
}

function displayProduct() {
    let products = JSON.parse(localStorage.getItem('product-name')) ?? [];
    for (let product of products) {
        console.log(product);
        let card = createCard(product.name, product.price, product.quantity, product.image);
        container.appendChild(card);
    }
}
const container = document.querySelector('#container');
document.addEventListener('DOMContentLoaded', () => { displayProduct(); });

// ============ Search Task================
function searchBtn() {

 let text = search.value.toLowerCase();
 let tasks = document.querySelectorAll(".card");
 for (let task of tasks) {
   let taskTitle = task.firstElementChild.textContent.toLowerCase();
   if (taskTitle.indexOf(text) === -1) {
     task.style.display = "none";
   } else {
     task.style.display = "flex";
   }
 }
}
const cardSearch = document.querySelector("#search");
search.addEventListener("keyup",searchBtn);