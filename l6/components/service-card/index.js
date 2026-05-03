export class ServiceCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  isPalindrom(str) {
    let cleaned = String(str).toLowerCase().replaceAll(" ", "");
    let reversed = cleaned.split("").reverse().join("");
    return cleaned === reversed;
  }

  getMaxWordLength(str) {
    const words = str.split(" ");
    let maxLen = 0;
    words.forEach((word) => {
      if (word.length > maxLen) maxLen = word.length;
    });
    return maxLen;
  }

  getHTML(data) {
    const isPal = this.isPalindrom(data.title);
    const maxWord = this.getMaxWordLength(data.description);

    return `
            <div class="card" style="width: 18rem; margin: 10px; border-radius: 32px">
                <img class="card-img-top" src="${data.src}" alt="${data.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title"> 
                        ${data.title}
                        ${isPal ? '<span class="badge bg-success">Палиндром!</span>' : ""}
                    </h5>
                    <p class="card-text">${data.description}</p>
                    
                    <p class="text-muted" style="font-size: 0.75rem;">
                        Анализ текста: Макс. слово = ${maxWord} симв.
                    </p>
                    
                    <div class="mt-auto">
                        <p class="fw-bold">Стоимость: ${data.fine} ₽</p>
                        <button class="btn btn-danger btn-sm" id="click-card-${data.id}" data-id="${data.id}">
                            Подробнее
                        </button>

                        <button class="btn btn-danger btn-sm" id="click-card-${data.id}-edit" data-id-edit="${data.id}">
                            Изменить
                        </button>
                        <button class="btn btn-danger btn-sm" id="click-card-${data.id}-delete" data-id-delete="${data.id}">
                            Удалить
                        </button>

                    </div>
                </div>
            </div>
        `;
  }

  addListeners(data, listener) {
    document
      .getElementById(`click-card-${data.id}`)
      .addEventListener("click", listener);
  }
  addListenersEdit(data, listener) {
    document
      .getElementById(`click-card-${data.id}-edit`)
      .addEventListener("click", listener);
  }
  addListenersDelete(data, listener) {
    document
      .getElementById(`click-card-${data.id}-delete`)
      .addEventListener("click", listener);
  }
  render(data, listener, editListener, deleteListener) {
    const html = this.getHTML(data);
    this.parent.insertAdjacentHTML("beforeend", html);
    this.addListeners(data, listener);
    this.addListenersEdit(data, editListener);
    this.addListenersDelete(data, deleteListener);
  }
}
