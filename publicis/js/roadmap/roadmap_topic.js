let next=document.querySelector(".Next");
let intro=document.querySelector(".centerWidgets");
let main_sec=document.querySelector(".main-section")
next.addEventListener("click",(e)=>{
    e.preventDefault();
    
    intro.classList.add("hidden");
    main_sec.classList.remove("hidden");
    
})
let editor;

ClassicEditor
    .create( document.querySelector( '#editor_info' ) )
    .then( newEditor => {
        editor = newEditor;
    } )
    .catch( error => {
        console.error( error );
    } );
let submit=document.querySelector(".submit").addEventListener("click",(e)=>{
    e.preventDefault();
    const editorData = editor.getData();
    console.log(editorData);
})