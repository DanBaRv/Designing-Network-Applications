export class ServiceCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  isPalindrome(str) {
    let cleaned = String(str).toLowerCase().replaceAll(" ", "");
    return cleaned === cleaned.split("").reverse().join("");
  }

  getHTML(data) {
    const pal = this.isPalindrome(data.title);
    return `
            <div class="col">
                <div class="card h-100 shadow-sm border-0" style="border-radius: 25px; overflow: hidden;">
                    <!-- На главной отображаем обычное фото -->
                    <img src="${data.src}" class="card-img-top" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">
                            ${data.title}
                            ${pal ? '<span class="badge bg-success" style="font-size: 0.6rem;">Палиндром</span>' : ""}
                        </h5>
                        <p class="card-text text-muted small">${data.text}</p>
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <span class="fw-bold">${data.price} ₽</span>
                            <button class="btn btn-purple btn-sm" id="btn-${data.id}">Подробнее</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  render(data, listener) {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));
    document.getElementById(`btn-${data.id}`).onclick = listener;
  }
}
