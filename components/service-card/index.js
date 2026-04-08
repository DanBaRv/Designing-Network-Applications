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
    const maxWord = this.getMaxWordLength(data.text); 

    return `
            <div class="card" style="width: 18rem; margin: 10px; border-radius: 32px">
                <img class="card-img-top" src="${data.src}" alt="${data.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title"> 
                        ${data.title}
                        ${isPal ? '<span class="badge bg-success">Палиндром!</span>' : ""}
                    </h5>
                    <p class="card-text">${data.text}</p>
                    
                    <p class="text-muted" style="font-size: 0.75rem;">
                        Анализ текста: Макс. слово = ${maxWord} симв.
                    </p>
                    
                    <div class="mt-auto">
                        <p class="fw-bold">Стоимость: ${data.price} ₽</p>
                        <button class="btn btn-danger w-100" id="click-card-${data.id}" data-id="${data.id}">
                            Подробнее
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

  render(data, listener) {
    const html = this.getHTML(data);
    this.parent.insertAdjacentHTML("beforeend", html);
    this.addListeners(data, listener);
  }
}
