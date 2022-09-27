let navItem = document.querySelector(".nav-item");
let hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("active");
    navItem.classList.toggle("active");
})

let bookmarkBtn = document.querySelector("#bookmark_btn");
let bookmarkText = document.querySelector(".bookmark_text")


bookmarkBtn.addEventListener("click",()=>{
    if(bookmarkBtn.classList == "active"){
        bookmarkBtn.classList.remove("active")
        bookmarkText.innerText = "Bookmark"
    }else{
        bookmarkBtn.classList.add("active")
        bookmarkText.innerText = "Bookmarked"
    }
})

const totalPrice = document.querySelector("#total_price");
const totalBocked = document.querySelector("#total_bocked");
const range = document.getElementById("range")

function updateRange(){
    let num = totalPrice.innerHTML;
    num = num.replace(/\,/,'.')  
    range.style.width =  `calc(${num}%)`
}

updateRange()

const body = document.querySelector("body");
const modal= document.querySelector(".modal");
const selectionModal = document.querySelector(".modal-selections")
const openSelectionModal = document.getElementById("open_model")
const closeSelectionModal = document.getElementById("close_modal")
const selectionModelItem = document.querySelectorAll(".modal_selection_item")
const selectionBtn = document.querySelectorAll(".selection_btn")
const priceBtn = document.querySelectorAll(".price_btn")
const form = document.querySelectorAll(".inputs")
const thanks = document.querySelector(".modal_thanks");
const thanksBtn = document.getElementById('thanks_btn');

form.forEach((e)=>{
    e.setAttribute("onSubmit","update(event)")
    update = (e)=>{
        e.preventDefault()
    }
})
function blackBackgroundActive(){
    modal.classList.add("active")
    body.classList.add("active")
}
function blackBackgroundRemove(){
    modal.classList.remove("active")
    body.classList.remove("active")
}

function selectionModalActive(){
    blackBackgroundActive()
    selectionModal.classList.add('active')
}
function selectionModalRemove(){
    selectionModal.classList.remove("active")
    blackBackgroundRemove()
}

function activeItemSelection(e){
    selectionModelItem.forEach(ele=>{
        ele.classList.remove("active")
    })
    e.classList.add("active")
}
function removeActiveSelection(){
    selectionModelItem.forEach(ele=>{
        ele.classList.remove("active")
    })
}
function thanksModel(){
    removeActiveSelection()
    selectionModalRemove();
    blackBackgroundActive()
    thanks.classList.add("active")
}
function thanksRemove(){
    removeActiveSelection()
    thanks.classList.remove("active")
    blackBackgroundRemove()
}

function updateRange(){
    let num = totalPrice.innerHTML;
    num = num.replace(/\,/,'.')  
    range.style.width =  `calc(${num}%)`
}


function addPrice(price){
    let num = totalPrice.innerHTML;
    num = num.replace(/\,/g,'')
    num = +num + (+price)
    totalPrice.innerHTML = num.toLocaleString("en-US")
}
function addBocket(){
    let num = totalBocked.innerHTML;
    num = num.replace(/\,/g,'');
    num = +num+1;
    totalBocked.innerHTML = num.toLocaleString("en-US")
}


function countLeft(count){
    let parent = count.parentNode.parentElement.parentElement;
    if(parent.id == "no-reward"){
        console.log("yes")
    }
    let item = parent.querySelector(".num_count").getAttribute("data-left");
    let numCount = document.querySelectorAll(`.${item}`);
    numCount.forEach((e)=>{
        if(+e.innerHTML > 0){
            e.innerHTML = +e.innerHTML - 1
        }else{
            parent.classList.add("disabled")
            alert("no left in that selection 'out of stock'")
        }
    })
}

openSelectionModal.addEventListener("click",()=>{
    selectionModalActive()
})
closeSelectionModal.addEventListener("click",()=>{
    removeActiveSelection()
    selectionModalRemove()
})
selectionBtn.forEach((e)=>{
    e.addEventListener("click",()=>{
        selectionModalActive()
        let selectionId = e.getAttribute("data-selection")
        let selectionItem = document.getElementById(selectionId)
        activeItemSelection(selectionItem)
    })  
})
selectionModelItem.forEach(e=>{
    e.addEventListener("click",()=>{
        activeItemSelection(e)
    })
})

priceBtn.forEach((ele)=>{
    ele.addEventListener("click",(e)=>{
        if(ele.parentElement.id == "no-reward_form"){
            addBocket()
            thanksModel()
        }else{
            let priceValue = ele.parentElement.getElementsByClassName("price_value")[0].value;
            addPrice(priceValue);
            countLeft(ele)
            addBocket()
            thanksModel()
        }
    })
})

thanksBtn.addEventListener("click",()=>{
    thanksRemove()
    updateRange()
})