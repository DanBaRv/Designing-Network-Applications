class PenaltiesUrls {
  constructor() {
    this.baseUrl = "http://localhost:3001";
  }

  getPenalties() {
    return `${this.baseUrl}/penalties`;
  }

  getPenaltyById(id) {
    return `${this.baseUrl}/penalties/${id}`;
  }

  createPenalty() {
    return `${this.baseUrl}/penalties`;
  }

  removePenaltyById(id) {
    return `${this.baseUrl}/penalties/${id}`;
  }

  updatePenaltyById(id) {
    return `${this.baseUrl}/penalties/${id}`;
  }
}

export const penaltiesUrls = new PenaltiesUrls();