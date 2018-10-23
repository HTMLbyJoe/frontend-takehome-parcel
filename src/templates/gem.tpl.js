import { htmlToElement } from '../helpers/template.js';

export default (vars) => {
    let template = `
        <div class="gem">
            <header>
                <h1 class="name" title="View '${vars.name}' on RubyGems.org"><a href="${vars.project_uri}" target="_blank">${vars.name}</a></h1>
                <div class="authors" title="Gem Authors">👩‍💻 ${vars.authors}</div>
            </header>
            <p>${vars.info}</p>
        </div>
    `;

    return htmlToElement(template);
}
