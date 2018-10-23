export default class {
    search(query) {
        return fetch(`${process.env.API_HOST}/api/v1/search.json?query=${query}`)
        .then((response) => {
            return response.json();
        }).then((results) => {
            return results;
        });
    }
}
