import { newE2EPage } from '@stencil/core/testing';

describe('product-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<product-card></product-card>');

    const element = await page.find('product-card');
    expect(element).toHaveClass('hydrated');
  });
});
