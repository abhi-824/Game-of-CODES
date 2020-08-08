document.querySelector(".join_room").addEventListener("click", function () {
  document.querySelector(".form").classList.remove("hidden");
  document.querySelector(".join_room").classList.add("hidden");
  document.querySelector(".create_room").classList.add("hidden");
});
document.querySelector(".create_room").addEventListener("click", function () {
  document.querySelector(".form2").classList.remove("hidden");
  document.querySelector(".join_room").classList.add("hidden");
  document.querySelector(".create_room").classList.add("hidden");
});
document
  .querySelector("#user_name")
  .addEventListener("keyup", check_valid_user);
function check_valid_user(){
    let handle=document.querySelector("#user_name").value;
    console.log(handle);
    async function find_user(){
            let modified_url = 'https://codeforces.com/api/user.info?handles=' + handle;
          const jsondata = await fetch(modified_url);
          const jsdata = await jsondata.json();
          if(jsdata.status==="FAILED")
          {
              document.querySelector('.error').classList.remove("hidden")
              document.querySelector('.success').classList.add("hidden")
          }
          else{
              
            document.querySelector('.error').classList.add("hidden")
            document.querySelector('.success').classList.remove("hidden")
          }
          user_submissions = jsdata.result;
    }
    find_user();
}