// ==UserScript==
// @name         Moodle Improvements
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make moodle more usable
// @author       LA / DK
// @match        https://moodle.technikum-wien.at/course/view.php?id=*
// @icon         https://www.google.com/s2/favicons?domain=technikum-wien.at
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

// -------------------------------------------------------------------------------
// Configuration
// -------------------------------------------------------------------------------
var featureToggle = {
    stickyHeader: true,
    accordionSections: false
};

// -------------------------------------------------------------------------------
// Feature: Sticky Header
// -------------------------------------------------------------------------------
if(featureToggle.stickyHeader) {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        .selfstudy > .right.side a {
            color: white;
        }
        .dropdown-menu > a > i,
        .dropdown-menu > a > span {
            color: #00689e;
        }

        header#page-header.row {
            position: sticky;
            top: 50px;
            right: 0;
            z-index: 99;
            background: white;
        }`;
    document.head.appendChild(styleSheet);
}

// -------------------------------------------------------------------------------
// Feature: Accordion Sections
// -------------------------------------------------------------------------------

function toggleAccordionOfItem(sectionBoxItem) {
    const uls = sectionBoxItem.querySelectorAll('.content > .section');
    const sectionsummaries = sectionBoxItem.querySelectorAll('.content > .sectionsummary');

    sectionBoxItem.classList.toggle('margin-bottom-3');

    Array.from(uls, (ul) => ul.classList.toggle('hidden'));
    Array.from(sectionsummaries, (sectionsummary) => {
        sectionsummary.classList.toggle('d-flex'); // summary of course
        sectionsummary.classList.toggle('hidden');
    });
};

if(featureToggle.accordionSections) {
    const selfstudySections = document.querySelectorAll('.sectionbox.selfstudy');
    const presenceSections = document.querySelectorAll('.sectionbox.presence');
    const generalSections = document.querySelectorAll('.sectionbox.generalsection');

    Array.from(selfstudySections)
        .concat(Array.from(presenceSections))
        .concat(Array.from(generalSections))
        .map((item) => {
            toggleAccordionOfItem(item);
            item.addEventListener('dblclick', () => {
                toggleAccordionOfItem(item);
            });
        });
}

// -------------------------------------------------------------------------------

})();