import { Component, h } from '@stencil/core';

@Component({
  tag: 'error-page',
  styleUrl: 'error-page.css'
})
export class ErrorPage {

  render() {
    return (
      <ion-content class="ion-padding">
        <page-headline text="< ERROR > It happends from time to time"/>
        <ion-card>
          <ion-img
            src="https://i.picsum.photos/id/870/900/300.jpg?blur=2&grayscale&hmac=0nVHFGgLLFDbyaGjJNGwZ_dvCbfDNGjjDtt7T7uXJbk"
            alt="Something went wrong"
          ></ion-img>
          <ion-card-header>
            <ion-card-title><h1>Something went wrong</h1></ion-card-title>
          </ion-card-header>
          <ion-card-content>
            So sorry about this, but perhaps Telia networks are too busy right now
          </ion-card-content>
          <ion-button color="tertiary" href="/">Go back to home page</ion-button>
        </ion-card>
      </ion-content>
    );
  }
}
