import { ServiceCardComponent } from "../../components/service-card/index.js";
import { ServicePage } from "../service/index.js";

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

  getData() {
    return [
      {
        id: 1,
        title: "Регистрация СИМ",
        text: "Внесение серийного номера самоката в базу мониторинга.",
        price: 1500,
        src: "./pages/service/registration(1).png",
      },
      {
        id: 2,
        title: "Оспаривание штрафа",
        text: "Юридическая помощь при ошибочном штрафе с камер.",
        price: 2500,
        src: "./pages/service/challenging the fine(1).png",
      },
      {
        id: 3,
        title: "Курс вождения",
        text: "Практическое обучение ПДД на спецплощадке.",
        price: 1000,
        src: "./pages/service/driving course(1).png",
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
                
                <div class="mb-4">
                    <input type="text" id="search-input" class="form-control w-50" placeholder="Поиск услуги...">
                </div>

                <div id="main-page" class="d-flex flex-wrap justify-content-start"></div>
                <div id="stats-container" class="mt-5 p-3 bg-light border-top"></div>
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

  renderCards(data) {
    this.pageRoot.innerHTML = "";
    data.forEach((item) => {
      const card = new ServiceCardComponent(this.pageRoot);
      card.render(item, this.clickCard.bind(this));
    });
  }

  render() {
    this.parent.innerHTML = "";
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);

    document
      .getElementById("search-input")
      .addEventListener("input", this.clickSearch.bind(this));

    const data = this.getData();
    this.renderCards(data);

    const stats = this.calculateStats(data);
        document.getElementById("stats-container").innerHTML = `
            <h6>Результаты:</h6>
            <span>Суммарная стоимость: <strong>${stats.sum} ₽</strong> | </span>
            <span>Произведение цен: <strong>${stats.mult}</strong></span>
              `;
  }
}
