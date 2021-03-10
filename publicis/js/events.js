function events_init() {
  let dashboard_nav = document.querySelectorAll(".dashboard");
  let compare_nav = document.querySelectorAll(".compare");
  let profile_nav = document.querySelectorAll(".profile");
  let codeblast_nav = document.querySelectorAll(".codeblast");
  let community_nav = document.querySelectorAll(".community");
  let topic_Wise_nav = document.querySelectorAll(".topic_wise");
  let level_wise_nav = document.querySelectorAll(".level_wise");
  let sorting_vis_nav = document.querySelectorAll(".sorting_vis_pls");
  let grid_vis_nav = document.querySelectorAll(".grid_vis_pls");
  let feedback_nav = document.querySelectorAll(".feedback");

  let dotodashbtn = document.querySelectorAll(".gotodash");
  for (let i = 0; i < dotodashbtn.length; i++) {
    dotodashbtn[i].addEventListener("click", () => {
      show_screen(dashboard_screen);
    });
  }

  let roadmap_nav = document.querySelectorAll(".roadmap_nav");

  for (let i = 0; i < dashboard_nav.length; i++) {
    dashboard_nav[i].addEventListener("click", function (e) {
      dashboard(handle);
      e.preventDefault();
    });
  }
  for (let i = 0; i < compare_nav.length; i++) {
    compare_nav[i].addEventListener("click", function (e) {
      compare(handle);
      e.preventDefault();
    });
  }
  for (let i = 0; i < profile_nav.length; i++) {
    profile_nav[i].addEventListener("click", function (e) {
      profile(handle);
      e.preventDefault();
    });
  }
  
  for (let i = 0; i < feedback_nav.length; i++) {
    feedback_nav[i].addEventListener("click", function (e) {
      show_screen(feedback)
      e.preventDefault();
    });
  }
  for (let i = 0; i < codeblast_nav.length; i++) {
    // if(protection_mode==false)
    // {
    codeblast_nav[i].addEventListener("click", function (e) {
      if (protection_mode) {
        show_screen(index_screen);
        display_alert("You can't Access it as a guest. Register, Its Free!");
      } else {
        codeblast(handle);
      }
      e.preventDefault();
    });

    // }
  }
  for (let i = 0; i < topic_Wise_nav.length; i++) {
    topic_Wise_nav[i].addEventListener("click", function (e) {
      topic_wise(handle);
      e.preventDefault();
    });
  }
  for (let i = 0; i < level_wise_nav.length; i++) {
    level_wise_nav[i].addEventListener("click", function (e) {
      level_wise(handle);
      e.preventDefault();
    });
  }
  for (let i = 0; i < sorting_vis_nav.length; i++) {
    sorting_vis_nav[i].addEventListener("click", function (e) {
      sorting_vis();
      e.preventDefault();
    });
  }
  for (let i = 0; i < grid_vis_nav.length; i++) {
    grid_vis_nav[i].addEventListener("click", function (e) {
      grid_vis();
      e.preventDefault();
    });
  }

  for (let i = 0; i < community_nav.length; i++) {
    community_nav[i].addEventListener("click", function (e) {
      community();
      e.preventDefault();
    });
  }

  for (let i = 0; i < roadmap_nav.length; i++) {
    roadmap_nav[i].addEventListener("click", function (e) {
      if (protection_mode) {
        show_screen(index_screen);
        display_alert(
          "You can't Access it as a guest. Come in, just register, It would take a sec."
        );
      } else {
        roadmap(handle);
      }
      e.preventDefault();
    });
  }

  const hamburger = document.querySelectorAll(".hamburger");
  const navlinks = document.querySelectorAll(".nav-links");
  const links = document.querySelector(".nav-links li");
  for (let i = 0; i < hamburger.length; i++) {
    hamburger[i].addEventListener("click", () => {
      for (let j = 0; j < navlinks.length; j++) {
        navlinks[j].classList.toggle("open");
      }
    });
  }

  const logout2 = document.querySelectorAll(".logout2");

  for (let i = 0; i < logout2.length; i++) {
    logout2[i].addEventListener("click", (e) => {
      e.preventDefault();
      if (protection_mode) {
        show_screen(index_screen);
      } else {
        auth.signOut();
      }
    });
  }
}
