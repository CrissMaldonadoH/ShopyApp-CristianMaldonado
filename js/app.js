const content = document.querySelector('.container');
let amount = 1;
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

    const buttonLess = document.querySelector('.amount-less');
    const buttonPlus = document.querySelector('.amount-plus');
    let amounts = document.querySelector('.amounts');
    let finalPrice = document.querySelector('.final-price');
    const carouselCont = document.querySelector('.carousel-cont');
    const carouselPoints = document.querySelectorAll("li[class='point']");
    const cover = document.querySelector('.cover');
    const images = document.querySelectorAll("img[class='images']");
    const sizeBtns = document.querySelectorAll("button[class='available-sizes']");
    const colorsBtn = document.querySelectorAll("input[name='colours']");
    const addCartBtn = document.querySelector('.add-cart');
    const cartBtn = document.querySelector('.cart');
    const cartList = document.querySelector('.list');
    let size;
    let colorLabel;

    images.forEach(img =>{
        img.addEventListener('click', () =>{
            cover.src = img.src;
        })
    })

    carouselPoints.forEach( (e , i) => {
        carouselPoints[i].addEventListener('click', () =>{
            let position = i;
            let calc = position * -25
            carouselCont.style.transform = `translateX(${calc}%)`;
            carouselCont.style.animation = "none";

            setTimeout(() => {
                carouselCont.style.animation = "carousel 20s infinite";
              }, "2000")

            carouselPoints.forEach( (point, i) =>{
                carouselPoints[i].classList.remove('active')
            })
            carouselPoints[i].classList.add('active')
        })
    });

    sizeBtns.forEach(btn =>{
        btn.addEventListener('click', e =>{
            size= e.target.id;
        })
    })

    
    colorsBtn.forEach(btnColor =>{
        btnColor.addEventListener('click', e =>{
            colorLabel = e.target.value;
            
        })
    })

    buttonLess.addEventListener('click', () =>{
        if( amount != 0){
            amount = amount - 1;
            finalPrice.textContent = finalPrice.textContent - productos.price;
            amounts.textContent = amount;
        } 
    })

    buttonPlus.addEventListener('click', () =>{
        amount = amount + 1;
        finalPrice.textContent = productos.price * amount;
        amounts.textContent = amount;
    })

    cartBtn.addEventListener('click', () =>{
        if(cartList.style.display == "none"){
            cartList.style.display = "block";
            cartBtn.innerHTML = `<i class="fas fa-times-circle"></i>`;
        }else if(cartList.style.display == "block"){
            cartList.style.display = "none";
            cartBtn.innerHTML = `<i class="fas fa-shopping-cart"></i>`;
        }
    })

    addCartBtn.addEventListener('click', () =>{
        const title = document.querySelector('.title').textContent;
        const price = finalPrice.textContent;
        const amountCart = amounts.textContent;
        const imgCart = cover.src;
        const sizeCart = size;
        const colorCart = colorLabel;
      

        if(price == 0 || amountCart == 0 || sizeCart == undefined || colorCart == undefined){
            alert('Please select the quantity, size and color of the product to be able to add to the cart');
        }else{
            cartList.innerHTML = `
        <div class="item">
            <div class="item-img">
                <img src="${imgCart}" width="90%" height="auto">
            </div>
            <div class="item-detail">
                <p class="title"><b>${title}</b></p>
                <span>Cant: ${amountCart}</span> | <span>$ ${price}</span><br />
                <span>SZ: ${sizeCart}</span> | <span>CL: 
                <span style="background-color:${colorCart}; padding: 0.1% 4%; border-radius: 50%"></span>
                </span>
            </div>
        </di>
        `;
        }
        
    })
    
}