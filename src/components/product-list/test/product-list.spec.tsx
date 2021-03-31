import { newSpecPage } from '@stencil/core/testing';
import { ProductList } from '../product-list';

describe('product-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ProductList],
      html: `<product-list></product-list>`,
    });
    expect(page.root).toEqualHtml(`
      <product-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </product-list>
    `);
  });
});
