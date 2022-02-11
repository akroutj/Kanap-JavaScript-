
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
let globalPrice = 0
let imageCart, altTxtCart

fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((res) => addProductsChoices(res))

function addProductsChoices(couchObjects) {
    const { imageUrl, altTxt, description, name, price, colors } = couchObjects
    globalPrice = price
    imageCart = imageUrl
    altTxtCart = altTxt
    title = name
    makeTitle(name)
    makeImage(imageUrl, altTxt)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    console.log(imageUrl)
    image.alt = altTxt
    const itemImage = document.querySelector(".item__img")
    if (itemImage != null) itemImage.appendChild(image)
}

function makeTitle(name) {
    const title = document.querySelector("#title")
    title.textContent = name
}

function makePrice(price) {
    const priceProduct = document.querySelector("#priceProduct")
    priceProduct.textContent = price
}

function makeDescription(description) {
    const descriptionProduct = document.querySelector("#description")
    descriptionProduct.textContent = description
}

function makeColors(colors) {
    const selectColors = document.querySelector("#colors")
    colors.forEach((color) => {
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        selectColors.appendChild(option)
    });
}

const button = document.querySelector("#addToCart")
button.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    ifSelectIsEmpty(color, quantity)
    saveCartLocalStorage(color, quantity)
})

function saveCartLocalStorage(color, quantity) {
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: globalPrice,
        title: title,
        imageUrl: imageCart,
        altTxt: altTxtCart
    }
    localStorage.setItem(id, JSON.stringify(data))
}

function ifSelectIsEmpty(color, quantity) {
    if (color === '' || quantity === '' || color == null || quantity == 0) {
        alert("Choississez une couleur et une quantité")
    } else {
        window.location.href = "cart.html"
    }
}