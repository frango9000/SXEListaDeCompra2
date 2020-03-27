import {CartToProductPipe} from './cart-to-product.pipe';

describe('CartToProductPipe', () => {
  it('create an instance', () => {
    const pipe = new CartToProductPipe();
    expect(pipe).toBeTruthy();
  });
});
