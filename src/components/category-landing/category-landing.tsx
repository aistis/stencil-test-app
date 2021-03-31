import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'category-landing',
  styleUrl: 'category-landing.css',
  shadow: true,
})
export class CategoryLanding {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
