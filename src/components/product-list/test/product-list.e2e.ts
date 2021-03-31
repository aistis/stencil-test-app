import { newE2EPage } from '@stencil/core/testing';

describe('product-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<product-list></product-list>');

    const element = await page.find('product-list');
    expect(element).toHaveClass('hydrated');
  });
});
