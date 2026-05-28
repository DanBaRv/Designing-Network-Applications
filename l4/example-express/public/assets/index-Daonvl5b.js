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
        `}addListeners(e,t){document.getElementById(`click-card-${e.id}`).addEventListener(`click`,t)}addListenersEdit(e,t){document.getElementById(`click-card-${e.id}-edit`).addEventListener(`click`,t)}addListenersDelete(e,t){document.getElementById(`click-card-${e.id}-delete`).addEventListener(`click`,t)}render(e,t,n,r){let i=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,i),this.addListeners(e,t),this.addListenersEdit(e,n),this.addListenersDelete(e,r)}}})),i,a=e((()=>{i=class{constructor(e){this.parent=e}getHTML(e){return`
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
    `}render(e){let t=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,t)}}})),o,s,c=e((()=>{o=class{constructor(){this.baseUrl=`http://localhost:3001`}getPenalties(){return`${this.baseUrl}/penalties`}getPenaltyById(e){return`${this.baseUrl}/penalties/${e}`}createPenalty(){return`${this.baseUrl}/penalties`}removePenaltyById(e){return`${this.baseUrl}/penalties/${e}`}updatePenaltyById(e){return`${this.baseUrl}/penalties/${e}`}},s=new o})),l,u,d=e((()=>{l=class{async get(e){try{return console.log(`Отправляю запрос по адресу:`,e),await(await window.fetch(e)).json()}catch(e){console.error(`Ошибка GET:`,e)}}async post(e,t){try{return await(await window.fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)})).json()}catch(e){console.error(`Ошибка POST:`,e)}}async patch(e,t){try{return await(await window.fetch(e,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)})).json()}catch(e){console.error(`Ошибка PATCH:`,e)}}async delete(e){try{let t=await window.fetch(e,{method:`DELETE`});return t.status===204?null:await t.json()}catch(e){console.error(`Ошибка DELETE:`,e)}}},u=new l})),f,p=e((()=>{a(),c(),d(),f=class{constructor(e,t){this.parent=e,this.id=t}async getData(){try{let e=await u.get(s.getPenaltyById(this.id));this.renderData(e)}catch(e){console.error(`Ошибка при получении данных:`,e)}}getHTML(){return`<div id="service-page" class="container py-4"></div>`}get pageRoot(){return document.getElementById(`service-page`)}renderData(e){e&&(this.pageRoot.insertAdjacentHTML(`beforeend`,`<h1 class="mt-4 mb-3">${e.title}</h1>`),this.pageRoot.insertAdjacentHTML(`beforeend`,`
        <div class="mb-4">
            <img src="${e.src}" 
                 class="img-fluid" 
                 style="height: 500px; border-radius: 20px; object-fit: cover;" 
                 alt="${e.title}">
        </div>
      `),new i(this.pageRoot).render(e))}render(){this.parent.innerHTML=``;let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e),this.getData()}}})),m,h=e((()=>{y(),d(),c(),m=class{constructor(e){this.parent=e}getHTML(){return`
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
                      <button id="save-add-btn" class="btn text-white" style="background-color: #804aff;">Сохранить изменения</button>
                    </div>
                </div>
            </div>
        `}async savePenalty(){let e=document.getElementById(`error-message`);e.classList.add(`d-none`);let t={title:document.getElementById(`input-title`).value,description:document.getElementById(`input-description`).value,fine:parseInt(document.getElementById(`input-fine`).value)||0,src:document.getElementById(`input-src`).value};if(!t.title||!t.description){e.textContent=`Ошибка: Заполните название и описание!`,e.classList.remove(`d-none`);return}try{await u.post(s.createPenalty(),t),new v(this.parent).render()}catch{e.textContent=`Произошла сетевая ошибка при сохранении`,e.classList.remove(`d-none`)}}render(){this.parent.innerHTML=``,this.parent.insertAdjacentHTML(`beforeend`,this.getHTML()),document.getElementById(`save-add-btn`).onclick=()=>this.savePenalty()}}})),g,_=e((()=>{y(),d(),c(),g=class{constructor(e,t){this.parent=e,this.id=t}getHTML(e={}){return`
            <div class="container mt-4" style="max-width: 600px;">
                <h1>Изменение услуги №${e.id||this.id}</h1>
                <div id="add-form-container" class="mt-4">
                    <div class="mb-3">
                        <label class="form-label">Название</label>
                        <input type="text" id="input-title" class="form-control" value="${e.title||``}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Описание</label>
                        <textarea id="input-description" class="form-control" rows="3">${e.description||``}</textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Стоимость (₽)</label>
                        <input type="number" id="input-fine" class="form-control" value="${e.fine||``}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Ссылка на картинку (URL)</label>
                        <input type="text" id="input-src" class="form-control" value="${e.src||``}">
                    </div>
                    <div class="d-flex gap-2 mt-4">
                      <button id="save-edit-btn" class="btn text-white" style="background-color: #804aff;">Сохранить изменения</button>
                    </div>
                </div>
            </div>
        `}async getData(){try{let e=await u.get(s.getPenaltyById(this.id));this.render(e)}catch(e){console.error(`Ошибка при получении данных:`,e)}}async savePenalty(){let e={title:document.getElementById(`input-title`).value,description:document.getElementById(`input-description`).value,fine:parseInt(document.getElementById(`input-fine`).value),src:document.getElementById(`input-src`).value};try{let t=s.updatePenaltyById(this.id);await u.patch(t,e),new v(this.parent).render()}catch(e){console.error(`Ошибка при сохранении:`,e)}}render(e){if(!e){this.getData();return}this.parent.innerHTML=``,this.parent.insertAdjacentHTML(`beforeend`,this.getHTML(e));let t=document.getElementById(`save-edit-btn`);t&&(t.onclick=()=>this.savePenalty())}}})),v,y=e((()=>{r(),p(),c(),d(),h(),_(),v=class{constructor(e){this.parent=e,this.items=[]}async getData(){try{let e=await u.get(s.getPenalties());this.items=e||[],this.renderData(this.items)}catch(e){console.error(`Ошибка при получении данных:`,e)}}get pageRoot(){return document.getElementById(`main-page`)}getHTML(){return`
            <div class="container mt-4">
                <h2 class="mb-4">Услуги контроля ПДД самокатов</h2>

                <div class="mb-4 d-flex gap-2">
                    <input type="text" id="search-input" class="form-control w-50" placeholder="Поиск услуги...">
                    <button id="search-button" class="btn text-white" style="background-color: #804aff;">ПОИСК</button>
                </div>
                <button id="add-new-penalty" class="btn btn-success mb-3">Добавить услугу</button>
                <div id="main-page" class="d-flex flex-wrap justify-content-start"></div>
            </div>
        `}clickSearch(){let e=document.getElementById(`search-input`),t=e?e.value.toLowerCase().trim():``,n=this.items.filter(e=>e.title.toLowerCase().includes(t));this.renderData(n)}clickCard(e){let t=e.target.dataset.id;new f(this.parent,t).render()}async clickDelete(e){let t=e.target.dataset.idDelete;try{await u.delete(s.removePenaltyById(t)),console.log(`Услуга ${t} удалена из penalties.json`),this.render()}catch(e){console.error(`Ошибка при удалении:`,e)}}clickEdit(e){let t=e.target.dataset.idEdit;new g(this.parent,t).render()}renderData(e){e&&(this.pageRoot.innerHTML=``,e.forEach(e=>{new n(this.pageRoot).render(e,this.clickCard.bind(this),this.clickEdit.bind(this),this.clickDelete.bind(this))}))}render(){this.parent.innerHTML=``;let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e);let t=document.getElementById(`add-new-penalty`);t&&(t.onclick=()=>{new m(this.parent).render()});let n=document.getElementById(`search-button`);n&&(n.onclick=()=>{this.clickSearch()}),this.getData()}}}));t((()=>{y();var e=document.getElementById(`root`);new v(e).render(),document.getElementById(`header-brand`)?.addEventListener(`click`,t=>{t.preventDefault(),new v(e).render()}),document.getElementById(`header-home-link`)?.addEventListener(`click`,t=>{t.preventDefault(),new v(e).render()})}))();