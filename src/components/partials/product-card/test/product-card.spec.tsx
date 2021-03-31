import { newSpecPage } from '@stencil/core/testing';
import { ProductCard } from '../product-card';

describe('product-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ProductCard],
      html: `<product-card></product-card>`,
    });
    expect(page.root).toEqualHtml(`
      <product-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </product-card>
    `);
  });
});
