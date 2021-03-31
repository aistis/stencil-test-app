import { newSpecPage } from '@stencil/core/testing';
import { ErrorPage } from '../error-page';

describe('error-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ErrorPage],
      html: `<error-page></error-page>`,
    });
    expect(page.root).toEqualHtml(`
      <error-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </error-page>
    `);
  });
});
