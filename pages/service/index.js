import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ServiceAccordionComponent } from "../../components/service-accordion/index.js";

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
        src: "./pages/service/registration(1).png",
      },
      2: {
        id: 2,
        title: "Оспаривание штрафа",
        detailedText:
          "Анализ фото- и видеофиксации нарушения, подготовка жалобы в МАДИ или ГИБДД.",
        duration: "от 5 до 10 дней",
        guarantee: "Возврат средств при неудаче",
        src: "./pages/service/challenging the fine(1).png", 
      },
      3: {
        id: 3,
        title: "Курс вождения",
        detailedText:
          "Индивидуальное занятие с инструктором. Отработка маневров и экстренного торможения.",
        duration: "90 минут",
        guarantee: "Сертификат об окончании",
        src: "./pages/service/driving course(1).png",
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
      `<h1 class="mt-4 mb-3">${data.title}</h1>`,
    );


     this.pageRoot.insertAdjacentHTML(
       "beforeend",
       `
        <div class="mb-4 ">
            <img src="${data.src}" 
                 class="img-fluid" 
                 style="height: 500px; border-radius: 20px" 
                 alt="${data.title}">
        </div>
    `,
     );

    const accordion = new ServiceAccordionComponent(this.pageRoot);
    accordion.render(data);
  }
}
