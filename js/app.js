const content = document.querySelector('.container');
const api = "https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js";

fetch(api)
    .then(response => response.json())
    .then(data => uploadProducts(data))
    .catch(err => console.log(err));

function uploadProducts(productos){
    
    content.innerHTML = `
    <div class="top-bar">
        <div class="logo">
            <h2>ShopyApp</h2>
        </div>
        <nav>
            <li class="cart"><i class="fas fa-shopping-cart"></i></li>
        </nav>
    </div>
    <div class="list" style="display: none">
       <i> Your products will appear here</i>
    </div>
    <div class="path"> 
        <span style="color: #dfdadc;">Catalog / Sneackers /</span> <b> ${productos.title} </b>
    </div>
    <div class="product-page">
        <div class="product-image">
            <div class="image-cover">
                <img class="cover" id="img-container" src="https:${productos.featured_image}">
            </div>
            <div class="carousel">
                <div class="carousel-cont">
                    ${productos.images.map(e => `<img class="images" src="https:${e}">`).join('')}
                </div>
                <ul class="nav-imgs">
                    ${productos.images.map(e => `<li class="point">.</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="product-description">
            <span style="color: #dfdadc;">by Nike x ALYX</span>
            <div class="details line-bottom">
                <h1 class="title"> ${productos.title} </h1>
                <span class="price">$ ${productos.price}</span><span class="price-compare">$ ${productos.compare_at_price}</span>
            </div>
            <div class="details line-bottom div-color">
                <span>Colors:</span>
                <div class="btn-colors">  ${productos.options[0].values.map( color => `<input type="radio" name="colours" style="background: ${color};" value="${color}">
                `).join('')}
                </div>
            </div>
            <div class="details line-bottom div-size">
                <span>Size:</span>
                <div class="btn-size"> ${productos.options[1].values.map(size => `<button class="available-sizes" id="${size}">${size}</button>
                `).join('')}
                </div>
            </div>
            <div class="details-count">
                <div class="amount">
                    <button class="amount-less"> - </button>
                    <span class="amounts"> ${amount} </span>
                    <button class="amount-plus"> + </button>
                </div>
                <div class="total-price">
                    <p>Total price: <b><span class="final-price">${productos.price}</span></b> </p>
                </div>
            </div>
            <div class="details-buttons">
                <button class="add-favourite" style="background-color: #f4f4f4;">Ad to favourite</button>
                <button class="add-cart" style="background-color: #000; color: #fff;">Ad to cart</button>
            </div>
            <div class="details">
                <p>${productos.description}</p>
            </div>
        </div>
    </div>
    `;

    
    
}