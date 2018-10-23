import RubyGemsApi from './modules/RubyGemsApi.js';
import GemTemplate from './templates/gem.tpl.js';
import LoadingTemplate from './templates/loading.tpl.js';

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
            document.body.children.results.appendChild(GemTemplate(gem));
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
