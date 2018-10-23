import RubyGemsApi from './modules/RubyGemsApi.js';
import Gem from './modules/Gem.js';
import LoadingTemplate from './templates/loading.tpl.js';
import { getFaves } from './helpers/save.js';
import { setUrlParams, getUrlParam } from './helpers/url.js';

/**
 * Perform a new gem search by hitting the API
 */
function doSearch(query) {
    clearGemList();
    setUrlParams({q: query});
    document.body.children.results.appendChild(LoadingTemplate());

    let api = new RubyGemsApi();

    api.search(query).then((gems) => {
        clearGemList();
        populateGemList(gems);
    });
}

function clearGemList(gems) {
    return document.body.children.results.innerHTML = '';
}

/**
 * Fill the gem list based on JSON data
 *
 * @param  An array of gem data taken from the API
 * @return undefined
 */
function populateGemList(gems) {
    return gems.forEach((gem) => {
        let gemElement = new Gem(gem);
        document.body.children.results.appendChild(gemElement);
    });
}

/**
 * Display the list of saved Gems
 */
function showFaves() {
    clearGemList();
    setUrlParams({'page': 'faves'});

    document.querySelector('.search-input').value = '';

    let faves = getFaves();

    populateGemList(faves);
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
