function getFaves() {
    return JSON.parse(localStorage.getItem('faves')) || [];
}

export function save(gem) {
    let faves = getFaves();

    faves.push(gem);

    return localStorage.setItem('faves', JSON.stringify(faves));
}

export function unsave(name) {
    let faves = getFaves();

    // Remove the gem name from the array of saved gem names
    faves = faves.filter(e => e.name !== name);

    return localStorage.setItem('faves', JSON.stringify(faves));
}

export function isSaved(name) {
    let faves = getFaves();

    faves = faves.filter(e => e.name === name);

    return faves.length >= 1;
}
