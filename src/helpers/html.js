/**
 * Escape HTML
 *
 * https://stackoverflow.com/a/4835406
 */
export function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

/**
 * Un-Escape HTML
 *
 * https://stackoverflow.com/a/4835406
 */
export function unescapeHtml(text) {
    var map = [
        ['&amp;', '&'],
        ['&lt;', '<'],
        ['&gt;', '>'],
        ['&quot;', '"'],
        ['&#039;', "'"],
    ];

    map.forEach((pair) => {
        text = text.replace(pair[0], pair[1]);
    });

    return text;
}
