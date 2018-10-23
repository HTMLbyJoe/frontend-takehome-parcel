import { htmlToElement } from '../helpers/template.js';

export default (vars) => {
    let template = `
        <div class="loading-wrapper">
            <div class="loading">Loading<span class="dot-1">.</span><span class="dot-2">.</span><span class="dot-3">.</span></div>
            </div>
        </div>
    `;

    return htmlToElement(template);
}
