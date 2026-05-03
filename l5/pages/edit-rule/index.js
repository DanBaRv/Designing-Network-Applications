import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { rulesUrls } from "../../modules/rulesUrls.js";

export class EditRulePage {
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
                        <input type="text" id="input-title" class="form-control" 
                               value="${data.title || ""}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Описание</label>
                        <textarea id="input-description" class="form-control" rows="3">${data.description || ""}</textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Стоимость (₽)</label>
                        <input type="number" id="input-fine" class="form-control" 
                               value="${data.fine || ""}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Ссылка на картинку (URL)</label>
                        <input type="text" id="input-src" class="form-control" 
                               value="${data.src || ""}">
                    </div>
                    
                    <div id="back-btn-place"></div>
                    <p class="text-muted mt-3"><small>* Сохранение будет в ЛР №6</small></p>
                </div>
            </div>
        `;
  }

  getData() {
    ajax.get(rulesUrls.getRulesById(this.id), (data) => {
      this.render(data);
    });
  }

  clickBack() {
    const mainPage = new MainPage(this.parent);
    mainPage.render();
  }

  render(data) {
    if (!data) {
      this.getData();
      return;
    }

    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));

    const backButton = new BackButtonComponent(
      document.getElementById("back-btn-place"),
    );
    backButton.render(this.clickBack.bind(this));
  }
}
