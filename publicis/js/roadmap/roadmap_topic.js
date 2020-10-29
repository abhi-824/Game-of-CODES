let next=document.querySelector(".Next");
let intro=document.querySelector(".centerWidgets");
let main_sec=document.querySelector(".main-section")
next.addEventListener("click",(e)=>{
    e.preventDefault();
    
    intro.classList.add("hidden");
    main_sec.classList.remove("hidden");
    
})