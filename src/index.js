import RubyGemsApi from './modules/RubyGemsApi.js';

let api = new RubyGemsApi();

api.search('rails').then((data) => {
    console.log(data);
});
