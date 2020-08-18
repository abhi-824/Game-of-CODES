const users = [];
const user_states = [];
const problems=[];
const fetch = require("node-fetch");
function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}
function make_ready(id, username, room, state) {
  const user = { id, username, room, state };
  user_states.push(user);
  return user;
}
function allready() {
  // for(let i=0;i<user_states.length;i++)
  // {
  // console.log(users);
  // console.log(user_states);
  if (user_states.length === users.length) {
    return true;
  }
  // }
  return false;
}
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}
function retreiveSet(users) {
  let solved = new Set();
  for (let i = 0; i < users.length; i++) {
    let handle_name = users[i].username;
    async function getSetGo() {
      let modified_url = `https://codeforces.com/api/user.status?handle=${handle_name}`;
      const jsondata = await fetch(modified_url);
      const jsdata = await jsondata.json();
      for (let i = 0; i < jsdata.result.length; i++) {
        if (jsdata.result[i].verdict == "OK") {
          let str =
            jsdata.result[i].problem.contestId +
            "-" +
            jsdata.result[i].problem.index;
          solved.add(str);
        }
      }
    }
    getSetGo();
  }
  return solved;
}
function giveProblems() {
  let solved = retreiveSet(users);
  console.log(solved);
  async function getFinal() {
    let modified_url = `https://codeforces.com/api/problemset.problems`;
    const jsondata = await fetch(modified_url);
    const jsdata = await jsondata.json();
    for (let i = 0; i < jsdata.result.length; i++) {
      let str =
        jsdata.result[i].problem.contestId +
        "-" +
        jsdata.result[i].problem.index;
      if (
        jsdata.result[i].problem.rating > 900 &&
        jsdata.result[i].rating <= 1400 &&
        solved.has(str) === false
      ) {
        //to be continued
        problems.push({str,c);
      }
    }
  }
  getFinal();
}
module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  make_ready,
  allready,
  giveProblems,
};
