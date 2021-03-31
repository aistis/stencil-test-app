import { newE2EPage } from '@stencil/core/testing';

describe('page-headline', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<page-headline></page-headline>');

    const element = await page.find('page-headline');
    expect(element).toHaveClass('hydrated');
  });
});
