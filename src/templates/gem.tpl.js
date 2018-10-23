import { htmlToElement } from '../helpers/template.js';

export default (vars) => {
    let template = `
        <div class="gem">
            <header>
                <h1 class="name" title="View '${vars.name}' on RubyGems.org"><a href="${vars.project_uri}" target="_blank">${vars.name}</a></h1>
                <div class="authors" title="Gem Authors">👩‍💻 ${vars.authors}</div>
            </header>
            <p>${vars.info}</p>

            <button data-saved="false" data-gem-name="${vars.name}"><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 100" x="0px" y="0px"><title>heart 2k18</title><path d="M100,31.9v8a2.92,2.92,0,0,0-.18.55,30,30,0,0,1-2.7,9.2A62.73,62.73,0,0,1,85,66.7C74.87,77.24,63.21,85.79,50.8,93.39a1.22,1.22,0,0,1-1.49,0,180.65,180.65,0,0,1-28-20.62A87.3,87.3,0,0,1,5.28,54,33.92,33.92,0,0,1,.93,27.91C5.47,7.72,30.61-.53,46.27,13c1.34,1.15,2.52,2.49,3.86,3.81a4.26,4.26,0,0,1,.27-.4c7-7.83,15.65-11.33,26-9.59,11.35,1.9,18.79,8.68,22.41,19.59A50.93,50.93,0,0,1,100,31.9Z"></path></svg> <span class="text">Save</span></button>
        </div>
    `;

    return htmlToElement(template);
}
