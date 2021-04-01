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
}
