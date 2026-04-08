import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ServiceAccordionComponent } from "../../components/service-accordion/index.js";
import { renderModel } from "../../utils/three-renderer.js";

export class ServicePage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
  }

  getData() {
    const services = {
      1: {
        id: 1,
        title: "Регистрация СИМ",
        detailedText:
          "Мы берем на себя все бюрократические процессы по внесению вашего электросамоката в реестр средств индивидуальной мобильности.",
        duration: "2 рабочих дня",
        guarantee: "Бессрочно",
        model: "models/Scooter.glb",
      },
      2: {
        id: 2,
        title: "Оспаривание штрафа",
        detailedText:
          "Анализ фото- и видеофиксации нарушения, подготовка жалобы в МАДИ или ГИБДД.",
        duration: "от 5 до 10 дней",
        guarantee: "Возврат средств при неудаче",
        model: "models/Security Hat.glb",
      },
      3: {
        id: 3,
        title: "Курс вождения",
        detailedText:
          "Индивидуальное занятие с инструктором. Отработка маневров и экстренного торможения.",
        duration: "90 минут",
        guarantee: "Сертификат об окончании",
        model: "models/helmet.glb",
      },
    };
    return services[this.id];
  }

  getHTML() {
    return `<div id="service-page" class="container py-4"></div>`;
  }

  get pageRoot() {
    return document.getElementById("service-page");
  }

  clickBack() {
    const mainPage = new MainPage(this.parent);
    mainPage.render();
  }

  render() {
    this.parent.innerHTML = "";
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);

    const data = this.getData();

    const backButton = new BackButtonComponent(this.pageRoot);
    backButton.render(this.clickBack.bind(this));

    this.pageRoot.insertAdjacentHTML(
      "beforeend",
      `<h1 class="mt-4">${data.title}</h1>`,
    );

    this.pageRoot.insertAdjacentHTML(
      "beforeend",
      `
        <div class="mb-4">
            <canvas id="detail-canvas" style="width: 100%; height: 400px; background: #eee; border-radius: 15px;"></canvas>
        </div>
    `,
    );

    const canvas = document.getElementById("detail-canvas");
    renderModel(data.model, canvas);

    const accordion = new ServiceAccordionComponent(this.pageRoot);
    accordion.render(data);
  }
}
