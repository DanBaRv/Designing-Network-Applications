class RulesUrls {
  constructor() {
    this.baseUrl = "http://localhost:3001";
  }

  getRules() {
    return `${this.baseUrl}/rules`;
  }

  getRulesById(id) {
    return `${this.baseUrl}/rules/${id}`;
  }

  createRules() {
    return `${this.baseUrl}/rules`;
  }

  removeRulesById() {
    return `${this.baseUrl}/rules/${id}`;
  }

  updateRulesById() {
    return `${this.baseUrl}/rules/${id}`;
  }
}

export const rulesUrls = new RulesUrls();
