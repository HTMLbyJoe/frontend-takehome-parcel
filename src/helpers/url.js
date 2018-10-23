export function setUrlParams(params) {
    let newUrl = new URL(document.location);
    newUrl.search = new URLSearchParams(params);
    return history.pushState({}, document.title, newUrl);
}

export function getUrlParam(key) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}
