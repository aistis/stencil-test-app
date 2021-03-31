import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'product-list',
  styleUrl: 'product-list.css',
  shadow: true,
})
export class ProductList {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
