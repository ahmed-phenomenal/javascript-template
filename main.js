//store color in storage
let mainColor = localStorage.getItem("color_option")

if(mainColor !== null){
    console.log("Local storage is not empty");
    console.log(localStorage.getItem("color_option"))
    document.documentElement.style.setProperty("--main-color" , localStorage.getItem("color_option"))
}
//Toggle setting
document.querySelector(".toggle-setting .fa-gear").onclick = function(){
    //To spin
    this.classList.toggle("fa-spin")
    //To open
    document.querySelector(".setting-box").classList.toggle("open")
}
//Switch colors
let colorLi = document.querySelectorAll(".color-list li")
colorLi.forEach(li => {
    li.addEventListener("click" , (e) => {
        console.log(e.target.dataset.color)

        //change color
        document.documentElement.style.setProperty("--main-color" , e.target.dataset.color)

        //Set color on local storage
        localStorage.setItem("color_option" , e.target.dataset.color)

        handleActive(e)
    })
})

//Switch Background
let randomBackgroundEl = document.querySelectorAll(".random-background span")
randomBackgroundEl.forEach(span => {
    span.addEventListener("click" , (e) => {

        handleActive(e)

        if(e.target.dataset.background === "yes"){
            console.log("yes")
            backgroundOption = true
            document.querySelector(".random-background .yes").classList.add("active")
            document.querySelector(".random-background .no").classList.remove("active")
            randomizeImgs()
        }
        else{
            console.log("no")
            backgroundOption = false
            document.querySelector(".random-background .no").classList.add("active")
            document.querySelector(".random-background .yes").classList.remove("active")
            clearInterval(backgroundInterval)
        }
    })
})

//landing page Element
let landingPage = document.querySelector(".landing-page");

//Array of images
let imgsArray = ["contents/1.jpg","contents/2.jpg","contents/3.jpg","contents/4.jpg"];
let backgroundOption = true

//variable to control interval
let backgroundInterval;
function randomizeImgs(){
    if(backgroundOption === true){
        backgroundInterval = setInterval(() => {
            //Get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            //Change background image
            landingPage.style.backgroundImage = 'url('+imgsArray[randomNumber]+')'
        },500)
    }
}
randomizeImgs()

//Select skills progress
let ourSkills = document.querySelector(".skills")

window.onscroll = function () {
    //For scroll
    let skillsScroll = ourSkills.offsetTop
    //console.log(skillsScroll)

    //For height 
    let skillsHeight = ourSkills.offsetHeight
    //console.log(skillsHeight)

    //Window height
    let windowHeight = this.innerHeight
    this.console.log(skillsHeight)

    //Window scroll top
    let windowScrollTop = this.pageYOffset

    if(windowScrollTop > (skillsScroll + skillsHeight - windowHeight)){
        this.console.log("skills section reached")
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span")

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })
    }
}

//create image function
let ourGallery = document.querySelectorAll(".gallery img")

ourGallery.forEach(img => {
    img.addEventListener('click' , (e) => {
        //create overlay
        let overlay = document.createElement("div")

        //add class to div
        overlay.className = "popup-overlay"

        //append overlay to body
        document.body.appendChild(overlay)

        //create popup
        let popupBox = document.createElement("div")

        //add class to div
        popupBox.className = "popup-box"


        if(img.alt !== null){
            //create heading
            let imgHeading = document.createElement("h3")

            //append class to h3
            imgHeading.classList.toggle("edit-text")

            //create text for heading
            let imgText = document.createTextNode(img.alt)

            //append text to heading
            imgHeading.appendChild(imgText)

            //append heading to box
            popupBox.appendChild(imgHeading)
        }
        //create the image
        let popupImage = document.createElement("img")
        //set image source
        popupImage.src = img.src

        //add image
        popupBox.appendChild(popupImage)

        document.body.appendChild(popupBox)

        //create close span
        let closeButton = document.createElement("span")

        //create the close button text
        let closeButtonText = document.createTextNode("X")

        //Append text to close button
        closeButton.appendChild(closeButtonText)

        //add class to close button
        closeButton.className = "close-button"

        //add close button to popup box
        popupBox.appendChild(closeButton)
    })
})

//close image
document.addEventListener("click" ,function (e) {
    if(e.target.className == "close-button")
    //remove pop
    e.target.parentNode.remove()
    document.querySelector(".popup-overlay").remove()
})

//select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet")

allBullets.forEach(bullet => {
    bullet.addEventListener("click" , (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior:"smooth"
        })
    })
})

const allLinks = document.querySelectorAll(".links .link2")

allLinks.forEach(link2 => {
    link2.addEventListener("click" , (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior:"smooth"
        })
    })
})

//Handle active stats
function handleActive(ev){
    //remove active class
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove(".active")
    })
    //add active class
    ev.target.classList.add(".active")
}

let bulletsSpan = document.querySelectorAll(".bullets-option span")

let bulletsContainer = document.querySelector(".nav-bullets")

let bulletLocalItem = localStorage.getItem("bullets_option")

if(bulletLocalItem !== null){
    bulletsSpan.forEach(span => {
        span.classList.remove("active")
    })
    if(bulletLocalItem === "block"){
        bulletsContainer.style.display = "block"
        document.querySelector(".bullets-option .yes").classList.add("active")
    }
    else{
        bulletsContainer.style.display = "none"
        document.querySelector(".bullets-option .no").classList.add("active")
    }    
}

bulletsSpan.forEach(span => {
    span.addEventListener("click" , (e) => {
        if(span.dataset.display === "show"){
            bulletsContainer.style.display = "block"
            localStorage.setItem("bullets_option" , "block")
            document.querySelector(".bullets-option .yes").classList.add("active")
            document.querySelector(".bullets-option .no").classList.remove("active")
        }
        else{
            bulletsContainer.style.display = "none"
            localStorage.setItem("bullets_option" , "none")
            document.querySelector(".bullets-option .no").classList.add("active")
            document.querySelector(".bullets-option .yes").classList.remove("active")
        }
        handleActive(e)
    })
})

//reset button
document.querySelector(".reset-option").onclick = function (){
    localStorage.clear();
    localStorage.removeItem(".bullets-option")
    localStorage.removeItem(".color_option")
    localStorage.removeItem(".random-background")

    //reload window
    window.location.reload()
}

//toggle menu
let toggleBtn = document.querySelector(".toggle-menu")
let tLinks = document.querySelector(".links")
toggleBtn.onclick = function() {
    this.classList.toggle("menu-active")
    tLinks.classList.toggle("open")
}

//click anywhere outsde menu and toggle button
document.addEventListener("click" , (e) => {
    if(e.target !== toggleBtn && e.target !== tLinks){
        if(tLinks.classList.contains("open")){
            toggleBtn.classList.toggle("menu-active")
            tLinks.classList.toggle("open")
        }
    }
})

tLinks.onclick = function(e){
    e.stopPropagation()
}