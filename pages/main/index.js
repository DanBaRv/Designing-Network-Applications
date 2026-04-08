import { ServiceCardComponent } from "../../components/service-card/index.js";
import { ServicePage } from "../service/index.js";

import { getAllModelsFromDB, addModelToDB } from "../../utils/idb.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent;
  }

  getData() {
    return [
      {
        id: 1,
        title: "Регистрация СИМ",
        text: "Внесение серийного номера самоката в базу мониторинга.",
        price: 1500,
        model: "models/Scooter.glb",
      },
      {
        id: 2,
        title: "Оспаривание штрафа",
        text: "Юридическая помощь при ошибочном штрафе с камер.",
        price: 2500,
        model: "models/Security Hat.glb",
      },
      {
        id: 3,
        title: "Курс вождения",
        text: "Практическое обучение ПДД на спецплощадке.",
        price: 1000,
        model: "models/helmet.glb",
      },
    ];
  }

  get pageRoot() {
    return document.getElementById("main-page");
  }

  getHTML() {
    return `
            <div class="container mt-4">
                <h2 class="mb-4">Услуги контроля ПДД самокатов</h2>
                
                <div class="d-flex mb-4 gap-3">
                    <!-- Поиск -->
                    <input type="text" id="search-input" class="form-control w-50" placeholder="Поиск услуги...">
                    
                    <div class="input-group w-50">
                        <label class="input-group-text" for="upload-model">Загрузить 3D (.glb)</label>
                        <input type="file" id="upload-model" accept=".glb" class="form-control">
                    </div>
                </div>

                <div id="main-page" class="d-flex flex-wrap justify-content-start"></div>
            </div>
        `;
  }

  async handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const userTitle = prompt(
      "Введите название новой услуги:",
      "Новый электросамокат",
    );
    const userPrice = prompt("Введите стоимость услуги:", "1000");

    const reader = new FileReader();
    reader.onload = async (event) => {
      const newService = {
        title: userTitle || "Новая услуга",
        text: `Файл: ${file.name}`,
        price: userPrice || 0,
        buffer: event.target.result,
        isUser: true,
      };

      await addModelToDB(newService);
      this.refreshCards(); 
    };
    reader.readAsArrayBuffer(file);
  }

  clickSearch(e) {
    const searchValue = e.target.value.toLowerCase();
    this.currentSearch = searchValue;
    this.refreshCards();
  }

  clickCard(e) {
    const cardId = e.target.dataset.id;
    const servicePage = new ServicePage(this.parent, cardId);
    servicePage.render();
  }

  async refreshCards() {
    const standardData = this.getData();
    const userData = await getAllModelsFromDB();

    const combinedData = [
      ...standardData,
      ...userData.map((m) => ({
        ...m,
        id: `user-${m.id}`,
        model: m.buffer,
      })),
    ];

    const searchValue = this.currentSearch || "";
    const filteredData = combinedData.filter((item) =>
      item.title.toLowerCase().includes(searchValue),
    );

    this.renderCards(filteredData);
  }

  renderCards(data) {
    this.pageRoot.innerHTML = "";
    data.forEach((item) => {
      const card = new ServiceCardComponent(this.pageRoot);
      card.render(item, this.clickCard.bind(this));
    });
  }

  async render() {
    this.parent.innerHTML = "";
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);

    document
      .getElementById("search-input")
      .addEventListener("input", this.clickSearch.bind(this));

    document
      .getElementById("upload-model")
      .addEventListener("change", this.handleUpload.bind(this));

    await this.refreshCards();
  }
}
