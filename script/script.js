const loginPart = document.getElementById("login_part");
const mainPart = document.getElementById("main_part");
const username = document.getElementById("username");
const pass = document.getElementById("pass");
const signinBtn = document.getElementById("signin_btn");
const newissue = document.getElementById("newissue");
const search = document.getElementById("search");
const closed=document.getElementById("closed");
const open=document.getElementById("open");
const all=document.getElementById("all");


const mainpage=()=>{
//     if(username.value === "admin" && pass.value === "admin123")
// {
//     loginPart.classList.add("hidden");
//     mainPart.classList.remove("hidden");
// }
// else{
//     alert("Wrong username or password.Please try again.")
// }
}
//modal part

const loadmodal=async(id)=>{
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res=await fetch(url);
    const details=await res.json();
    displaymodal(details.data);
};
const displaymodal=(word)=>{
    const detailsbox=document.getElementById("details_container");

    //label button part
         let labelBtn="";

    for (let label of word.labels) {
        let labelLower = label.toLowerCase();
      if (labelLower==="good first issue") {
        continue;
      }
      else if (labelLower==="enhancement") {
        labelBtn+=`
        <button class="btn btn-soft btn-success border border-green-500 rounded-full">
        ${label}
        </button>
        `;
      }
      else if(labelLower==="bug"){
        labelBtn+=`
        <button class="btn btn-soft btn-secondary border border-pink-700 rounded-full">
        ${label}
        </button>
        `;
      }
      else if(labelLower==="documentation"){
        labelBtn+=`
        <button class="btn btn-soft btn-info border border-blue-400 rounded-full">
        ${label}
        </button>
        `;
      }
      else{
        labelBtn+=`
        <button class="btn btn-soft btn-warning border border-yellow-700 rounded-full">
        ${label}
        </button>
        `;
      }
    }

    //modalhtml

    detailsbox.innerHTML=`
    
     <h3 class="text-2xl font-medium">${word.title}</h3>
        <div class=" flex gap-4">
            <p class="font-thin">Opened by</p>
            <p>${word.assignee}</p>
            <p> - <span>${word.updatedAt}</span></p>
        </div>
        <div>
            <button>${labelBtn}</button>
        </div>
        <p>${word.description}</p>
        <div class="grid grid-cols-2 bg-gray-100 p-5">
            <div class="space-y-2">
                <p>Assigned</p>
                <h3 class=" text-xl font-medium">
                ${word.assignee?word.assignee:"not found"}
                </h3>
            </div>
            <div class="space-y-2">
                <p>Priority</p>
                <button class="bg-red-800 rounded-full w-[100px] p-3 text-white">${word.priority}</button>
            </div>
        </div>
    
    `
    document.getElementById("word_modal").showModal();
}

let allIssue=[];
const loadData=()=>{
    all.classList.add("activecolour")
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=>res.json())
    .then((json)=>{
        allIssue=json.data;
        displaydata(allIssue);
    });
};
const displaydata=(allbtns)=>{
    const allDiv = document.getElementById("allDiv");
    allDiv.innerHTML="";

   
    for(let allbtn of allbtns)
    {

     //cardborder in top 
        let cardborder="";
        if(allbtn.status==="closed")
        {
            cardborder="border-t-6 border-purple-500"
        }
        else
        {
            cardborder="border-t-6 border-green-500"
        }
    //label button part
         let labelBtn="";

    for (let label of allbtn.labels) {
        let labelLower = label.toLowerCase();
      if (labelLower==="good first issue") {
        continue;
      }
      else if (labelLower==="enhancement") {
        labelBtn+=`
        <button class="btn btn-soft btn-success border border-green-500 rounded-full">
        ${label}
        </button>
        `;
      }
      else if(labelLower==="bug"){
        labelBtn+=`
        <button class="btn btn-soft btn-secondary border border-pink-700 rounded-full">
        ${label}
        </button>
        `;
      }
      else if(labelLower==="documentation"){
        labelBtn+=`
        <button class="btn btn-soft btn-info border border-blue-400 rounded-full">
        ${label}
        </button>
        `;
      }
      else{
        labelBtn+=`
        <button class="btn btn-soft btn-warning border border-yellow-700 rounded-full">
        ${label}
        </button>
        `;
      }
    }
    //priority button part
       let priorityLower = allbtn.priority.toLowerCase();
       let priorityBtn = "";

        if (priorityLower === "low") {
              priorityBtn = `<button class="btn btn-soft border border-gray-500 rounded-full">${allbtn.priority}</button>`;
           }
        else if (priorityLower === "high") {
             priorityBtn = `<button class="btn btn-soft btn-secondary border border-pink-700 rounded-full">${allbtn.priority}</button>`;
            }
        else if (priorityLower === "medium") {
             priorityBtn = `<button class="btn btn-soft btn-warning border border-yellow-700 rounded-full">${allbtn.priority}</button>`;
            }
      //html added
        const all=document.createElement("div");
        all.innerHTML=`
           <div onclick="loadmodal(${allbtn.id})" class="bg-slate-100 h-full flex flex-col max-w-[350px] md:max-w-[300px] lg:max-w-[256px] p-5 rounded-xl space-y-4 mx-auto mt-3 ${cardborder}">
            <div class="flex justify-end">
                ${priorityBtn}
            </div>
            <h4 class="text-xl font-medium">${allbtn.title}</h4>
            <p class="flex-grow font-thin">${allbtn.description}</p>
            <div class="flex gap-2 mb-4">
              <div class="flex gap-3 mb-4 flex-wrap">${labelBtn}</div>
            </div>
            <hr class="text-gray-300 mb-5">
            <p class="text-gray-400 text-xs mb-3">${allbtn.author}</p>
            <p class="text-gray-400 text-xs">${allbtn.createdAt}</p>
        </div>
        `
        allDiv.append(all);
    }
}
// open clicked function 
function showOpen(){
    const openBtn=allIssue.filter(allbtn=>allbtn.status==="open");
    all.classList.remove("activecolour");
    closed.classList.remove("activecolour");
    open.classList.add("activecolour");
    displaydata(openBtn);
}
// all clicked function 
function showAll(){
    displaydata(allIssue);

}
//closed clicked function
function showClosed(){
    const openBtn=allIssue.filter(allbtn=>allbtn.status==="closed");
    all.classList.remove("activecolour");
    open.classList.remove("activecolour");
    closed.classList.add("activecolour");

    displaydata(openBtn);
}
//main function
loadData();

