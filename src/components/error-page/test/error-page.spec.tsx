import { newSpecPage } from '@stencil/core/testing';
import { ErrorPage } from '../error-page';

describe('error-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ErrorPage],
      html: `<error-page></error-page>`,
    });
    expect(page.root.querySelector('ion-button').getAttribute('href')).toEqual(`/`);
  });
});
