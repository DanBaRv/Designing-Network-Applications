import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ServiceAccordionComponent } from "../../components/service-accordion/index.js";
import { rulesUrls } from "../../modules/rulesUrls.js";
import { ajax } from "../../modules/ajax.js";

export class ServicePage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
  }

  getData() {
    ajax.get(rulesUrls.getRulesById(this.id), (data) => {
      this.renderData(data);
    });
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
    ////////////////////////
    renderData(data) {
      if (!data) return;
      this.pageRoot.insertAdjacentHTML(
        "beforeend",
        `<h1 class="mt-4 mb-3">${data.title}</h1>`,
      );

      this.pageRoot.insertAdjacentHTML(
        "beforeend",
        `
        <div class="mb-4">
            <img src="${data.src}" 
                 class="img-fluid" 
                 style="height: 500px; border-radius: 20px; object-fit: cover;" 
                 alt="${data.title}">
        </div>
      `,
      );
      const accordion = new ServiceAccordionComponent(this.pageRoot);
      accordion.render(data);
    }

    ////////////////////////

  render() {
    this.parent.innerHTML = "";

    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);


    const backButton = new BackButtonComponent(this.pageRoot);
    backButton.render(this.clickBack.bind(this));
    this.getData();
  }
}
