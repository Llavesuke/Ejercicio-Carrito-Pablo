const cart = document.querySelector("#carrito")

// Array para almacenar los artículos del carrito
let cartItems = []

/**
 * Añade un artículo al carrito.
 * @param {HTMLElement} item - El botón de compra que se ha clicado.
 */
function addToCart(item) {
    const [image, name, price, id] = obtainData(item.parentElement.parentElement)

    // Comprobar si el artículo ya existe en el carrito
    const existingItem = cartItems.find(cartItem => cartItem.id === id)
    if (existingItem) {
        // Si el artículo ya existe, aumentar la cantidad
        existingItem.quantity += 1
    } else {
        // Si el artículo no existe, agregarlo al carrito
        cartItems.push({
            id,
            image,
            name,
            price,
            quantity: 1
        });
    }

    renderCart()

    // Hacer visible el carrito y ocultarlo después de un tiempo
    toggleCartVisibility(true)
}

/**
 * Obtiene los datos del artículo a partir de la tarjeta de producto.
 * @param {HTMLElement} card - El elemento de la tarjeta del producto.
 * @returns {Array} - Un array con la imagen, el nombre, el precio y el id.
 */
function obtainData(card) {
    const image = card.querySelector("img").src
    const name = card.querySelector("h4").textContent
    const price = card.querySelector(".precio span").textContent
    const id = card.querySelector("a").getAttribute("data-id")
    return [image, name, price, id]
}

/**
 * Renderiza el contenido del carrito en la tabla.
 */
function renderCart() {
    const table = cart.querySelector("table tbody")

    table.innerHTML = ''

    // Recorrer los artículos del carrito y crear las filas correspondientes
    cartItems.forEach(item => {
        const newRow = document.createElement("tr")
        newRow.classList.add("element", item.name.replaceAll(" ", ""))

        const elementImage = document.createElement("td")
        const imageFrame = document.createElement("img")
        imageFrame.src = item.image
        imageFrame.classList.add("imagen-curso", "u-full-width")
        elementImage.appendChild(imageFrame)
        newRow.appendChild(elementImage)

        const elementName = document.createElement("td")
        elementName.style.verticalAlign = "middle"
        const nameP = document.createElement("p")
        nameP.style.margin = "0"
        nameP.textContent = item.name
        elementName.appendChild(nameP)
        newRow.appendChild(elementName)

        const elementPrice = document.createElement("td")
        elementPrice.style.verticalAlign = "middle"
        const priceP = document.createElement("p")
        priceP.style.margin = "0"
        priceP.textContent = item.price
        elementPrice.appendChild(priceP)
        newRow.appendChild(elementPrice)

        const elementAmount = document.createElement("td")
        elementAmount.style.verticalAlign = "middle"
        const amountP = document.createElement("p")
        amountP.style.margin = "0"
        amountP.textContent = item.quantity
        elementAmount.appendChild(amountP)
        newRow.appendChild(elementAmount)

        const elementTdX = createDeleteButton(item.id)
        newRow.appendChild(elementTdX)

        table.appendChild(newRow)
    });
}

/**
 * Crea un botón de eliminación para el artículo.
 * @param {string} id - El id del artículo a eliminar.
 * @returns {HTMLElement} - La celda que contiene el botón de eliminación.
 */
function createDeleteButton(id) {
    const elementTdX = document.createElement("td")
    const elementX = document.createElement("p")
    elementX.textContent = "X"
    elementX.style.margin = "0"

    elementX.classList.add("borrar-curso")

    // Agregar evento de clic para eliminar el artículo del array
    elementX.addEventListener("click", () => {
        // Filtrar el array para eliminar el artículo
        cartItems = cartItems.filter(cartItem => cartItem.id !== id)
        renderCart()
    });

    elementTdX.appendChild(elementX) 
    return elementTdX
}


/**
 * Alterna la visibilidad del carrito.
 * @param {boolean} visible - Si el carrito debe ser visible o no.
 */
function toggleCartVisibility(visible) {
    if (visible) {
        cart.classList.add('visible') // Mostrar el carrito
        setTimeout(() => {
            cart.classList.remove('visible') // Ocultar el carrito después de un tiempo
        }, 1000)
    }
}

/**
 * Vacía el carrito.
 */
function removeContentFromCart() {
    cartItems = []
    renderCart()
}

// Configurar los botones de compra
const buyButtons = document.querySelectorAll(".agregar-carrito")
buyButtons.forEach((button) => {
    button.addEventListener("click", () => addToCart(button)) // Agregar el evento para cada botón
});

// Configurar el botón de vaciar el carrito
const removeCartButton = document.querySelector("#vaciar-carrito")
removeCartButton.addEventListener("click", removeContentFromCart)

renderCart()
