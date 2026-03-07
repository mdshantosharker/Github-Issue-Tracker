const allIssues = (id) => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues").then((res) =>
    res.json().then((data) => allIssuesDisplay(data.data, id)),
  );
};

allIssues("all");

let allBtnArray = 0;
let openBtnArray = 0;
let closedBtnArray = 0;

const allIssuesDisplay = (issues, id) => {
  openBtnArray = 0;
  closedBtnArray = 0;
  allBtnArray = 0;
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  issues.forEach((issue) => {
    if (issue.status == "open") {
      openBtnArray++;
    }
    if (issue.status == "closed") {
      closedBtnArray++;
    }
    if (issue.status == "open" || issue.status == "closed") {
      allBtnArray++;
    }
    if (id === "all" || issue.status == id) {
      const card = document.createElement("div");
      card.innerHTML = `
        <div class="card bg-base-100 flex flex-col h-full shadow-sm  border-t-4 ${issue.status === "open" ? " border-green-400" : " border-purple-400"} ">
              <div class="p-4">
                <div class="flex justify-between items-center pb-2">
                  <img  src= "${issue.status === "open" ? "/assets/Open-Status.png" : "/assets/Closed- Status .png"}" alt="" />

                  <div class="${issue.priority.toUpperCase() === "HIGH" ? "bg-red-200" : issue.priority.toUpperCase() === "MEDIUM" ? "bg-yellow-200" : "bg-gray-200"} rounded-2xl px-6 py-1">

                    <h1 class="text-[12px] ${issue.priority.toUpperCase() == "HIGH" ? "text-red-500" : issue.priority.toUpperCase() === "MEDIUM" ? "text-[#F59E0B]" : "text-gray-500"}">${issue.priority.toUpperCase()}</h1>
                  </div>



                </div>
                <h1 class="font-semibold text-xl  pb-2 title">
                  ${issue.title}
                </h1>
                <p class="text-[#64748B]  pb-5 description text-sm">
                  ${issue.description}
                </p>
    
                <div class="flex  items-center gap-5 pb-2">
                  <div
                    class="bg-red-200 rounded-2xl px-2 py-1  flex items-center gap-2 text-red-500"
                  >
                    <i class="fa-solid fa-bug "></i>
                    <h1 class="text-[12px]">BUG</h1>
                  </div>
                  <div
                    class="bg-[#FDE68A]/60 rounded-2xl px-2 py-1 flex items-center gap-2 text-[#f18408]"
                  >
                   <div class="flex items-center gap-1">
                     <i class="fa-solid fa-life-ring"></i>
                    <h1 class="text-[12px]">HELP WANTED</h1>
                   </div>
                  </div>
                </div>
                <hr class="border border-gray-300 mt-3 " />
    
                <div class="pt-2">
                  <h1 class="text-[#64748B]">${issue.author}</h1>
                  <h2 class="text-[#64748B]">${issue.createdAt}</h2>
                </div>
              </div>
            </div> 
        `;
      cardContainer.append(card);
    }
  });
  // console.log(openBtnArray);
};

const btnAll = (id) => {
  allIssues(id);
};

const numberIssus = document.getElementById("numberIssus");

const allBtn = document.getElementById("all");
allBtn.addEventListener("click", () => {
  removeBtnColor();
  allBtn.classList.add("btn-primary");
  numberIssus.innerText = allBtnArray;
});
const openBtn = document.getElementById("open");
openBtn.addEventListener("click", () => {
  removeBtnColor();
  openBtn.classList.add("btn-primary");
  numberIssus.innerText = openBtnArray;
});
const closed = document.getElementById("closed");
closed.addEventListener("click", () => {
  removeBtnColor();
  closed.classList.add("btn-primary");
  numberIssus.innerText = closedBtnArray;
});

const removeBtnColor = () => {
  const btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    btn.classList.remove("btn-primary");
  });
};
