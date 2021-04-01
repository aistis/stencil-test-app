import { Component, Prop, State, h, Listen } from '@stencil/core';
import { endpoints } from "../../helpers/apiEndpointsConfig";
import state from '../../helpers/store';
import { getUriParams } from '../../helpers/getUriParams';
import { ProductCard } from '../partials/product-card/product-card';

const nav = document.querySelector('ion-nav');
@Component({
  tag: 'product-list',
  styleUrl: 'product-list.css'
})
export class ProductList {
  @Prop() brand: string;
  @State() data= [];
  @State() sortState = false;
  @State() uriParams = {};
  @State() lovedItemsCounter = 0

  async componentWillLoad() {
    try {
      const response = await fetch(endpoints.products)
      const data = await response.json()

      // TODO: not sure yet how to deal with that, but it makes test suit to fail so mocking data is needed to run tests
      // const data = [
      //   {
      //     "brand": "Apple",
      //     "displayName": "Apple iPhone 7",
      //     "contentKey": "apple-iphone-7",
      //     "price": "449.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       32,
      //       128,
      //       256
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Rymdgrå",
      //         "hex": "#44464a"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/iPhone7_Black_Front_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/apple-iphone-7"
      //   },
      //   {
      //     "brand": "Apple",
      //     "displayName": "Apple iPhone 8",
      //     "contentKey": "apple-iphone-8",
      //     "price": "529.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       32,
      //       64,
      //       128,
      //       256
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Rymdgrå",
      //         "hex": "#444446"
      //       },
      //       {
      //         "name": "Guld",
      //         "hex": "#f8e9df"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/iPhone8_spacegrey_front_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/apple-iphone-8"
      //   },
      //   {
      //     "brand": "Apple",
      //     "displayName": "Apple iPhone 8 Plus",
      //     "contentKey": "apple-iphone-8-plus",
      //     "price": "579.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [],
      //     "colorOptions": [
      //       {
      //         "name": "Rymdgrå",
      //         "hex": "#444446"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/iphone-8plus-front-space-grey-270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/apple-iphone-8-plus"
      //   },
      //   {
      //     "brand": "Apple",
      //     "displayName": "Apple iPhone XR ",
      //     "contentKey": "apple-iphone-xr",
      //     "price": "599.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       64,
      //       128,
      //       256
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Vit",
      //         "hex": "#F8F8FF"
      //       },
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/iphone-xr-white-front-270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/apple-iphone-xr"
      //   },
      //   {
      //     "brand": "Apple",
      //     "displayName": "Apple iPhone XS 256 GB ",
      //     "contentKey": "apple-iphone-xs",
      //     "price": "889.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       64,
      //       256,
      //       512
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Rymdgrå",
      //         "hex": "#444446"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/iphone-xs-gold-front-270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/apple-iphone-xs"
      //   },
      //   {
      //     "brand": "Apple",
      //     "displayName": "Apple iPhone XS Max",
      //     "contentKey": "apple-iphone-xs-max",
      //     "price": "859.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       64,
      //       256,
      //       512
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Rymdgrå",
      //         "hex": "#444446"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/iPhoneXsMax_Gold_front-270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/apple-iphone-xs-max"
      //   },
      //   {
      //     "brand": "Apple",
      //     "displayName": "Apple iPhone 11",
      //     "contentKey": "apple-iphone-11",
      //     "price": "659.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       64,
      //       128,
      //       256
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Röd",
      //         "hex": "#b22222"
      //       },
      //       {
      //         "name": "Svart",
      //         "hex": "#444446"
      //       },
      //       {
      //         "name": "Vit",
      //         "hex": "#ffffff"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/11rodfram.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/apple-iphone-11"
      //   },
      //   {
      //     "brand": "Apple",
      //     "displayName": "Apple iPhone 11 Pro",
      //     "contentKey": "apple-iphone-11-pro",
      //     "price": "819.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       64,
      //       256,
      //       512
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Midnattsgrön",
      //         "hex": "#002D00"
      //       },
      //       {
      //         "name": "Rymdgrå",
      //         "hex": "#444446"
      //       },
      //       {
      //         "name": "Silver",
      //         "hex": "#dcdedf"
      //       },
      //       {
      //         "name": "Guld",
      //         "hex": "#FFDAB9"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/iphone_11_pro_midnightgreen_front_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/apple-iphone-11-pro"
      //   },
      //   {
      //     "brand": "Apple",
      //     "displayName": "Apple iPhone 11 Pro Max",
      //     "contentKey": "apple-iphone-11-pro-max",
      //     "price": "879.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       64,
      //       256,
      //       512
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Midnattsgrön",
      //         "hex": "#002D00"
      //       },
      //       {
      //         "name": "Rymdgrå",
      //         "hex": "#444446"
      //       },
      //       {
      //         "name": "Silver",
      //         "hex": "#dcdedf"
      //       },
      //       {
      //         "name": "Guld",
      //         "hex": "#FFDAB9"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/iPhone_11_Pro_Max_Green_Front_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/apple-iphone-11-pro-max"
      //   },
      //   {
      //     "brand": "Apple",
      //     "displayName": "Apple iPhone SE",
      //     "contentKey": "apple-iphone-se",
      //     "price": "399.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       64,
      //       128,
      //       256
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       },
      //       {
      //         "name": "Vit",
      //         "hex": "#F8F8FF"
      //       },
      //       {
      //         "name": "Röd",
      //         "hex": "#b72833"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/se-front-black-min.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/apple-iphone-se"
      //   },
      //   {
      //     "brand": "Doro",
      //     "displayName": "Doro 7031",
      //     "contentKey": "doro-7031",
      //     "price": "274.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       },
      //       {
      //         "name": "Röd/vit",
      //         "hex": "#b22222"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/doro7031_black__front_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/doro-7031"
      //   },
      //   {
      //     "brand": "Doro",
      //     "displayName": "Doro 7011",
      //     "contentKey": "doro-7011",
      //     "price": "265.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Graphite",
      //         "hex": "#696969"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/doro7011_front_graphite_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/doro-7011"
      //   },
      //   {
      //     "brand": "Doro",
      //     "displayName": "Doro 8080",
      //     "contentKey": "doro-8080",
      //     "price": "369.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       32
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Vit",
      //         "hex": "#ffffff"
      //       },
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/Doro_8080_white_front_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/doro-8080"
      //   },
      //   {
      //     "brand": "Doro",
      //     "displayName": "Doro 8050",
      //     "contentKey": "doro-8050",
      //     "price": "299.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       16
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/Doro_8050_front-270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/doro-8050"
      //   },
      //   {
      //     "brand": "Huawei",
      //     "displayName": "Huawei P30",
      //     "contentKey": "huawei-p30",
      //     "price": "539.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       128
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/p30_black_front_251x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/huawei-p30"
      //   },
      //   {
      //     "brand": "Huawei",
      //     "displayName": "Huawei P30 Lite 128 GB",
      //     "contentKey": "huawei-p30-lite",
      //     "price": "399.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       128
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       },
      //       {
      //         "name": "Peacock Blue",
      //         "hex": "#4169e1"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/Huawei-P30-Lite-Front-Black-270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/huawei-p30-lite"
      //   },
      //   {
      //     "brand": "Huawei",
      //     "displayName": "Huawei P30 Pro",
      //     "contentKey": "huawei-p30-pro",
      //     "price": "549.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       128,
      //       256
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Breathing Crystal",
      //         "hex": "#87cefa"
      //       },
      //       {
      //         "name": "Amber Sunrise",
      //         "hex": "#ff4500"
      //       },
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/Huawei-P30-Vogue_Blue_Front-251x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/huawei-p30-pro"
      //   },
      //   {
      //     "brand": "Huawei",
      //     "displayName": "Huawei Y6s",
      //     "contentKey": "huawei-y6s",
      //     "price": "259.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       32
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       },
      //       {
      //         "name": "Orchid Blue",
      //         "hex": "#4169e1"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/huaweiY6s_front_blue_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/huawei-y6s"
      //   },
      //   {
      //     "brand": "Huawei",
      //     "displayName": "Huawei P40 Pro",
      //     "contentKey": "huawei-p40-pro",
      //     "price": "699.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       256
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g",
      //       "5g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       },
      //       {
      //         "name": "Silver Frost",
      //         "hex": "#beb8b8"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/huawei_p40_pro_front_black_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/huawei-p40-pro"
      //   },
      //   {
      //     "brand": "Nokia",
      //     "displayName": "Nokia 4.2",
      //     "contentKey": "nokia-4-2",
      //     "price": "239.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       32
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       },
      //       {
      //         "name": "Rosa",
      //         "hex": "#ffc0cb"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/Nokia%204.2%20Svart%20Front%20540x.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/nokia-4-2"
      //   },
      //   {
      //     "brand": "Samsung",
      //     "displayName": "Samsung Galaxy A40",
      //     "contentKey": "samsung-galaxy-a40",
      //     "price": "399.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       64
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Black",
      //         "hex": "#000000"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/galaxy_a40_front_black_242x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/samsung-galaxy-a40"
      //   },
      //   {
      //     "brand": "Samsung",
      //     "displayName": "Samsung Galaxy Xcover 4s",
      //     "contentKey": "samsung-galaxy-xcover-4s",
      //     "price": "324.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       32
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Black",
      //         "hex": "#071d3a"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/Xcover-4S-Front_Black-270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/samsung-galaxy-xcover-4s"
      //   },
      //   {
      //     "brand": "Samsung",
      //     "displayName": "Samsung Galaxy Xcover Pro",
      //     "contentKey": "samsung-galaxy-xcover-pro",
      //     "price": "547.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       64
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Black",
      //         "hex": "#071d3a"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/galaxy_xcover_pro_front_black_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/samsung-galaxy-xcover-pro"
      //   },
      //   {
      //     "brand": "Samsung",
      //     "displayName": "Samsung Galaxy S10",
      //     "contentKey": "samsung-galaxy-s10",
      //     "price": "599.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       128
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Prisma Vit",
      //         "hex": "#ffffff"
      //       },
      //       {
      //         "name": "Prisma Svart",
      //         "hex": "#000000"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/galaxys10_front_white-252x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/samsung-galaxy-s10"
      //   },
      //   {
      //     "brand": "Samsung",
      //     "displayName": "Samsung Galaxy S10e",
      //     "contentKey": "samsung-galaxy-s10e",
      //     "price": "579.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       128
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Prisma Vit",
      //         "hex": "#ffffff"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/galaxys10e_front_black270x540%20(1).png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/samsung-galaxy-s10e"
      //   },
      //   {
      //     "brand": "Samsung",
      //     "displayName": "Samsung Galaxy S20 5G",
      //     "contentKey": "samsung-galaxy-s20",
      //     "price": "599.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       128
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g",
      //       "5g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Cosmic Gray",
      //         "hex": "#808080"
      //       },
      //       {
      //         "name": "Cloud Pink",
      //         "hex": "#ffc0cb"
      //       },
      //       {
      //         "name": "Cloud Blue",
      //         "hex": "#87cefa"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/GalaxyS20_5G_front_gray-ny-270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/samsung-galaxy-s20"
      //   },
      //   {
      //     "brand": "Samsung",
      //     "displayName": "Samsung Galaxy S20+ 5G",
      //     "contentKey": "samsung-galaxy-s20-plus",
      //     "price": "769.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       128
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g",
      //       "5g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Cosmic Black",
      //         "hex": "#000000"
      //       },
      //       {
      //         "name": "Cosmic Gray",
      //         "hex": "#808080"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/GalaxyS20+_5G_front_black_gray-ny-270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/samsung-galaxy-s20-plus"
      //   },
      //   {
      //     "brand": "Samsung",
      //     "displayName": "Samsung Galaxy S20 Ultra 5G",
      //     "contentKey": "samsung-galaxy-s20-ultra",
      //     "price": "869.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       128
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g",
      //       "5g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Cosmic Gray",
      //         "hex": "#808080"
      //       },
      //       {
      //         "name": "Cosmic Black",
      //         "hex": "#000000"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/GalaxyS20Ultra_5G_front_black_gray-ny-270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/samsung-galaxy-s20-ultra"
      //   },
      //   {
      //     "brand": "Samsung",
      //     "displayName": "Samsung Galaxy Z Flip",
      //     "contentKey": "samsung-galaxy-z-flip",
      //     "price": "999.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       256
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g",
      //       "5g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       },
      //       {
      //         "name": "Lila",
      //         "hex": "#da70d6"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/sm_f700f_galaxy-z-flip_front-table-top_black-270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/samsung-galaxy-z-flip"
      //   },
      //   {
      //     "brand": "Samsung",
      //     "displayName": "Samsung Galaxy A51",
      //     "contentKey": "samsung-galaxy-a51",
      //     "price": "449.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       128
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/galaxy_a51_svart_front_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/samsung-galaxy-a51"
      //   },
      //   {
      //     "brand": "Sony",
      //     "displayName": "Sony Xperia 1",
      //     "contentKey": "sony-xperia-1",
      //     "price": "599.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       128
      //     ],
      //     "dualSIM": true,
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       },
      //       {
      //         "name": "Grå",
      //         "hex": "#C0C0C0"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/xperia_1_front_black_270x540%20.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/sony-xperia-1"
      //   },
      //   {
      //     "brand": "Sony",
      //     "displayName": "Sony Xperia 10",
      //     "contentKey": "sony-xperia-10",
      //     "price": "329.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       64
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       },
      //       {
      //         "name": "Navy blå",
      //         "hex": "#758a9f"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/xperia_10_front_black_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/sony-xperia-10"
      //   },
      //   {
      //     "brand": "Sony",
      //     "displayName": "Sony Xperia L3",
      //     "contentKey": "sony-xperia-l3",
      //     "price": "279.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       32
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/xperia_l3_black_front_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/sony-xperia-l3"
      //   },
      //   {
      //     "brand": "Sony",
      //     "displayName": "Sony Xperia 5",
      //     "contentKey": "sony-xperia-5-crm-black-week",
      //     "price": "499.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       128
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       },
      //       {
      //         "name": "Blå",
      //         "hex": "#0000cd"
      //       },
      //       {
      //         "name": "Röd",
      //         "hex": "#b22222"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/xperia5_front_black_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/sony-xperia-5-crm-black-week"
      //   },
      //   {
      //     "brand": "Sony",
      //     "displayName": "Sony Xperia 5",
      //     "contentKey": "sony-xperia-5",
      //     "price": "529.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       128
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Röd",
      //         "hex": "#b22222"
      //       },
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       },
      //       {
      //         "name": "Blå",
      //         "hex": "#0000cd"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/xperia5_front_blue_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/sony-xperia-5"
      //   },
      //   {
      //     "brand": "Sony",
      //     "displayName": "Sony Xperia L4",
      //     "contentKey": "sony-xperia-l4",
      //     "price": "299.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       64
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Blå",
      //         "hex": "#3544e4"
      //       },
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/xperia_l4_front_blue_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/sony-xperia-l4"
      //   },
      //   {
      //     "brand": "Sony",
      //     "displayName": "Sony Xperia 10 II",
      //     "contentKey": "sony-xperia-10-ll",
      //     "price": "449.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       128
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       },
      //       {
      //         "name": "Vit",
      //         "hex": "#ffffff"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/xperia_10_II_black_front_urbanears_pampas_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/sony-xperia-10-ll"
      //   },
      //   {
      //     "brand": "Sony",
      //     "displayName": "Sony Xperia 1 II",
      //     "contentKey": "sony-xperia-1-ll",
      //     "price": "699.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       256
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g",
      //       "5g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart",
      //         "hex": "#000000"
      //       },
      //       {
      //         "name": "Lila",
      //         "hex": "#9400d3"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/xperia_1_II_black_front_WH-1000XM3_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/sony-xperia-1-ll"
      //   },
      //   {
      //     "brand": "Alcatel",
      //     "displayName": "Alcatel 3 (2019)",
      //     "contentKey": "alcatel-3-2019",
      //     "price": "269.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       64
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Svart/Blå",
      //         "hex": "#0000cd"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/alcatel_front_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/alcatel-3-2019"
      //   },
      //   {
      //     "brand": "Xiaomi",
      //     "displayName": "Xiaomi Mi Note 10",
      //     "contentKey": "xiaomi-mi-note-10",
      //     "price": "449.0",
      //     "pricePrefix": "Pris",
      //     "priceSuffix": "kr/mån",
      //     "internalMemoryGB": [
      //       128
      //     ],
      //     "dualSIM": "",
      //     "screenSize": "",
      //     "networkTechnology": [
      //       "2g",
      //       "3g",
      //       "4g"
      //     ],
      //     "colorOptions": [
      //       {
      //         "name": "Midnight Black",
      //         "hex": "#000000"
      //       },
      //       {
      //         "name": "Aurora Green",
      //         "hex": "#20b2aa"
      //       },
      //       {
      //         "name": "Glacier White",
      //         "hex": "#fffafa"
      //       }
      //     ],
      //     "imgUrl": "https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/phones/xiaomi_black_front_270x540.png",
      //     "link": "https://www.telia.se/privat/telefoni/telefoner/produkt/xiaomi-mi-note-10"
      //   }
      // ]
      
      // TODO:needs to be handled in case of fetch or parse fail
      state.products = data
      this.data = data.filter(product => product.brand.toLowerCase() == this.brand)
      this.uriParams = getUriParams()
      this.lovedItemsCounter = state.loved.products.length

    } catch (error) {
      nav.push('error-page', {});
      console.error(error)
    }
  }

  @Listen('itemRemoved')
  handleRemove(event: CustomEvent<ProductCard>) {
    state.removed.products.indexOf(event.detail) < 0 
      ? state.removed.products.push(event.detail)
      : null
    this.data = [...this.data.filter(item => item.contentKey !== event.detail)]
  }

  @Listen('itemLoved')
  handleLove(event: CustomEvent<ProductCard>) {
    this.lovedItemsCounter++
    state.loved.products.indexOf(event.detail) < 0 
      ? state.loved.products.push(event.detail)
      : null
    this.data = [...this.data.map(item => {
      if(item.contentKey == event.detail) {
        item['loved'] = true
      }
    })]
  }

  async componentWillRender () {
    this.customizelist()
  }

  customizelist() {
    this.data = [...state.products.filter(product => product.brand.toLowerCase() == this.brand)]
    if(this.uriParams) {
      this.filterItems()
    }
    if(this.sortState) {
      this.sortData(this.data)
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
    let products = [...state.products.filter(product => product.brand.toLowerCase() == this.brand)]
    products = [...products.filter(product => state.removed.products.includes(product.contentKey) === false)]
    const filterTest = (arr, criteria) => {
      return arr.filter((obj) => {
        let passed:Object = {}
        Object.keys(criteria).map((c) => {
          if(typeof criteria[c] == 'number') {
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
            <ion-col sizeMd="12">
              <ion-item>
                <ion-text class="ion-padding-end">Loved items in total: 
                  <ion-text color="tertiary" class="ion-padding-start counter">{this.lovedItemsCounter}</ion-text>
                </ion-text>
                <ion-label>Sort items by title ascending</ion-label>
                <ion-toggle checked={this.sortState} onIonChange={(ev) => (this.sortState = ev.detail.checked)} />
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row> 
            {this.data.length == 0
                ? <h3>No data loaded yet</h3>
                : this.data.map((item) =>
                <ion-col size="12" sizeSm="6" sizeMd="4" sizeLg="3">
                  <product-card item={item} productType={true}></product-card>
                </ion-col>
              )}
          </ion-row>
        </ion-grid>
      </ion-content>
    );
  }

}
