import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { penaltiesUrls } from "../../modules/penaltiesUrls.js";

export class EditPenaltyPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
  }

  getHTML(data = {}) {
    return `
            <div class="container mt-4" style="max-width: 600px;">
                <h1>Изменение услуги №${data.id || this.id}</h1>
                <div id="add-form-container" class="mt-4">
                    <div class="mb-3">
                        <label class="form-label">Название</label>
                        <input type="text" id="input-title" class="form-control" value="${data.title || ""}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Описание</label>
                        <textarea id="input-description" class="form-control" rows="3">${data.description || ""}</textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Стоимость (₽)</label>
                        <input type="number" id="input-fine" class="form-control" value="${data.fine || ""}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Ссылка на картинку (URL)</label>
                        <input type="text" id="input-src" class="form-control" value="${data.src || ""}">
                    </div>
                    <div class="d-flex gap-2 mt-4">
                      <button id="save-edit-btn" class="btn text-white" style="background-color: #804aff;">Сохранить изменения</button>
                    </div>
                </div>
            </div>
        `;
  }

  async getData() {
    try {
      const data = await ajax.get(penaltiesUrls.getPenaltyById(this.id));
      this.render(data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  }

  async savePenalty() {
    const updatedData = {
      title: document.getElementById("input-title").value,
      description: document.getElementById("input-description").value,
      fine: parseInt(document.getElementById("input-fine").value),
      src: document.getElementById("input-src").value,
    };

    try {
      const url = penaltiesUrls.updatePenaltyById(this.id);
      await ajax.patch(url, updatedData);
      const mainPage = new MainPage(this.parent);
      mainPage.render();
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
    }
  }

  render(data) {
    if (!data) {
      this.getData();
      return;
    }
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));

    const saveBtn = document.getElementById("save-edit-btn");
    if (saveBtn) {
      saveBtn.onclick = () => this.savePenalty();
    }
  }
}