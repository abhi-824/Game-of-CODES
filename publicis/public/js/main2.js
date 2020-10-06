function codeblast(handle)
{
  show_screen(codeblast_screen);  
  document.querySelector(".join_romms").addEventListener("click",(e)=>{
    e.preventDefault();
    console.log("hcuisgbvfiegvbf")
    let username=handle;
    let room=document.querySelector("#room_id").value;
    codeblast_enter(username,room);
  })
}