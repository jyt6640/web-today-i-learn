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