// Write js here
$(document).ready(function(){
  
    const url="https://codeforces.com/api/user.status?handle="
    
      async function getdata(){
          $("ul").empty()
        let modified_url=url+$("#test").val()
          const jsondata=await fetch(modified_url)
          const jsdata=await jsondata.json()
          console.log(jsdata.result)
          let unsolved=new Set()
          let solved=new Set()
          unsolved.clear()
          solved.clear()
    
          for(let i=0;i<jsdata.result.length;i++)
          {
              if(jsdata.result[i].verdict=="OK")
              {
                  let str=jsdata.result[i].problem.contestId+"-"+jsdata.result[i].problem.index
                  solved.add(
                      str
                  )
    
                  if(unsolved.has(str))
                  {
                      unsolved.delete(str)
                  }
    
              }
              else
              {
                let str=jsdata.result[i].problem.contestId+"-"+jsdata.result[i].problem.index
                if(!solved.has(str))
                {unsolved.add(
                    // jsdata.result[i].problem.contestId,
                    // contestIndex:jsdata.result[i].problem.index
                    str
                  )
                }
              }
          }
          console.log(solved)
          console.log(unsolved)
          for(let i of unsolved)
          {
              console.log(i)
          }
          for(let i of unsolved)
      {
        $("ul").append(i+"<br>")
      }
      }
      getdata()
    // $("button").click(getdata())
    $("button").click(function(){getdata()})
    
    });
    
