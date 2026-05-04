import { ServiceCardComponent } from "../../components/service-card/index.js";
import { ServicePage } from "../service/index.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent;
  }

  getData() {
    return [
      {
        id: 1,
        title: "Регистрация СИМ",
        text: "Внесение в базу мониторинга.",
        price: 1500,
        src: "./pages/service/registration(1).png",
        model: "models/Scooter.glb",
      },
      {
        id: 2,
        title: "Оспаривание штрафа",
        text: "Юридическая помощь МАДИ.",
        price: 2500,
        src: "./pages/service/challenging the fine(1).png",
        model: "models/Security Hat.glb",
      },
      {
        id: 3,
        title: "Курс вождения",
        text: "Практика на спецплощадке.",
        price: 1000,
        src: "./pages/service/driving course(1).png",
        model: "models/helmet.glb",
      },
    ];
  }

  calculateTotal(data) {
    return data.reduce((sum, item) => sum + item.price, 0);
  }

  getHTML() {
    return `
            <nav class="navbar navbar-dark bg-purple mb-4">
                <div class="container">
                    <span class="navbar-brand">Услуги контроля ПДД самокатов</span>
                    <button class="btn btn-outline-light btn-sm" id="nav-home">Домой</button>
                </div>
            </nav>
            <div class="container">
                <div class="mb-4">
                    <input type="text" id="search-input" class="form-control" placeholder="Поиск услуги...">
                </div>
                <div id="main-page-grid" class="row row-cols-1 row-cols-md-2 g-4"></div>
            </div>
        `;
  }

  render() {
    this.parent.innerHTML = this.getHTML();
    document.getElementById("nav-home").onclick = () => this.render();

    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", (e) => {
      const search = e.target.value.toLowerCase();
      const filtered = this.getData().filter((it) =>
        it.title.toLowerCase().includes(search),
      );
      this.renderCards(filtered);
    });

    this.renderCards(this.getData());
  }

  renderCards(data) {
    const grid = document.getElementById("main-page-grid");
    grid.innerHTML = "";
    data.forEach((item) => {
      const card = new ServiceCardComponent(grid);
      card.render(item, () => {
        const servicePage = new ServicePage(this.parent, item.id);
        servicePage.render();
      });
    });
  }
}
