function gaussTimeout(constantDelay, deviation) {
    const pacingTimeConst = constantDelay || Cypress.env('pacingTimeConst') || 500;
    const pacingTimeDev = deviation || Cypress.env('pacingTimeDev') || 250;
    const delay = Math.max(0, gaussRandom(pacingTimeConst, pacingTimeDev));
    cy.wait(delay);
}

function gaussRandom(mean, stdDev) {
    let u1 = 0,
        u2 = 0;
    while (u1 === 0) {
        u1 = Math.random();
    }
    while (u2 === 0) {
        u2 = Math.random();
    }
    const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z * stdDev + mean;
}

module.exports = {
    gaussTimeout: gaussTimeout
};
