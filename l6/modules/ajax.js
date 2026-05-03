class Ajax {
  async get(url) {
    try {
      console.log("Отправляю запрос по адресу:", url);
      const response = await window.fetch(url); 
      return await response.json();
    } catch (e) {
      console.error("Ошибка GET:", e);
    }
  }

  async post(url, data) {
    try {
      const response = await window.fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (e) {
      console.error("Ошибка POST:", e);
    }
  }

  async patch(url, data) {
    try {
      const response = await window.fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (e) {
      console.error("Ошибка PATCH:", e);
    }
  }

  async delete(url) {
    try {
      const response = await window.fetch(url, { method: "DELETE" });
      return response.status === 204 ? null : await response.json();
    } catch (e) {
      console.error("Ошибка DELETE:", e);
    }
  }
}

export const ajax = new Ajax();
