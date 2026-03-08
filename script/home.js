const manageLoader = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  } else {
    document.getElementById("card-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const allIssues = (id) => {
  manageLoader(true);
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
      
        <div onclick="modalBtn('${issue.id}')" class="card bg-base-100 flex flex-col h-full shadow-sm  border-t-4 ${issue.status === "open" ? " border-green-400" : " border-purple-400"} ">
              <div class="p-4">
                <div class="flex justify-between items-center pb-2">
                  <img  src= "${issue.status === "open" ? "/assets/Open-Status.png" : "/assets/Closed-Status.png"}" alt="" />

                  <div class="${issue.priority.toUpperCase() === "HIGH" ? "bg-red-200" : issue.priority.toUpperCase() === "MEDIUM" ? "bg-yellow-200" : "bg-gray-200"} rounded-2xl px-6 py-1">

                    <h1 class="text-[12px] ${issue.priority.toUpperCase() == "HIGH" ? "text-red-500" : issue.priority.toUpperCase() === "MEDIUM" ? "text-[#F59E0B]" : "text-gray-500"}">${issue.priority.toUpperCase()}</h1>
                  </div>
                </div>
                <h1 class="font-semibold text-xl  pb-2 title line-clamp-1">
                  ${issue.title}
                </h1>
                <p class="text-[#64748B]  pb-5 description text-sm line-clamp-1">
                  ${issue.description}
                </p>
    
                <div class="flex flex-wrap   items-center gap-2 pb-2 pt-5">
                  <div
                    class="bg-red-200 rounded-2xl px-2 py-1  flex items-center gap-2 text-red-500"
                  >
                    <i class="fa-solid fa-bug "></i>
                    <h1 class="text-[12px]">${issue.labels[0] === undefined ? "No Bug" : issue.labels[0]}BUG</h1>
                  </div>
                  <div
                    class="bg-[#FDE68A]/60 rounded-2xl px-2 py-1 flex items-center gap-2 text-[#f18408]"
                  >
                   <div class="flex items-center ">
                     <i class="fa-solid fa-life-ring"></i>
                    <h1 class="text-[12px]">${issue.labels[1] === undefined ? "No Help Need" : issue.labels[1]}</h1>
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
  manageLoader(false);
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
  const btns = document.querySelectorAll(".btn-issu");
  btns.forEach((btn) => {
    btn.classList.remove("btn-primary");
  });
};

const modalBtn = (id) => {
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`).then(
    (res) => res.json().then((data) => modalDetailsDisplay(data.data)),
  );
};

const modalDetailsDisplay = (word) => {
  const detailsContainer = document.getElementById("details-container");

  detailsContainer.innerHTML = `
  <div>
    <h1 class="font-bold text-xl mb-2">${word.title}</h1>

    <div class="flex gap-7 items-center">
      <div class="${
        word.status === "open" ? "bg-green-400" : "bg-purple-400"
      } px-2 text-[14px] rounded-xl text-white">
        ${word.status}
      </div>

      <li class="text-[#647488]">
        <p class="text-[12px]">Opened by ${word.author}</p>
      </li>

      <li class="text-[#647488]">
        <p class="text-[12px]">${word.createdAt}</p>
      </li>
    </div>

    <div class="flex flex-wrap items-center gap-2 pb-2 pt-5">

      <div class="bg-red-200 rounded-2xl px-2 py-1 flex items-center gap-2 text-red-500">
        <i class="fa-solid fa-bug"></i>
        <h1 class="text-[12px]">${word.labels?.[0] ?? "No"} BUG</h1>
      </div>

      <div class="bg-[#FDE68A]/60 rounded-2xl px-2 py-1 flex items-center gap-2 text-[#f18408]">
        <i class="fa-solid fa-life-ring"></i>
        <h1 class="text-[12px]">${word.labels?.[1] ?? "No Help Need"}</h1>
      </div>

    </div>

    <p class="text-[#64748B] text-[14px] mt-4">
      ${word.description}
    </p>

    <div class="bg-gray-200 p-4 rounded-md flex justify-around mt-5">
      <div>
        <p class="text-[#64748B]">Assignee:</p>
        <p class="font-bold">${word.author}</p>
      </div>

      <div>
        <p class="text-[#64748B]">Priority:</p>
        <div class="bg-red-500 px-3 rounded-xl text-white">
          ${word.priority}
        </div>
      </div>
    </div>

  </div>
  `;

  document.getElementById("word_modal").showModal();
};

document.getElementById("searchBtn").addEventListener("click", () => {
  const input = document.getElementById("inputSearch");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`).then((res) =>
    res.json().then((data) => {
      const allWord = data.data;
      const filterWords = allWord.filter((word) =>
        word.title.toLowerCase().includes(searchValue),
      );
      allIssuesDisplay(filterWords, "all");
      numberIssus.innerText = filterWords.length;
    }),
  );
});
