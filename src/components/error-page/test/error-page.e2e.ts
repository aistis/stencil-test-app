import { newE2EPage } from '@stencil/core/testing';

describe('error-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<error-page></error-page>');

    const element = await page.find('error-page');
    expect(element).toHaveClass('hydrated');
  });
});
