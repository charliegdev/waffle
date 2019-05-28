/* eslint no-console: 0 */
// Evergreen keeps spitting out console warnings about a deprecated CSS prop which we're not using;
// it clobs up the jest unit test output! Disable warnings.
console.warn = jest.fn();
