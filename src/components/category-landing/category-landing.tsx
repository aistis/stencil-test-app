import { Component, State, h } from '@stencil/core';
import { endpoints } from "../../helpers/apiEndpointsConfig";
import state from '../../helpers/store';

const nav = document.querySelector('ion-nav');
@Component({
  tag: 'category-landing',
  styleUrl: 'category-landing.css'
})
export class CategoryLanding {
  @State() headline:String = 'Headline is missing'
  @State() data = []
  @State() sortState = false

  async componentWillLoad() {
    try {
      const response = await fetch(endpoints.landing)
      const data = await response.json()
      // TODO:needs to be handled in case of fetch or parse fail
      this.headline = data.headline
      state.categories.phones.brands = data.options
      this.data = data.options
    } catch (error) {
      nav.push('error-page', {});
      console.error(error)
    }
  }

  async componentWillRender () {
    this.customizelist()
  }

  customizelist() {
    this.data = [...state.categories.phones.brands]
    if(this.sortState) {
      this.sortData(this.data)
    }
  }
  
  sortData(data): Array<object> {
    if (this.sortState) {
      data.sort((a ,b) => {
        return a.displayName.toLowerCase() > b.displayName.toLowerCase() ? -1 : 1
      })
      return this.data = [...data]
    }
  }

  render() {
    return (
      <ion-content class="ion-padding">
        <page-headline text={this.headline} />
        <ion-grid>
          <ion-row>
            <ion-col sizeMd="8">
              <ion-item>
                <ion-label>Sort items by title ascending</ion-label>
                <ion-toggle checked={this.sortState} onIonChange={(ev) => (this.sortState = ev.detail.checked)} />
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            {this.data.length == 0
                ? <h3>No data loaded yet</h3>
                : this.data.map((item) =>
                <product-card item={item}></product-card>
              )}
          </ion-row>
        </ion-grid>
      </ion-content>
    );
  }

}
