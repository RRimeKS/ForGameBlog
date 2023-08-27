const contentArea = document.querySelector('.content-area')
const sideBar = document.querySelector('.side-bar')

// run function on load, scroll and resize for better performance
window.onload = () => controlSideBarFloating()
window.onscroll = () => controlSideBarFloating()
window.onresize = () => controlSideBarFloating()

// lets define some variables
var leftBlock = contentArea
var rightBlock = sideBar
var topSpace = 10
var breakpoint = 992  // we use 992 for col-lg
var stickyClass = 'sticky-sidebar'
var bottomFixedClass = 'bottom-fixed-sidebar'

// now create a function that will create sticky sidebar and use above variables
function controlSideBarFloating(){
    var rectL = leftBlock.getBoundingClientRect();
    var rectR = rightBlock.getBoundingClientRect();
    if(window.innerWidth >= breakpoint){
        if(rectL.top-topSpace + (rectL.height - rectR.height) >= 0 && rectL.top-topSpace <= 0){
            rightBlock.classList.add(stickyClass)
            rightBlock.classList.remove(bottomFixedClass)
        }else if(rectL.top-topSpace + (rectL.height - rectR.height) <= 0){
            rightBlock.classList.remove(stickyClass)
            rightBlock.classList.add(bottomFixedClass)
        }else{
            rightBlock.classList.remove(stickyClass)
            rightBlock.classList.remove(bottomFixedClass)
        }
    }else{
        rightBlock.classList.remove(stickyClass)
        rightBlock.classList.remove(bottomFixedClass)
    }
}