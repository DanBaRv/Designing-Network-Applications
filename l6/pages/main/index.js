import { ServiceCardComponent } from "../../components/service-card/index.js";
import { ServicePage } from "../service/index.js";
import { rulesUrls } from "../../modules/rulesUrls.js";
import { ajax } from "../../modules/ajax.js";
import { AddRulePage } from "../add-rule/index.js";
import { EditRulePage } from "../edit-rule/index.js";

rulesUrls.getRules();

export class MainPage {
  constructor(parent) {
    this.parent = parent;
  }

  calculateStats(data) {
    const prices = data.map((item) => item.price);
    let sum = 0;
    let mult = 1;
    prices.forEach((p) => {
      sum += p;
      mult *= p;
    });
    return { sum, mult };
  }

  async getData() {
    try {
      const data = await ajax.get(rulesUrls.getRules());

      this.renderData(data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  }

  get pageRoot() {
    return document.getElementById("main-page");
  }

  getHTML() {
    return `
            <div class="container mt-4">
                <h2 class="mb-4">Услуги контроля ПДД самокатов</h2>

                <div class="mb-4">
                    <input type="text" id="search-input" class="form-control w-50" placeholder="Поиск услуги...">
                </div>
                <button id="add-new-rule" class="btn btn-success">Добавить услугу</button>
                <div id="main-page" class="d-flex flex-wrap justify-content-start"></div>
            </div>
        `;
  }

  // поиск
  clickSearch(e) {
    const searchValue = e.target.value.toLowerCase();
    const data = this.getData();

    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(searchValue),
    );

    this.renderCards(filteredData);
  }

  clickCard(e) {
    const cardId = e.target.dataset.id;
    const servicePage = new ServicePage(this.parent, cardId);
    servicePage.render();
  }

  async clickDelete(e) {
    const id = e.target.dataset.idDelete;

   
      try {
        await ajax.delete(rulesUrls.removeRulesById(id));

        this.render();

        console.log(`Услуга ${id} удалена из файла rules.json`);
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    
  }

  renderCards(data) {
    this.pageRoot.innerHTML = "";
    data.forEach((item) => {
      const card = new ServiceCardComponent(this.pageRoot);
      card.render(item, this.clickCard.bind(this));
    });
  }



  clickEdit(e) {
    const cardId = e.target.dataset.idEdit;
    const addPage = new EditRulePage(this.parent, cardId);
    addPage.render();
  }

  ////////////////////////
  renderData(items) {
    if (!items) return;
    this.pageRoot.innerHTML = "";
    items.forEach((item) => {
      const serviceCard = new ServiceCardComponent(this.pageRoot);

      serviceCard.render(
        item,
        this.clickCard.bind(this),
        this.clickEdit.bind(this),
        this.clickDelete.bind(this),
      );
    });
  }
  ////////////////////////

  render() {
    this.parent.innerHTML = "";
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);

    const addBtn = document.getElementById("add-new-rule");
    if (addBtn) {
      addBtn.onclick = () => {
        console.log("Клик по кнопке 'Добавить' на главной!"); 
        const addPage = new AddRulePage(this.parent);
        addPage.render();
      };
    }

    this.getData();
  }
}
