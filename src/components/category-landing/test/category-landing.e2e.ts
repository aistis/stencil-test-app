import { newE2EPage } from '@stencil/core/testing';

describe('category-landing', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<category-landing></category-landing>');

    const element = await page.find('category-landing');
    expect(element).toHaveClass('hydrated');
  });
});
