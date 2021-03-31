import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'page-headline',
  styleUrl: 'page-headline.css',
  shadow: true
})
export class PageHeadline {
  @Prop() text: String;

  render() {
    return (
      <ion-text color="tertiary"><h1>{this.text}</h1></ion-text>
    );
  }

}
