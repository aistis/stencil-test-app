import { newSpecPage } from '@stencil/core/testing';
import { PageHeadline } from '../page-headline';

describe('page-headline', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PageHeadline],
      html: `<page-headline text="Strong headline"></page-headline>`,
    });
    expect(page.root.querySelector('h1').innerText).toEqual(`Strong headline`);
  });
});
