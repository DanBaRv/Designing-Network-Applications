import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class AddRulePage {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML() {
    return `
            <div class="container mt-4" style="max-width: 600px;">
                <h1>Новая услуга</h1>
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
                    
                    <div id="back-btn-place"></div>
                </div>
            </div>
        `;
  }

  clickBack() {
    const mainPage = new MainPage(this.parent);
    mainPage.render();
  }

  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());

    const backButton = new BackButtonComponent(
      document.getElementById("back-btn-place"),
    );
    backButton.render(this.clickBack.bind(this));
  }
}
