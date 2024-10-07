const { inventoryPage } = require('../pages/index');

describe('Verify Cart Functionality with Multiple Items and Quantities', () => {
    beforeEach(() => {
        inventoryPage.open();
        inventoryPage.confirmZip();
    });

    it('should correctly add multiple items to the cart with specified quantities and validate cart contents', () => {
        inventoryPage.addItemToCart('3', 1, true);
        inventoryPage.addItemToCart('2', 2, true);
        inventoryPage.addItemToCart('1', 1, true);
        inventoryPage.openCart();
        inventoryPage.checkItemsInCart();
    });
});
