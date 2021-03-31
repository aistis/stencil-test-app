import { newSpecPage } from '@stencil/core/testing';
import { CategoryLanding } from '../category-landing';

describe('category-landing', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CategoryLanding],
      html: `<category-landing></category-landing>`,
    });
    expect(page.root).toEqualHtml(`
      <category-landing>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </category-landing>
    `);
  });
});
