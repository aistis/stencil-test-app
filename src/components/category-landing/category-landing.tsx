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
      // TODO: not sure yet how to deal with that, but it makes test suit to fail so mocking data is needed to run tests
      // const data = {
      //   "id": "phones",
      //   "headline": "Mobiltelefoner",
      //   "options": [
      //     {
      //       "id": "Alcatel",
      //       "displayName": "Alcatel",
      //       "displayImageUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/brands/alcatel_front_270x540.png"
      //     },
      //     {
      //       "id": "Apple",
      //       "displayName": "Apple",
      //       "displayImageUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/brands/iPhone_11_Pro_Max_Green_Front_270x540.png"
      //     },
      //     {
      //       "id": "Doro",
      //       "displayName": "Doro",
      //       "displayImageUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/brands/Doro_8080_white_front_270x540.png"
      //     },
      //     {
      //       "id": "Huawei",
      //       "displayName": "Huawei",
      //       "displayImageUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/brands/Huawei-P30-Vogue_Blue_Front-251x540.png"
      //     },
      //     {
      //       "id": "Nokia",
      //       "displayName": "Nokia",
      //       "displayImageUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/brands/Nokia-7.2-Front-Black-270x540.png"
      //     },
      //     {
      //       "id": "Samsung",
      //       "displayName": "Samsung",
      //       "displayImageUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/brands/GalaxyFold_Back115_Silver-270x540.png"
      //     },
      //     {
      //       "id": "Sony",
      //       "displayName": "Sony",
      //       "displayImageUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/brands/xperia_1_front_black_270x540 .png"
      //     },
      //     {
      //       "id": "Xiaomi",
      //       "displayName": "Xiaomi",
      //       "displayImageUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/brands/xiaomi_black_front_270x540.png"
      //     }
      //   ]
      // }
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
                <ion-label>Sort items by title descending</ion-label>
                <ion-toggle checked={this.sortState} onIonChange={(ev) => (this.sortState = ev.detail.checked)} />
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            {this.data.length == 0
                ? <h3>No data loaded yet</h3>
                : this.data.map((item) =>
                <ion-col size="12" sizeSm="6" sizeMd="4" sizeLg="3">
                  <product-card item={item}></product-card>
                </ion-col>
              )}
          </ion-row>
        </ion-grid>
      </ion-content>
    );
  }

}
