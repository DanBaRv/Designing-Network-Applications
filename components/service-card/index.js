import { renderModel } from "../../utils/three-renderer.js";
export class ServiceCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    return `
            <div class="card" style="width: 18rem; margin: 10px; border-radius: 32px">
<canvas id="canvas-${data.id}" style="width: 100%; height: 200px; background: #eee;"></canvas>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
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

    const canvas = document.getElementById(`canvas-${data.id}`);
    renderModel(data.model, canvas);

    this.addListeners(data, listener);
  }
}
