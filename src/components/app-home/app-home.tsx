import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {

  render() {
    return [
      <ion-content class="ion-padding">
        <page-headline text="Featured store categories"/>
        <ion-card>
          <ion-img
            src="https://i.picsum.photos/id/103/900/300.jpg?hmac=2r71Jgs7llvbcembHL8qVOKq5pB77kHZRlZgxAl5RvY"
            alt="Mobiltelefoner"
          ></ion-img>
          <ion-card-header>
            <ion-card-subtitle>Phones</ion-card-subtitle>
            <ion-card-title><h2>Mobiltelefoner</h2></ion-card-title>
          </ion-card-header>
          <ion-card-content>
          No phone, no lights, no motor car, not a single luxury. Like Robinson Crusoe it's primitive as can be. He's gaining' on you so you better look alive. He's busy revin' up his Powerful Mach 5. Straightnin' the curves. Flatnin the hills. Someday the mountain might get 'em but the law never will.
          </ion-card-content>
          <ion-button color="tertiary" href="/phones">Phones</ion-button>
        </ion-card>
      </ion-content>,
    ];
  }
}
