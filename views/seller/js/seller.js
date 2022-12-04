function addProductToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
function getProductFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) ?? [];
}

function createNewRecord(UID, name, price, condition, currency, i) {
  const tr = document.createElement('tr');
  tr.dataset.index = i;
  console.log(i);
  const tdZoro = document.createElement('td');
  const tdOne = document.createElement('td');
  const tdTwo = document.createElement('td');
  const tdThree = document.createElement('td');
  const tdFour = document.createElement('td');
  const tdFive = document.createElement('td');
  tdFive.addEventListener("click", editProduct)
  const tdSix = document.createElement('td');
  tdSix.addEventListener('click', removeProduct)

  let trush = document.createElement("img");
  trush.className = 'delete';
  trush.src = "../assets/images/edit.png";
  tdFive.appendChild(trush);

  tdZoro.textContent = UID;
  tdOne.textContent = name;
  tdTwo.textContent = price;
  tdThree.textContent = condition;
  tdFour.textContent = currency;
  tdFive.textContent = 'edit';
  tdFive.className = 'edit'
  tdSix.textContent = 'remove';
  tdSix.className = 'remove'

  tr.appendChild(tdZoro);
  tr.appendChild(tdOne);
  tr.appendChild(tdTwo);
  tr.appendChild(tdThree);
  tr.appendChild(tdFour);
  tr.appendChild(tdFive);
  tr.appendChild(tdSix);
  return tr;

}
function createTableHeader() {
  const headerRow = document.createElement('tr');
  const thZoro = document.createElement('th');
  const thOne = document.createElement('th');
  const thTwo = document.createElement('th');
  const thThree = document.createElement('th');
  const thFour = document.createElement('th');
  const thFive = document.createElement('th');
  const thSix = document.createElement('th');

  thZoro.textContent = "UID";
  thOne.textContent = "name";
  thTwo.textContent = "price";
  thThree.textContent = "condition";
  thFour.textContent = "currency";
  thFive.textContent = "edit";
  thSix.textContent = "remove";

  headerRow.appendChild(thZoro);
  headerRow.appendChild(thOne);
  headerRow.appendChild(thTwo);
  headerRow.appendChild(thThree);
  headerRow.appendChild(thFour);
  headerRow.appendChild(thFive);
  headerRow.appendChild(thSix);
  return headerRow;
}

function displayProduct() {
  if (tableData.firstElementChild !== null) {
    document.querySelector('table').remove();
  }
  const newTable = document.createElement('table');
  newTable.appendChild(createTableHeader());
  let products = getProductFromLocalStorage('product-name');
  for (let i in products) {
    let product = products[i];
    let row = createNewRecord(product.UID, product.name, product.price + "$", product.condition, product.currency + "$", i);
    newTable.appendChild(row)
  }
  tableData.appendChild(newTable);
}

const productUID = document.querySelector('#product-UID');
const productName = document.querySelector('#product-name');
const productPrice = document.querySelector('#product-price');
const   productCondition = document.querySelector('#product-condition');
const productCurrency = document.querySelector('#product-currency');
const productImage = document.querySelector('#product-image');

const btn = document.querySelector('button');
const tableData = document.querySelector('.table-data');

let productList = JSON.parse(localStorage.getItem('product-name')) ?? [];
btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (productName.value === '') {
    return;
  }
  let productObject = { UID: productUID.value, name: productName.value, price: productPrice.value, condition:   productCondition.value, currency: productCurrency.value, image: productImage.value };
  console.log(productImage.value)

  productList.push(productObject);

  productUID.value = "";
  productName.value = "";
  productPrice.value = "";
  productCondition.value = "";
  productCurrency.value = "";
  productImage.value = "";
  // add the product
  addProductToLocalStorage('product-name', JSON.stringify(productList));
  displayProduct();
})
document.addEventListener('DOMContentLoaded', () => { displayProduct() })
function removeProduct(event) {
  const products = JSON.parse(localStorage.getItem('product-name'))
  let index = event.target.parentElement.dataset.index;
  products.splice(index, 1);
  addProductToLocalStorage('product-name', JSON.stringify(products));
  displayProduct();

}
function editProduct(event) {
  const products = JSON.parse(localStorage.getItem('product-name'))
  let index = event.target.parentElement.dataset.index;
  let newProduct = products[index];
  document.querySelector('#product-UID').value = newProduct.UID;
  document.querySelector('#product-name').value =newProduct.name;
  document.querySelector('#product-price').value = newProduct.price;
  document.querySelector('#product-condition').value = newProduct.condition;
  document.querySelector('#product-currency').value = newProduct.currency;
  document.querySelector('#product-image').value = newProduct.image;
  products.splice(index, 1);
}