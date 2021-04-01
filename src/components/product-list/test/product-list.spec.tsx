import { newSpecPage } from '@stencil/core/testing';
import { ProductList } from '../product-list';

describe('product-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ProductList],
      html: `<product-list brand="apple"></product-list>`,
    });
    expect(page.root.querySelector('page-headline').hasAttribute('text')).toEqual(true);
  });
});
