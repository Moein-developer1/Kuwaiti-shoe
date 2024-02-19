const $ = document

// css loader

window.addEventListener('DOMContentLoaded' , () => {
  $.querySelector('.website__content').classList.remove('hidden')
  $.querySelector('.loader__container').classList.add('hidden')
})

// swiper activity

let swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    loop: true,
    speed:800,
    autoplay: {
        delay: 2500,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

// light / dark mode actions

let darkModeBtn = $.querySelector('#mode')

darkModeBtn.addEventListener('click' , ()=> {

  if(darkModeBtn.checked){
    enableDarkmode()
  } else {
    disableDarkmode()
  }

})

const enableDarkmode = () => {
  document.body.classList.add('dark__bg','light__txt')
  localStorage.setItem('theme','dark')
}

const disableDarkmode = () => {
  document.body.classList.remove('dark__bg','light__txt')
  localStorage.setItem('theme','light')
}

window.addEventListener('load' , () => {
  let getLocalStorageValue = localStorage.getItem('theme')

  if(getLocalStorageValue === 'dark'){
    document.body.classList.add('dark__bg')
    document.body.classList.add('light__txt')
    darkModeBtn.checked = true
  }
})

// navbar scrolling actions

let navBar = $.querySelector('.nav__bar')

window.addEventListener('scroll' , () => {
  if(scrollY > 0) {
    navBar.classList.add('scrolled')
  }else{
    navBar.classList.remove('scrolled')
  }
})

// hamburger menu actions

const hamburgerMenuBtn = $.querySelector('.hamburger__menu-btn')
const navList = $.querySelector('.nav__list')

hamburgerMenuBtn.addEventListener('click' , () => {
  openList()    
})

document.body.addEventListener('click' , (e) => {
  if(e.target !== hamburgerMenuBtn && e.target.parentNode !== hamburgerMenuBtn){
    closeList()
  }
})

function openList () {
  hamburgerMenuBtn.classList.toggle('open')
  navList.classList.toggle('show')
}

function closeList () {
  hamburgerMenuBtn.classList.remove('open')
  navList.classList.remove('show')
}

// search bar

// let searchbar = $.querySelector('.feature.magnifier')
// let searchbarBtn = $.querySelector('.magnifier__icon')
// let closeSearchbarBtn = $.querySelector('.feature.magnifier .close__btn')

// searchbarBtn.addEventListener('click' , () => {
//   searchbar.classList.toggle('open')
// })

// closeSearchbarBtn.addEventListener('click' , () => {
//   searchbar.classList.remove('open')
// })


// nofitication toast actions

let notifications = $.querySelector('.notifications')
let notificationBtns = $.querySelectorAll('.notification__btn-wrapper button')

let toastDetails = {
  timer:5000,

  success:{
    icon:'fa-solid fa-circle-check',
    title:'The product has been added to the cart.',
    unicColor:'--unic-color: #0abf30'
  },
  warning:{
    icon:'fa-solid fa-triangle-exclamation',
    title:'The product is already in your cart.',
    unicColor:'--unic-color:#e9bd0c'
  }
}

function Toast (id) {
  let {icon,title,unicColor} = toastDetails[id]

  let toastElem = $.createElement('li')
  toastElem.style = `${unicColor}`
  toastElem.className = 'toast'
  toastElem.innerHTML = `
  <div class="toast__icon" style="${unicColor}">
      <i class="${icon}"></i>
  </div>
  <p class="toast__message">
    ${title}
  </p>
  <button class="close__toast" onclick="removeToast(this.parentElement)"><i class="fa-solid fa-xmark"></i></button>
  `
  notifications.append(toastElem)

  toastElem.timeoutId = setTimeout(() => {
    removeToast(toastElem)
  }, toastDetails.timer);
}

function removeToast (toastElem) {
  toastElem.classList.add('hide')

  if(toastElem.timeoutId){
    clearInterval(toastElem.timeoutId)
  }

  setTimeout(() => {
    toastElem.remove()   
  }, 600);
}

notificationBtns.forEach(btn => {
  btn.addEventListener("click" , () => Toast(btn.id))
})

// modal box actions

let modalDetails = {
  success:{
    icon:'fa-solid fa-circle-check',
    title:'Thank you for your trust',
    message:'The product will be shipped soon...',
    unicColor:'--unic-color: #0abf30'
  },

  warning:{
    icon:'fa-solid fa-triangle-exclamation',
    title:'Remove all the products?',
    message:'Are you sure about removing all the products?',
    unicColor:'--unic-color:#e9bd0c'
  }
  
}

let modalBoxContainer = $.querySelector('.modal')
let modalBox = $.querySelector('.modal__box')

function Modal (action) {
  let {icon,title,message,unicColor} = modalDetails[action]

  document.body.classList.add('open__modal','no__scroll')
  
  modalBoxContainer.innerHTML = `
  <div class="modal__box">
  <div class="modal__icon" style="${unicColor}">
  <i class="${icon}"></i>
  </div>
  <h2 class="modal__title">${title}</h2>
  <p class="modal__message">
  ${message}
  </p>
  </div>
  `

  if(action === 'success'){
    $.querySelector('.modal__box').insertAdjacentHTML('beforeend' , `
    <div class="modal__button-wrapper">
      <button class="modal__btn ok__btn" style="--unic-color:#0abf30;" onclick="closeModalbox()">Ok</button>
    </div>
    `)
    
  } else if (action === 'warning'){
    $.querySelector('.modal__box').insertAdjacentHTML('beforeend' , `
    <div class="modal__button-wrapper">
      <button class="modal__btn ok__btn" style="--unic-color:#e24d4c;" onclick="acceptRemoveProducts()">Ok</button>
      <button class="modal__btn cancel__btn" style="--unic-color:#0abf30;" onclick="closeModalbox()">Cancel</button>
    </div>
    `)    
  }
}

function closeModalbox () {
  document.body.classList.remove('open__modal','no__scroll')
}

// card shopping actions

const cartShoppingBtn = $.querySelector('.feature.shop__basket')
const cartShopping = $.querySelector('.shopping__cart')
const closeCartBtn = $.querySelector('.shopping__cart .close')


cartShoppingBtn.addEventListener('click' , () => {
  cartShopping.classList.add('open')
})

closeCartBtn.addEventListener('click' , () => {
  closeCardshopping()
})


function closeCardshopping () {
  cartShopping.classList.remove('open')
}

// render products

const productContainer = $.querySelector('.product__list')


products.forEach(product => {
  productContainer.insertAdjacentHTML('beforeend' , `
  <div class="product__item">
  <div class="product__cover">
  <img src="${product.img}" alt="">
  </div>
  <div class="product__content">
  <h2 class="product__title">${product.title}</h2>
  <h3 class="product__subTitle">${product.brand}</h3>
  <div class="rate__price">
  <p class="product__price">$${product.price}</p>
  <div class="star__rating">
  <i class="star fa-solid fa-star"></i>
  <i class="star fa-solid fa-star"></i>
  <i class="star fa-solid fa-star"></i>
  <i class="star fa-solid fa-star"></i>
  <i class="star fa-solid fa-star"></i>
  </div>
  </div>
  <div class="button__wrapper">
  <button class="add__card-btn btn" onclick="addToCart(${product.id})"><i class="fa fa-plus"></i> Add to card</button>
  <button class="see__more-link" id="${product.id}">
  <i class="fa fa-eye"></i>
  </button>
  </div>
  </div>
  </div>
  `)
})


let ratingStar = $.querySelectorAll('.star__rating')

for(let i = 0 ; i < products.length ; i++) {
  let rate = ratingStar[i]
  
  let stars = rate.querySelectorAll('.star')
  
  let sum = products[i].starRate
  
  for(let i = 0 ; i < sum ; i ++ ){
    stars[i].classList.add('checked')
  }
}


// more info 

let seeMoreInfo = $.getElementsByClassName('see__more-link')[0]

seeMoreInfo.addEventListener('click' , (e) => {
  document.body.classList.add('open__info-modal','no__scroll')

  let findProduct = products.find(item => item.id == e.target.id)
  
  modalBoxContainer.innerHTML = `
  <div class="container">
  <div class="info__modal">
      <div class="image__samples">
          <div class="image__samples-cover">
              <img src="${findProduct.img}" alt="" onclick="selecToShowtImage('${findProduct.img}')">
          </div>

          <div class="image__samples-cover">
              <img src="${findProduct.img2}" alt="" onclick="selecToShowtImage('${findProduct.img2}')">
          </div>

          <div class="image__samples-cover">
              <img src="${findProduct.img3}" alt="" onclick="selecToShowtImage('${findProduct.img3}')">
          </div>

          <div class="image__samples-cover">
              <img src="${findProduct.img4}" alt="" onclick="selecToShowtImage('${findProduct.img4}')">
          </div>
      </div>

      <div class="main__image">
          <img src="${findProduct.img}" alt="">
      </div>

      <div class="info__modal-content">
          <h2 class="info__modal-title">${findProduct.title}</h2>

          <p class="info__modal-message">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum facilis perferendis repellat molestias consectetur porro nobis minima culpa numquam eaque, distinctio sapiente doloremque maiores, molestiae velit similique tempore sit. Nostrum.</p>
      
          <div class="button__wrapper">
              <button class="btn" onclick="addToCart(${findProduct.id})"><i class="fa-solid fa-plus"></i> Add to cart</button>
          </div>

          <div class="more__info-star__rating">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
          </div>
      </div>

      <button class="close__info-modal" onclick="closeInfomodal()">
          <i class="fa-solid fa-xmark"></i>
      </button>
  </div>
</div>
  `
  let ratingStarMoreInfo = $.querySelector('.more__info-star__rating')
  
  for(let i = 0 ; i < findProduct.starRate ; i++){
    let star = ratingStarMoreInfo.querySelectorAll('i')
    
    star[i].classList.add('checked')
  }
})

function selecToShowtImage (url) {
    let mainImage = $.querySelector('.main__image img') 
    mainImage.setAttribute('src' , url)
}

function closeInfomodal () {
  document.body.classList.remove('open__info-modal','no__scroll')
}

// cart array

window.addEventListener('load' , () => {
  cart = JSON.parse(localStorage.getItem('Cart')) || []
  updateCart()
})

let cart = []

// set event for remove all products button

let removeAllBtn = $.querySelector('.remove__all-btn')

function removeProductHandler () {
  Modal('warning')
}

function acceptRemoveProducts () {
  removeAllProducts()
  closeModalbox()
  closeCardshopping()
}

removeAllBtn.addEventListener("click" , () => {
  if(cart.length){
    removeProductHandler()
  }
})

// buy products button

let buyBtn = $.querySelector('.buy__btn')

buyBtn.addEventListener('click' , () => {
  if(cart.length){
    Modal('success')
    removeAllProducts()
    closeCardshopping()
  }
  
})

// remove all products

function removeAllProducts () {
  cart = []
  updateCart()
}

// add to cart

function addToCart (id) {
  let isInCart = cart.some(item => item.id == id)

  if(isInCart) {
    Toast('warning')
  } else {
    let findProduct = products.find(product => product.id == id)
  
    cart.push({
      ...findProduct,
      numberOfUnits:1
    })

    Toast('success')
  }

  updateCart()
}

// update cart data

function updateCart () {
  renderCartItems()
  renderSubtotal()

  // save cart items to local storage

  localStorage.setItem('Cart' , JSON.stringify(cart))
}

// render Cart Items 

const cartList = $.querySelector('.cart__list')

function renderCartItems () {
  cartList.innerHTML = ''
  cart.forEach(item => {
    cartList.innerHTML += `
    <li class="cart__item">
        <div class="cart__item-cover">
            <img src="${item.img}" alt="">
            <p class="cart__item-title">${item.title}
            </p>
        </div>


        <span class="cart__item-price">$${item.price}</span>

        <div class="cart__item-control">
            <button class="minus" id="minus" onclick="changeNumberOfQuantity('minus',${item.id})"><i class="fa fa-minus"></i></button>
            <p class="cart__item-quantity">${item.numberOfUnits}</p>
            <button class="plus" id="plus" onclick="changeNumberOfQuantity('plus',${item.id})"><i class="fa fa-plus"></i></button>
        </div>

        <div class="trashbin">
            <i class="fa fa-trash" onclick="removeCartItem(${item.id})"></i>
        </div>
    </li>
    ` 
  })
}

// remove cart item

function removeCartItem (id) {
  cart = cart.filter(item => item.id !== id)

  updateCart()
}

// render subtotal 

const subtotal = $.querySelector('.subtotal')
const quantityItems = $.querySelector('.quantity')

function renderSubtotal () {
  let totalPrice = 0,
      totalItems = 0
    
  cart.forEach(item => {
    totalPrice += item.price * item.numberOfUnits,
    totalItems += item.numberOfUnits
  })

  subtotal.innerText = `Subtotal (${totalItems} items): $${totalPrice}`

  if(totalItems) {
    quantityItems.style.display = 'flex'
    quantityItems.innerText = totalItems
  } else {
    quantityItems.style.display = 'none'
  }
}

// change number of quantity

function changeNumberOfQuantity (action,id) {
  cart = cart.map(item => {
    numberOfUnits = item.numberOfUnits

    if(item.id == id) {
      if(action === 'minus' && numberOfUnits > 1) {
        numberOfUnits--
      } else if(action === 'plus' && numberOfUnits < item.inStock) {
        numberOfUnits++
      }
    }

    return{
      ...item,
      numberOfUnits,
    }
  })

  updateCart()
}

