import { Component, Prop, Event, h, EventEmitter, State } from '@stencil/core';
import state from '../../../helpers/store';

const nav = document.querySelector('ion-nav');

@Component({
  tag: 'product-card',
  styleUrl: 'product-card.css',
  shadow: true
})
export class ProductCard {
  @Prop() item:Object = {}
  @Prop() optionList = false
  @Prop() productType = false
  @State() loved:Boolean = false 

  async componentWillRender () {
    const loved = this.productType 
      ? state.loved.products.includes(this.item['contentKey'])
      : state.loved.brands.includes(this.item['id'])
    this.loved = loved
  }

  @Event({
    eventName: 'itemRemoved',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) itemRemoved: EventEmitter<ProductCard>;
  @Event({
    eventName: 'itemLoved',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) itemLoved: EventEmitter<ProductCard>;

  handleClick(brand:String) {
    nav.push('product-list', {brand: brand.toLowerCase()});
  }

  handleRemove(key) {
    if (this.productType) {
      this.itemRemoved.emit(key);
    } else {
      state.removed.brands.push(key.toLowerCase())
    }
  }

  handleLove(key) {
    if (this.productType) {
      this.itemLoved.emit(key);
      this.loved = true
    } else {
      state.removed.brands.push(key.toLowerCase())
    }
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
        {this.productType ?
          <ion-grid>
            <ion-row class="button-wrapper">
              <ion-button 
                size="small" 
                onClick={() => this.handleRemove(this.productType ? this.item['contentKey'] : this.item['id'])}
              >Remove</ion-button>
              {this.loved 
                ? <ion-icon size="large" name="heart-circle-sharp"></ion-icon>
                : <ion-button 
                    size="small" 
                    onClick={() => this.handleLove(this.productType ? this.item['contentKey'] : this.item['id'])}
                  >Love</ion-button>
              }
            </ion-row>
          </ion-grid> :
          null
        }
      </ion-card>
    );
  }

}
