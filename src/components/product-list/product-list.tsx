import { Component, Prop, State, h } from '@stencil/core';
import { endpoints } from "../../helpers/apiEndpointsConfig";
import state from '../../helpers/store';
import { getUriParams } from '../../helpers/getUriParams';

@Component({
  tag: 'product-list',
  styleUrl: 'product-list.css',
  shadow: true,
})
export class ProductList {
  @Prop() brand: string;
  @State() data= [];
  @State() sortState = false;
  @State() uriParams = {};

  async componentWillLoad() {
    try {
      const response = await fetch(endpoints.products)
      const data = await response.json()
      // TODO:needs to be handled in case of fetch or parse fail
      state.products = data
      this.data = data.filter(product => product.brand.toLowerCase() == this.brand)
      this.uriParams = getUriParams()
    } catch (error) {
      
      console.error(error)
    }
    console.log(this.data)
  }

  async componentWillRender () {
    console.log(this.uriParams)
    this.customizelist()
  }

  customizelist() {
    this.data = [...state.products]
    if(this.uriParams) {
      console.log('lets filter the list')
      this.filterItems()
    }
    if(this.sortState) {
      this.sortData(this.data)
      console.log('lets sort the list')
    }
  }

  sortData(data): Array<object> {
    if (this.sortState) {
      data.sort((a ,b) => {
        return a.displayName.toLowerCase() > b.displayName.toLowerCase() ? 1 : -1
      })
      return this.data = [...data]
    }
  }

  filterItems() {
    const filter = this.uriParams
    const products = [...state.products]
    const filterTest = (arr, criteria) => {
      return arr.filter((obj) => {
        let passed:Object = {}
        Object.keys(criteria).map((c) => {
          if(typeof criteria[c] == 'number') {
            console.log(`filter name: ${c}`)
            parseFloat(obj[c]) === criteria[c]
            ? passed[c] = true
            : passed[c] = false
          }
          if(typeof criteria[c] == 'string') {
            obj[c].toLowerCase() === criteria[c]
            ? passed[c] = true
            : passed[c] = false
          }
          if(typeof criteria[c] == 'boolean') {
            obj[c] === criteria[c]
            ? passed[c] = true
            : passed[c] = false
          }
          if(criteria[c] instanceof Array) {

            const result = criteria[c].reduce((result, value) => {
              if(obj[c].includes(value)) {
                result = value
              }
              return result
            }, false)
            result
            ? passed[c] = true
            : passed[c] = false
          }
          // if(typeof criteria[c] == 'object' && criteria[c] instanceof Array == false) {
          // }
        });
        let itemPassed = true
        Object.keys(passed).forEach(key => {
          if(!passed[key]) itemPassed = passed[key]
        });
        return itemPassed
      });
    }
    this.data = [...filterTest(products,filter)]  
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
