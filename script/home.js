const allIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues").then((res) =>
    res.json().then((data) => allIssuesDisplay(data.data)),
  );
};

allIssues();

const allIssuesDisplay = (issues) => {
  const cardContainer = document.getElementById("card-container");
  console.log(cardContainer);
  issues.forEach((issue) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="card bg-base-100 shadow-sm border-t-3 border-green-400">
          <div class="p-4">
            <div class="flex justify-between items-center pb-2">
              <img src="/assets/Open-Status.png" alt="" />
              <div class="bg-red-200 rounded-2xl px-6 py-1">
                <h1 class="text-red-500 text-[12px]">HIGH</h1>
              </div>
            </div>
            <h1 class="font-semibold text-xl  pb-2">
              ${issue.title}
            </h1>
            <p class="text-[#64748B]  pb-2">
              ${issue.description}
            </p>

            <div class="flex justify-between items-center  pb-2">
              <div
                class="bg-red-200 rounded-2xl px-2 py-1  flex items-center gap-2 text-red-500"
              >
                <i class="fa-solid fa-bug "></i>
                <h1 class="text-[10px]">BUG</h1>
              </div>
              <div
                class="bg-[#FDE68A]/60 rounded-2xl px-2 py-1 flex items-center gap-2 text-[#f18408]"
              >
               <div class="flex items-center gap-1">
                 <i class="fa-solid fa-life-ring"></i>
                <h1 class="text-[10px]">HELP WANTED</h1>
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
    // console.log(element);
  });
};
