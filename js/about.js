const $ = document

// css loader

window.addEventListener('DOMContentLoaded' , () => {
  $.querySelector('.website__content').classList.remove('hidden')
  $.querySelector('.loader__container').classList.add('hidden')
})


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
