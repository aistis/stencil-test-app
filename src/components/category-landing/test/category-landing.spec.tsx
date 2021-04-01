import { newSpecPage } from '@stencil/core/testing';
import { CategoryLanding } from '../category-landing';

describe('category-landing', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CategoryLanding],
      html: `<category-landing></category-landing>`,
    });
    expect(page.root.querySelectorAll('product-card').length).toEqual(8);
  });
});
