import { Component, Prop, h } from '@stencil/core';

const nav = document.querySelector('ion-nav');

@Component({
  tag: 'product-card',
  styleUrl: 'product-card.css',
  shadow: true
})
export class ProductCard {
  @Prop() item = {}
  @Prop() optionList = false
  @Prop() productType = false

  handleClick(brand:String) {
    nav.push('product-list', {brand: brand.toLowerCase()});
  }
  render() {
    return (
      <ion-card onClick={() => this.productType? null : this.handleClick(this.item['id'])}>
        <ion-card-header>
          <ion-img part="image" src={this.item[this.productType ? 'imgUrl' : 'displayImageUrl']} alt={this.item['displayName']}></ion-img>
          <ion-card-title>{this.item['displayName']}</ion-card-title>
        </ion-card-header>
        {this.productType ?
          <ion-card-content>
            <ion-text class="product-price-prefix">{this.item['pricePrefix']}</ion-text>
            <ion-text class="product-price">{this.item['price']}</ion-text>
            <ion-text class="product-price-suffix">{this.item['priceSuffix']}</ion-text>
          </ion-card-content> :
          null
        }
        {this.productType ?
          <ion-card-content>
            {this.item['internalMemoryGB'].map((network) =>
              <ion-chip>
                <ion-label>{network} GB</ion-label>
              </ion-chip>
            )}
          </ion-card-content> :
          null
        }
        <ion-grid>
          <ion-row class="button-wrapper">
            <ion-button size="small">Remove</ion-button>
            <ion-button size="small">Love</ion-button>
          </ion-row>
        </ion-grid>
      </ion-card>
    );
  }

}
