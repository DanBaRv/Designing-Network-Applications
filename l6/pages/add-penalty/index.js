import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js"; 
import { penaltiesUrls } from "../../modules/penaltiesUrls.js"; 

export class AddPenaltyPage {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML() {
    return `
            <div class="container mt-4" style="max-width: 600px;">
                <h1>Новая услуга</h1>
                <div id="error-message" class="alert alert-danger d-none" role="alert"></div>
                <div id="add-form-container" class="mt-4">
                    <div class="mb-3">
                        <label class="form-label">Название</label>
                        <input type="text" id="input-title" class="form-control" placeholder="Например: Проверка штрафов">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Описание</label>
                        <textarea id="input-description" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Стоимость (₽)</label>
                        <input type="number" id="input-fine" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Ссылка на картинку (URL)</label>
                        <input type="text" id="input-src" class="form-control" value="./pages/service/default.png">
                    </div>
                    <div class="d-flex align-items-center gap-2 mt-4">
                      <button id="save-add-btn" class="btn text-white" style="background-color: #804aff;">Сохранить изменения</button>
                    </div>
                </div>
            </div>
        `;
  }

  async savePenalty() {
    const errorBlock = document.getElementById("error-message");
    errorBlock.classList.add("d-none");

    const addData = {
      title: document.getElementById("input-title").value,
      description: document.getElementById("input-description").value,
      fine: parseInt(document.getElementById("input-fine").value) || 0,
      src: document.getElementById("input-src").value,
    };

    if (!addData.title || !addData.description) {
      errorBlock.textContent = "Ошибка: Заполните название и описание!";
      errorBlock.classList.remove("d-none"); 
      return;
    }

    try {
      await ajax.post(penaltiesUrls.createPenalty(), addData);
      const mainPage = new MainPage(this.parent);
      mainPage.render();
    } catch (error) {
      errorBlock.textContent = "Произошла сетевая ошибка при сохранении";
      errorBlock.classList.remove("d-none");
    }
  }

  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());
    document.getElementById("save-add-btn").onclick = () => this.savePenalty();
  }
}