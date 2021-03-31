import { newSpecPage } from '@stencil/core/testing';
import { PageHeadline } from '../page-headline';

describe('page-headline', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PageHeadline],
      html: `<page-headline></page-headline>`,
    });
    expect(page.root).toEqualHtml(`
      <page-headline>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </page-headline>
    `);
  });
});
