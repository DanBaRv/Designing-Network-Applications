var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n,r=e((()=>{n=class{constructor(e){this.parent=e}isPalindrom(e){let t=String(e).toLowerCase().replaceAll(` `,``);return t===t.split(``).reverse().join(``)}getMaxWordLength(e){let t=e.split(` `),n=0;return t.forEach(e=>{e.length>n&&(n=e.length)}),n}getHTML(e){let t=this.isPalindrom(e.title),n=this.getMaxWordLength(e.description);return`
            <div class="card" style="width: 18rem; margin: 10px; border-radius: 32px">
                <img class="card-img-top" src="${e.src}" alt="${e.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title"> 
                        ${e.title}
                        ${t?`<span class="badge bg-success">Палиндром!</span>`:``}
                    </h5>
                    <p class="card-text">${e.description}</p>
                    
                    <p class="text-muted" style="font-size: 0.75rem;">
                        Анализ текста: Макс. слово = ${n} симв.
                    </p>
                    
                    <div class="mt-auto">
                        <p class="fw-bold">Стоимость: ${e.fine} ₽</p>
                        <button class="btn btn-danger btn-sm" id="click-card-${e.id}" data-id="${e.id}">
                            Подробнее
                        </button>

                        <button class="btn btn-danger btn-sm" id="click-card-${e.id}-edit" data-id-edit="${e.id}">
                            Изменить
                        </button>
                        <button class="btn btn-danger btn-sm" id="click-card-${e.id}-delete" data-id-delete="${e.id}">
                            Удалить
                        </button>

                    </div>
                </div>
            </div>
        `}addListeners(e,t){document.getElementById(`click-card-${e.id}`).addEventListener(`click`,t)}addListenersEdit(e,t){document.getElementById(`click-card-${e.id}-edit`).addEventListener(`click`,t)}addListenersDelete(e,t){document.getElementById(`click-card-${e.id}-delete`).addEventListener(`click`,t)}render(e,t,n,r){let i=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,i),this.addListeners(e,t),this.addListenersEdit(e,n),this.addListenersDelete(e,r)}}})),i,a=e((()=>{i=class{constructor(e){this.parent=e}addListeners(e){document.getElementById(`back-button`).addEventListener(`click`,e)}getHTML(){return`
        <button id="back-button" class="btn btn-dark" type="button" style="margin-top: 0px;">
            &larr; Вернуться к услугам
        </button>
    `}render(e){let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t),this.addListeners(e)}}})),o,s=e((()=>{o=class{constructor(e){this.parent=e}getHTML(e){return`
      <div class="accordion mt-3" id="serviceAccordion" style="max-width: 600px;">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
              Описание услуги
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#serviceAccordion">
            <div class="accordion-body">
              ${e.description}
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
              <strong>Срок:</strong> ${e.duration} <br>
              <strong>Гарантия:</strong> ${e.guarantee}
            </div>
          </div>
        </div>
      </div>
    `}render(e){let t=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,t)}}})),c,l,u=e((()=>{c=class{constructor(){this.baseUrl=`http://localhost:3001`}getRules(){return`${this.baseUrl}/rules`}getRulesById(e){return`${this.baseUrl}/rules/${e}`}createRules(){return`${this.baseUrl}/rules`}removeRulesById(e){return`${this.baseUrl}/rules/${e}`}updateRulesById(e){return`${this.baseUrl}/rules/${e}`}},l=new c})),d,f,p=e((()=>{d=class{async get(e){try{return console.log(`Отправляю запрос по адресу:`,e),await(await window.fetch(e)).json()}catch(e){console.error(`Ошибка GET:`,e)}}async post(e,t){try{return await(await window.fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)})).json()}catch(e){console.error(`Ошибка POST:`,e)}}async patch(e,t){try{return await(await window.fetch(e,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)})).json()}catch(e){console.error(`Ошибка PATCH:`,e)}}async delete(e){try{let t=await window.fetch(e,{method:`DELETE`});return t.status===204?null:await t.json()}catch(e){console.error(`Ошибка DELETE:`,e)}}},f=new d})),m,h=e((()=>{a(),x(),s(),u(),p(),m=class{constructor(e,t){this.parent=e,this.id=t}async getData(){try{let e=await f.get(l.getRulesById(this.id));this.renderData(e)}catch(e){console.error(`Ошибка при получении данных:`,e)}}getHTML(){return`<div id="service-page" class="container py-4"></div>`}get pageRoot(){return document.getElementById(`service-page`)}clickBack(){new b(this.parent).render()}renderData(e){e&&(this.pageRoot.insertAdjacentHTML(`beforeend`,`<h1 class="mt-4 mb-3">${e.title}</h1>`),this.pageRoot.insertAdjacentHTML(`beforeend`,`
        <div class="mb-4">
            <img src="${e.src}" 
                 class="img-fluid" 
                 style="height: 500px; border-radius: 20px; object-fit: cover;" 
                 alt="${e.title}">
        </div>
      `),new o(this.pageRoot).render(e))}render(){this.parent.innerHTML=``;let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e),new i(this.pageRoot).render(this.clickBack.bind(this)),this.getData()}}})),g,_=e((()=>{a(),x(),p(),u(),g=class{constructor(e){this.parent=e}getHTML(){return`
            <div class="container mt-4" style="max-width: 600px;">
                <h1>Новая услуга</h1>
                <div id="error-message" class="alert alert-danger d-none" role="alert"></div>
                <div id="add-form-container" class="mt-4">
                    <div class="mb-3">
                        <label class="form-label">Название</label>
                        <input type="text" id="input-title" class="form-control" placeholder="Например: Проверка штрафов">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Описание</label>
                        <textarea id="input-description" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Стоимость (₽)</label>
                        <input type="number" id="input-fine" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Ссылка на картинку (URL)</label>
                        <input type="text" id="input-src" class="form-control" value="./pages/service/default.png">
                    </div>
                    <div class="d-flex align-items-center gap-2 mt-4">
                      <button id="save-add-btn" class="btn">Сохранить изменения</button>
                      <div id="back-btn-place"></div>
                    </div>
                </div>
            </div>
        `}clickBack(){new b(this.parent).render()}async saveRule(){let e=document.getElementById(`error-message`);e.classList.add(`d-none`);let t={title:document.getElementById(`input-title`).value,description:document.getElementById(`input-description`).value,fine:parseInt(document.getElementById(`input-fine`).value)||0,src:document.getElementById(`input-src`).value};if(!t.title||!t.description){e.textContent=`Ошибка: Заполните название и описание!`,e.classList.remove(`d-none`);return}try{await f.post(l.createRules(),t),this.clickBack()}catch{e.textContent=`Произошла сетевая ошибка при сохранении`,e.classList.remove(`d-none`)}}render(){this.parent.innerHTML=``,this.parent.insertAdjacentHTML(`beforeend`,this.getHTML()),document.getElementById(`save-add-btn`).onclick=()=>this.saveRule(),new i(document.getElementById(`back-btn-place`)).render(()=>{new b(this.parent).render()})}}})),v,y=e((()=>{a(),x(),p(),u(),v=class{constructor(e,t){this.parent=e,this.id=t}getHTML(e={}){return`
            <div class="container mt-4" style="max-width: 600px;">
                <h1>Изменение услуги №${e.id||this.id}</h1>
                <div id="add-form-container" class="mt-4">
                    <div class="mb-3">
                        <label class="form-label">Название</label>
                        <input type="text" id="input-title" class="form-control" 
                               value="${e.title||``}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Описание</label>
                        <textarea id="input-description" class="form-control" rows="3">${e.description||``}</textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Стоимость (₽)</label>
                        <input type="number" id="input-fine" class="form-control" 
                               value="${e.fine||``}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Ссылка на картинку (URL)</label>
                        <input type="text" id="input-src" class="form-control" 
                               value="${e.src||``}">
                    </div>
                    <div class="d-flex gap-2 mt-4">
                      <button id="save-edit-btn" class="btn btn-primary">Сохранить изменения</button>
                    <div id="back-btn-place"></div>
                  </div>
                </div>
            </div>
        `}async getData(){try{let e=await f.get(l.getRulesById(this.id));this.render(e)}catch(e){console.error(`Ошибка при получении данных:`,e)}}clickBack(){new b(this.parent).render()}async saveRule(){let e={title:document.getElementById(`input-title`).value,description:document.getElementById(`input-description`).value,fine:parseInt(document.getElementById(`input-fine`).value),src:document.getElementById(`input-src`).value};try{let t=l.updateRulesById(this.id);await f.patch(t,e),console.log(`Данные успешно обновлены!`),this.clickBack()}catch(e){console.error(`Ошибка при сохранении:`,e)}}render(e){if(!e){this.getData();return}this.parent.innerHTML=``,this.parent.insertAdjacentHTML(`beforeend`,this.getHTML(e));let t=document.getElementById(`save-edit-btn`);t&&(t.onclick=()=>this.saveRule()),new i(document.getElementById(`back-btn-place`)).render(this.clickBack.bind(this))}}})),b,x=e((()=>{r(),h(),u(),p(),_(),y(),l.getRules(),b=class{constructor(e){this.parent=e}calculateStats(e){let t=e.map(e=>e.price),n=0,r=1;return t.forEach(e=>{n+=e,r*=e}),{sum:n,mult:r}}async getData(){try{let e=await f.get(l.getRules());this.renderData(e)}catch(e){console.error(`Ошибка при получении данных:`,e)}}get pageRoot(){return document.getElementById(`main-page`)}getHTML(){return`
            <div class="container mt-4">
                <h2 class="mb-4">Услуги контроля ПДД самокатов</h2>

                <div class="mb-4">
                    <input type="text" id="search-input" class="form-control w-50" placeholder="Поиск услуги...">
                </div>
                <button id="add-new-rule" class="btn btn-success">Добавить услугу</button>
                <div id="main-page" class="d-flex flex-wrap justify-content-start"></div>
            </div>
        `}clickSearch(e){let t=e.target.value.toLowerCase(),n=this.getData().filter(e=>e.title.toLowerCase().includes(t));this.renderCards(n)}clickCard(e){let t=e.target.dataset.id;new m(this.parent,t).render()}async clickDelete(e){let t=e.target.dataset.idDelete;try{await f.delete(l.removeRulesById(t)),this.render(),console.log(`Услуга ${t} удалена из файла rules.json`)}catch(e){console.error(`Ошибка при удалении:`,e)}}renderCards(e){this.pageRoot.innerHTML=``,e.forEach(e=>{new n(this.pageRoot).render(e,this.clickCard.bind(this))})}clickEdit(e){let t=e.target.dataset.idEdit;new v(this.parent,t).render()}renderData(e){e&&(this.pageRoot.innerHTML=``,e.forEach(e=>{new n(this.pageRoot).render(e,this.clickCard.bind(this),this.clickEdit.bind(this),this.clickDelete.bind(this))}))}render(){this.parent.innerHTML=``;let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e);let t=document.getElementById(`add-new-rule`);t&&(t.onclick=()=>{console.log(`Клик по кнопке 'Добавить' на главной!`),new g(this.parent).render()}),this.getData()}}}));t((()=>{x(),new b(document.getElementById(`root`)).render()}))();