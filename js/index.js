// 마인크래프트 블록 파티클 트레일
const TRAIL_COLORS = ["#5d9e32", "#8b5a2b", "#9e9e9e", "#6a3c1f", "#4a7c59", "#c6b96b"];
let lastTrail = 0;

document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastTrail < 40) return; // 40ms 쓰로틀 (과하지 않게)
  lastTrail = now;

  const pixel = document.createElement("div");
  pixel.classList.add("pixel-trail");
  pixel.style.backgroundColor = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
  pixel.style.left = (e.clientX - 4) + "px";
  pixel.style.top  = (e.clientY - 4) + "px";

  document.body.appendChild(pixel);
  setTimeout(() => pixel.remove(), 500);
});

const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");

tilForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const date = document.querySelector("#til-date").value;
  const title = document.querySelector("#til-title").value;
  const content = document.querySelector("#til-content").value;

  const tilItem = document.createElement("article");
  tilItem.classList.add("til-item");

  tilItem.innerHTML = `
    <time>${date}</time>
    <h3>${title}</h3>
    <p>${content}</p>
  `;

  tilList.prepend(tilItem);

  tilForm.reset();
});