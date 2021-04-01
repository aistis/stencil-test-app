import { newSpecPage } from '@stencil/core/testing';
import { ProductCard } from '../product-card';

it('Should set false as default for loved status on item', () => {
  const product = new ProductCard();
  product.productType = true
  expect(product.loved).toBe(false)
  product.handleLove('any')
  expect(product.loved).toBe(true)
})
