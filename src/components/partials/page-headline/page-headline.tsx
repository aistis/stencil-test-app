import { Component, Prop, h, State } from '@stencil/core';

@Component({
  tag: 'page-headline',
  styleUrl: 'page-headline.css'
})
export class PageHeadline {
  @Prop() text: String;
  @State() classList = '';

  async componentWillLoad() {
    this.classList = `
      ion-text-uppercase
      ion-text-center
      ion-color-tertiary
      ion-padding
    `
  }
  render() {
    return (
      <ion-text color="tertiary">
        <h1 class={this.classList} >{this.text}</h1>
      </ion-text>
    );
  }

}
