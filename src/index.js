import RubyGemsApi from './modules/RubyGemsApi.js';
import GemTemplate from './templates/gem.tpl.js';
import LoadingTemplate from './templates/loading.tpl.js';
import { getFaves, save, unsave, isSaved } from './helpers/save.js';
import { unescapeHtml } from './helpers/html.js';
import { setUrlParams, getUrlParam } from './helpers/url.js';

let api = new RubyGemsApi();

function doSearch(query) {
    clearGemList();
    document.body.children.results.appendChild(LoadingTemplate());

    api.search(query).then((gems) => {

        clearGemList();

        setUrlParams({q: query});

        populateGemList(gems);
    });
}

function clearGemList(gems) {
    return document.body.children.results.innerHTML = '';
}

function populateGemList(gems) {
    return gems.forEach((gem) => {
        let gemElement = GemTemplate(gem);
        document.body.children.results.appendChild(gemElement);
        addGemEventListeners(gemElement);
    });
}

let searchParam = getUrlParam('q');
if (searchParam) {
    doSearch(searchParam);
    document.querySelector('.search-input').value = searchParam;
}

document.querySelector('.search-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let queryInput = event.target.children.query;

    doSearch(queryInput.value);

    return false;
});

document.querySelector('.faves').addEventListener('click', (event) => {
    event.preventDefault();

    showFaves();

    return false;
});

function showFaves() {
    document.querySelector('.search-input').value = '';
    setUrlParams({'page': 'faves'});

    clearGemList();

    let faves = getFaves();

    populateGemList(faves);
}

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
