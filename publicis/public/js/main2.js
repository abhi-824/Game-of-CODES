function codeblast(handle) {
  show_screen(codeblast_screen);
  const socket = io();
  document.querySelector(".join_romms").addEventListener("click", (e) => {
    e.preventDefault();
    let username = handle;
    let room = document.querySelector("#room_id").value;
    socket.emit("checkId", room);
    socket.on("roomIdChecked", (check) => {
      //console.log(check);
      if (check == 1) {
        codeblast_enter(username, room);
      } else if (check == 2) {
        document.querySelector(".codeBlastBtns").classList.add("hidden");
        document.querySelector(".formForNewTeam").classList.remove("hidden");
        document.querySelector(".createTeam").addEventListener("click", (e) => {
          e.preventDefault();
          document.querySelector(".formForTeam").classList.remove("hidden");
          document.querySelector(".formForNewTeam").classList.add("hidden");
        });
        document.querySelector("#newTeam").addEventListener("submit", (e) => {
          e.preventDefault();
          console.log("hello")
          
          if (document.querySelector(".teamName").value != "") {
            socket.emit(
              "give_team_id",
              document.querySelector(".teamName").value
            );
            socket.on("rec_team_id_without_room", (teamID) => {
              codeblast_team_enter(
                handle,
                teamID,
                room,
                document.querySelector(".teamName").value
              );
            });
          } else {
            display_alert("Team Name can't be empty");
          }
        });
        document.querySelector(".joinTeam").addEventListener("submit", (e) => {
          e.preventDefault();
          socket.emit("checkTeamId", document.querySelector("#team_id").value,room);

          console.log(document.querySelector("#team_id").value)
          socket.on("teamIdChecked", (check,teamName) => {
            if (check) {
              codeblast_team_enter(
                handle,
                document.querySelector("#team_id").value,
                room,
                teamName
              );
            } else {
              display_alert("There is no such team available!");
            }
          });
        });

        console.log("dohwohvwviwovn");
      } else {
        display_alert("There is no such room available!");
      }
    });
  });

  document.querySelector(".createRoom").addEventListener("click", (e) => {
    e.preventDefault();
    let check = document.querySelector("#check").checked;
    if (check) {
      document.querySelector(".codeBlastBtns").classList.add("hidden");
      // document.querySelector(".formForNewTeam").classList.remove("hidden");
      // document.querySelector(".joinTeam").addEventListener("submit", (e) => {
      //   e.preventDefault();
      //   socket.emit("checkTeamId", document.querySelector("#team_id").value);
      //   socket.on("teamIdChecked", (check) => {
      //     if (check) {
      //       codeblast_enter(username, room);
      //     } else {
      //       display_alert("There is no such team available!");
      //     }
      //   });
      // });
      document.querySelector(".formForTeam").classList.remove("hidden");
      // document.querySelector(".createTeam").addEventListener("click", (e) => {
      //   e.preventDefault();
      //   document.querySelector(".formForNewTeam").classList.add("hidden");

      // })
      document.querySelector("#newTeam").addEventListener("submit", (e) => {
        e.preventDefault();

        if (document.querySelector(".teamName").value != "") {
          socket.emit(
            "give_team_and_room_id",
            document.querySelector(".teamName").value
          );
          socket.on("rec_team_id", (teamID, roomID) => {
            codeblast_team_enter(
              handle,
              teamID,
              roomID,
              document.querySelector(".teamName").value
            );
          });
        } else {
          display_alert("Team Name can't be empty");
        }
      });
    } else {
      socket.emit("give_id");
      socket.on("rec_id", (id) => {
        //console.log(id);

        codeblast_enter(handle, id);
      });
    }
  });

  document.querySelector('.generateQuestions').addEventListener("click", (e) => {
    e.preventDefault();
    var user = firebase.auth().currentUser;
    db.collection("handles")
      .where("email", "==", user.email)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const handle_list = doc.data();
          if(handle_list.batches!=undefined){
            let ul=document.querySelector(".handlesForSlot");
            for(let i=0;i<handle_list.batches.length;i++){
              let li=document.createElement('li');
              li.innerHTML=handle_list.batches[i];
              ul.appendChild(li);
            }
            
          }
          document.querySelector('#formSlot').addEventListener("submit",(e)=>{
            e.preventDefault();
            let inp=document.querySelector(".handleslot").value;
            async function find_user() {
              let modified_url ="https://codeforces.com/api/user.info?handles=" + inp;
              const jsondata = await fetch(modified_url);
              const jsdata = await jsondata.json();
              if (jsdata.status === "FAILED") {
                display_error();
              } else {
                let batches_array=handle_list.batches;
                if(batches_array==undefined){
                  batches_array=[];
                  batches_array.push(inp)
                  db.collection("handles").add({
                    email: handle_list.email,
                    handle: handle_list.handle,
                    target: handle_list.target,
                    bookmarks: handle_list.bookmarks,
                    road_map_progress: handle_list.road_map_progress,
                    batches:batches_array
                  }).then(()=>{
                    let ul=document.querySelector(".handlesForSlot");
                    let li=document.createElement('li');
                    li.innerHTML=inp;
                    ul.appendChild(li);
                  });
                  db.collection("handles").doc(doc.id).delete();
                }
                else{
                  batches_array.push(inp);
                  db.collection("handles").doc(doc.id).update({
                    batches: batches_array,
                  }).then(()=>{
                    let ul=document.querySelector(".handlesForSlot");
                    let li=document.createElement('li');
                    li.innerHTML=inp;
                    ul.appendChild(li);
                  });
                }
              }
            }
            find_user();
          })
          document.querySelector("#generateQuestionsSlot").addEventListener("submit",(e)=>{
            e.preventDefault();
            let numberOfQuestions=document.querySelector("#numberOfQuestionsSlot").value;
            let downRange=document.querySelector("#downRangeSlot").value;
            let upperRange=document.querySelector("#upperrangeSlot").value;
            let ul=document.querySelector(".handlesForSlot");
            let handle_array=[];
            for(let i=0; i<ul.children.length;i++){
              handle_array.push(ul.children[i].innerHTML);
            }
            let problems=aajaProblemsBhai(handle_array,upperRange,downRange,numberOfQuestions);
            //["ID",Link]
            let ule=document.querySelector(".problemsForSlot");
            for(let i=0;i<problem.length;i++){
              let problem=document.createElement("li");
              problem.innerHTML=`<a href="${problems[i][1]}" target="_blank">${problems[i][0]}</a>`

              ule.appendChild(problem);
            }
          })
          document.querySelector('.formForSlot').classList.remove("hidden");
          document.querySelector('.codeBlastBtns').classList.add("hidden");
        });
      });
  })
}
function aajaProblemsBhai(handles,uR,dR,n){
  
}