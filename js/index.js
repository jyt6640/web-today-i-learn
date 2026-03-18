// 마인크래프트 블록 파티클 트레일
const TRAIL_COLORS = ["#5d9e32", "#8b5a2b", "#9e9e9e", "#6a3c1f", "#4a7c59", "#c6b96b"];
let lastTrail = 0;

document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastTrail < 40) return;
  lastTrail = now;

  const pixel = document.createElement("div");
  pixel.classList.add("pixel-trail");
  pixel.style.backgroundColor =
    TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
  pixel.style.left = e.clientX - 4 + "px";
  pixel.style.top = e.clientY - 4 + "px";

  document.body.appendChild(pixel);
  setTimeout(() => pixel.remove(), 500);
});

// TIL 기능
const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");

const STORAGE_KEY = "tilItems";

// 저장된 TIL 불러오기
function getTilItems() {
  const storedItems = localStorage.getItem(STORAGE_KEY);

  if (!storedItems) {
    return [];
  }

  return JSON.parse(storedItems);
}

// TIL 저장하기
function saveTilItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// TIL 카드 하나 생성
function createTilItem(item, index) {
  const tilItem = document.createElement("article");
  tilItem.classList.add("til-item");

  tilItem.innerHTML = `
    <div class="til-item-header">
      <time>${item.date}</time>
      <button type="button" class="delete-btn">삭제</button>
    </div>
    <h3>${item.title}</h3>
    <p>${item.content}</p>
  `;

  const deleteButton = tilItem.querySelector(".delete-btn");

  deleteButton.addEventListener("click", function () {
    const items = getTilItems();
    items.splice(index, 1);
    saveTilItems(items);
    renderTilItems();
  });

  return tilItem;
}

// 화면 다시 그리기
function renderTilItems() {
  const items = getTilItems();

  tilList.innerHTML = "";

  items.forEach(function (item, index) {
    const tilItem = createTilItem(item, index);
    tilList.appendChild(tilItem);
  });
}

// 폼 제출 시 새 TIL 추가
tilForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const date = document.querySelector("#til-date").value;
  const title = document.querySelector("#til-title").value;
  const content = document.querySelector("#til-content").value;

  const newItem = {
    date: date,
    title: title,
    content: content,
  };

  const items = getTilItems();
  items.unshift(newItem);

  saveTilItems(items);
  renderTilItems();
  tilForm.reset();
});

// 처음 페이지 로드 시 기존 데이터 출력
renderTilItems();