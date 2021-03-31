import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/phones" component="category-landing" />
          <ion-route url="/phones/:brand" component="product-list" />
          <ion-route url="/error" component="error-page" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
