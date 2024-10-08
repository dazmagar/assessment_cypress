import { gaussTimeout } from '../cypress/support/helpers';

class InventoryPage {
    open() {
        cy.task('clearTestResDir');
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
        cy.visit('/store/publix/storefront');
        gaussTimeout();
        cy.location('pathname').should('eq', '/store/publix/storefront');
    }

    confirmZip() {
        cy.contains('h2', 'your ZIP code?', { timeout: 10000 }).then($header => {
            if ($header.is(':visible')) {
                cy.contains('button', 'Confirm').click();
                gaussTimeout();
                cy.contains('h2', 'your ZIP code?').should('not.exist');
            }
        });
    }

    addItemToCart(pName, pCount, saveData = false) {
        let productName, productPrice;

        const findProduct = () => {
            if (!isNaN(pName)) {
                return cy.get('[data-testid^="item_list_item_items_"]').eq(pName - 1);
            } else {
                return cy.contains('h2', pName).should('be.visible');
            }
        };

        findProduct()
            .within(() => {
                cy.get('h2')
                    .invoke('text')
                    .then(name => {
                        productName = name.trim();
                    });

                cy.contains('span.screen-reader-only', /^Current price:/)
                    .invoke('text')
                    .then(priceText => {
                        productPrice = priceText.match(/\$[0-9.]+/)[0];
                    });

                cy.contains('button', 'Add').click();
                gaussTimeout();

                if (pCount > 1) {
                    for (let i = 1; i < pCount; i++) {
                        cy.get('button[aria-label^="Increment quantity"]').click();
                        gaussTimeout();
                    }
                }
            })
            .then(() => {
                const productData = {
                    name: productName,
                    price: productPrice,
                    quantity: pCount
                };

                cy.task('setData', {
                    key: productName,
                    value: productData
                });

                if (saveData) {
                    cy.task('saveToFile', productData);
                }
            });
    }

    openCart() {
        cy.get('[aria-controls="cart_dialog"]')
            .should('be.visible')
            .invoke('attr', 'aria-label')
            .then(label => {
                const itemCountMatch = label.match(/Items in cart: (\d+)/);
                const itemCount = itemCountMatch ? parseInt(itemCountMatch[1], 10) : 0;

                cy.get('[aria-controls="cart_dialog"]').click();
                gaussTimeout();
                cy.get('#cart_dialog').should('have.attr', 'aria-expanded', 'true');

                cy.get('#cart-body ul>li>section', { timeout: 10000 })
                    .should('have.length', itemCount)
                    .then(() => {
                        cy.get('div[data-testid="cart-messaging-loading"]', { timeout: 5000 }).should('not.exist');
                    });
            });
    }

    checkItemsInCart() {
        cy.get('li section [aria-label="product"]').each($cartItem => {
            let cartProductName, cartProductPrice, cartProductQuantity, cartProductOriginalPrice;

            cy.wrap($cartItem)
                .find('h3')
                .invoke('text')
                .then(name => {
                    cartProductName = name.trim();

                    return cy.wrap($cartItem).find('button[aria-label^="Quantity:"]').invoke('text');
                })
                .then(quantityText => {
                    cartProductQuantity = parseInt(quantityText.match(/\d+/)[0], 10);

                    if (cartProductQuantity > 1) {
                        return cy
                            .wrap($cartItem)
                            .find('span:contains("Original price")')
                            .invoke('text')
                            .then(originalPriceText => {
                                cartProductOriginalPrice = originalPriceText.match(/\$[0-9.]+/)[0];
                                cartProductPrice = (parseFloat(cartProductOriginalPrice.slice(1)) / cartProductQuantity).toFixed(2);
                                cartProductPrice = `$${cartProductPrice}`;
                            });
                    } else {
                        return cy
                            .wrap($cartItem)
                            .find('span:contains("$"), div:contains("$")')
                            .first()
                            .invoke('text')
                            .then(currentPrice => {
                                cartProductPrice = currentPrice.match(/\$[0-9.]+/)[0];
                            });
                    }
                })
                .then(() => {
                    return cy.task('getData', cartProductName);
                })
                .then(savedProductData => {
                    if (!savedProductData) {
                        return;
                    }

                    expect(savedProductData.name).to.equal(cartProductName);
                    expect(savedProductData.price).to.equal(cartProductPrice);
                    expect(savedProductData.quantity).to.equal(cartProductQuantity);
                });
        });
    }
}

module.exports = InventoryPage;
