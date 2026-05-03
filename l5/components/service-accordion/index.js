export class ServiceAccordionComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    return `
      <div class="accordion mt-3" id="serviceAccordion" style="max-width: 600px;">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
              Описание услуги
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#serviceAccordion">
            <div class="accordion-body">
              ${data.description}
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
              Условия оказания
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#serviceAccordion">
            <div class="accordion-body">
              <strong>Срок:</strong> ${data.duration} <br>
              <strong>Гарантия:</strong> ${data.guarantee}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  ////////////////////////////////////////////
  render(data) {
    const html = this.getHTML(data);
    this.parent.insertAdjacentHTML("beforeend", html);
  }
}
