import RubyGemsApi from './modules/RubyGemsApi.js';
import Gem from './modules/Gem.js';
import LoadingTemplate from './templates/loading.tpl.js';
import { getFaves } from './helpers/save.js';
import { setUrlParams, getUrlParam } from './helpers/url.js';

function doSearch(query) {
    clearGemList();
    document.body.children.results.appendChild(LoadingTemplate());

    let api = new RubyGemsApi();

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
        let gemElement = new Gem(gem);
        document.body.children.results.appendChild(gemElement);
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
