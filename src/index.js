import RubyGemsApi from './modules/RubyGemsApi.js';
import GemTemplate from './templates/gem.tpl.js';
import LoadingTemplate from './templates/loading.tpl.js';
import { save, unsave, isSaved } from './helpers/save.js';
import { unescapeHtml } from './helpers/html.js';

let api = new RubyGemsApi();

function doSearch(query) {
    document.body.children.results.innerHTML = '';
    document.body.children.results.appendChild(LoadingTemplate());

    api.search(query).then((gems) => {

        document.body.children.results.innerHTML = '';

        let newUrl = new URL(document.location);

        newUrl.search = new URLSearchParams({q: query});

        history.pushState({}, document.title, newUrl);

        gems.forEach((gem) => {
            let gemElement = GemTemplate(gem);
            document.body.children.results.appendChild(gemElement);
            addGemEventListeners(gemElement);
        });
    });
}

let urlParams = new URLSearchParams(window.location.search);
let searchParam = urlParams.get('q');

if (searchParam) {
    doSearch(searchParam);
    document.getElementById('search').children.query.value = searchParam;
}

document.getElementById('search').addEventListener('submit', (event) => {
    event.preventDefault();

    let queryInput = event.target.children.query;

    doSearch(queryInput.value);

    return false;
});

function addGemEventListeners(gemElement) {
    gemElement.querySelector('[data-saved]').addEventListener('click', (event) => {
        event.preventDefault();

        let button = event.target;
        let buttonText = button.querySelector('.text');
        let saved = !JSON.parse(event.target.dataset.saved);

        button.dataset.saved = saved;
        buttonText.innerHTML = saved ? 'Saved' : 'Save';

        if (saved) {
            save(JSON.parse(unescapeHtml(button.dataset.gemJson)));
        } else {
            unsave(JSON.parse(unescapeHtml(button.dataset.gemJson)).name);
        }

        return false;
    });
}
