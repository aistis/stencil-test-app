import { Component, Prop, State, h } from '@stencil/core';
import { endpoints } from "../../helpers/apiEndpointsConfig";
import state from '../../helpers/store';

@Component({
  tag: 'product-list',
  styleUrl: 'product-list.css',
  shadow: true,
})
export class ProductList {
  @Prop() brand: string;
  @State() data= [];
  @State() sortState = false;

  async componentWillLoad() {
    try {
      const response = await fetch(endpoints.products)
      const data = await response.json()
      // TODO:needs to be handled in case of fetch or parse fail
      state.products = data
      this.data = data.filter(product => product.brand.toLowerCase() == this.brand)
    } catch (error) {
      console.error(error)
    }
    console.log(this.data)
  }

  render() {
    return (
      <ion-content class="ion-padding">
        <page-headline text={`Here is the ${this.brand} phones list`} />
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
                <product-card item={item} productType={true}></product-card>
              )}
          </ion-row>
        </ion-grid>
      </ion-content>
    );
  }

}
