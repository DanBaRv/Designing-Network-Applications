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
        detailedText: "Внесение вашего СИМ в федеральный реестр.",
        duration: "2 дня",
        guarantee: "Бессрочно",
        model: "models/Scooter.glb",
      },
      2: {
        id: 2,
        title: "Оспаривание штрафа",
        detailedText: "Помощь в отмене штрафа через МАДИ.",
        duration: "10 дней",
        guarantee: "Возврат при неуспехе",
        model: "models/Security Hat.glb",
      },
      3: {
        id: 3,
        title: "Курс вождения",
        detailedText: "Практика с инструктором на полигоне.",
        duration: "90 мин",
        guarantee: "Сертификат",
        model: "models/helmet.glb",
      },
    };
    return services[this.id];
  }

  render() {
    const data = this.getData();
    this.parent.innerHTML = `
        <nav class="navbar navbar-dark bg-purple mb-4">
            <div class="container">
                <span class="navbar-brand">Детали услуги</span>
                <button class="btn btn-outline-light btn-sm" id="btn-to-home">Домой</button>
            </div>
        </nav>
        <div class="container">
            <div class="row">
                <div class="col-md-7 mb-4">
                    <!-- На странице подробностей крутим 3D модель -->
                    <canvas id="detail-canvas" style="width: 100%; height: 450px; background: #eee; border-radius: 20px;"></canvas>
                </div>
                <div class="col-md-5">
                    <h1 class="fw-bold">${data.title}</h1>
                    <div id="accordion-place"></div>
                </div>
            </div>
        </div>
    `;

    document.getElementById("btn-to-home").onclick = () => {
      const main = new MainPage(this.parent);
      main.render();
    };

    // Запуск 3D рендеринга
    const canvas = document.getElementById("detail-canvas");
    renderModel(data.model, canvas);

    const accordion = new ServiceAccordionComponent(
      document.getElementById("accordion-place"),
    );
    accordion.render(data);
  }
}
