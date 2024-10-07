Cypress.Commands.add('jsClick', selector => {
    cy.window().then(win => {
        const element = win.document.querySelector(selector);
        if (element) {
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: win
            });
            element.dispatchEvent(clickEvent);
        } else {
            throw new Error(`Element with selector ${selector} not found`);
        }
    });
});
