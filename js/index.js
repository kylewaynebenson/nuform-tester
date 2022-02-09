
/*<![CDATA[*/
    function ShopifyInit(fontID) {
        var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
        var shopifyOptions = {
            "toggle": {
                "sticky": false,
                "iframe": false,
                "contents": {
                    "icon": false
                  },
               },
            "lineItem": {
                "contents": {
                    "image": true,
                    "variantTitle": true,
                    "title": true,
                    "price": false,
                    "priceWithDiscounts": true,
                    "quantity": true,
                    "quantityIncrement": true,
                    "quantityDecrement": true,
                    "quantityInput": false,
                  },
                  "order": [
                    'quantity',
                    'image',
                    'title',
                    'variantTitle',
                    'customAttributes',
                    'price',
                    'priceWithDiscounts',
                  ],
            },
            "product": {
              "iframe": false,
              "contents": {
                "description": false,
                "quantity": false,
                "quantityDecrement": false,
                "quantityIncrement": false
              },
              "order": [
                'options',
                'button'
              ],
              "text": {
                  "button": 'Buy license'
                },
              "templates": {
                  "button": '<button class="margin-s {{data.classes.product.button}} {{data.buttonClass}}">' +
                    '<h6 class="no-mb inline {{data.classes.product.prices}}">' +
                      '<span class="{{data.classes.product.compareAt}}">{{data.formattedCompareAtPrice}}</span>' +
                      '<span class="{{data.classes.product.price}}">{{data.formattedPrice}}</span>' +
                    '</h6>' + ' ' +
                    '<h5 class="no-mb inline">' +
                    '{{data.buttonText}}' +
                    '</h6>' +
                  '</button>'
                  }
            },
            "cart": {
              "iframe": false,
              "popup": false,
              "templates": {
                "footer": '{{^data.isEmpty}}' +
                  '<div class="{{data.classes.cart.footer}}" data-element="cart.footer">' +
                    '<p class="{{data.classes.cart.subtotalText}}" data-element="cart.total">{{data.text.total}}</p>' +
                    '<p class="{{data.classes.cart.subtotal}}" data-element="cart.subtotal">{{data.formattedTotal}}</p>' +
                    '<button class="{{data.classes.cart.button}} margin-m" type="button" data-element="cart.button">{{data.text.button}}</button>' +
                    '<p class="{{data.classes.cart.notice}}" data-element="cart.notice">{{data.text.notice}}</p>' +
                  '</div>' +
                  '{{/data.isEmpty}}'
              },
              "contents": {
                "footer": true,
              },
              "text": {
                "total": "SUBTOTAL",
                "button": "Checkout",
                "notice": "Note: license quantity is not the same as company size. Company size, selected via dropdown on the font page, is the size of the license (ex: 100 employees). License quantity is the amount of licensees (ex: two companies)."
              },
              "events": {
                "openCheckout": function (cart) {},
                "updateItemQuantity": function (cart) {},
              }
            }
          }
        if (window.ShopifyBuy) {
          if (window.ShopifyBuy.UI) {
            ShopifyBuyInit();
          } else {
            loadScript();
          }
        } else {
          loadScript();
        }
        function loadScript() {
          var script = document.createElement('script');
          script.async = true;
          script.src = scriptURL;
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
          script.onload = ShopifyBuyInit;
        }
        function ShopifyBuyInit() {
          var client = ShopifyBuy.buildClient({
            domain: 'very-cool-studio.myshopify.com',
            storefrontAccessToken: '2d6aeb57e65ac0c8cb1a5396784da177'
          });
          ShopifyBuy.UI.onReady(client).then(function (ui) {
            if (typeof fontID !== 'undefined') {
                ui.createComponent('product', {
                id: '' + fontID,
                node: document.getElementById('product-component-' + fontID),
                moneyFormat: '%24%7B%7Bamount%7D%7D',
                toggles: [{node: document.getElementById('shopify-cart-toggle')}],
                options: shopifyOptions
                });
            } else {
                ui.createCart({
                    moneyFormat: '%24%7B%7Bamount%7D%7D',
                    toggles: [{node: document.getElementById('shopify-cart-toggle')}],
                    contents: {
                        img: false,
                        title: false,
                        variantTitle: false,
                        price: false,
                        options: false,
                        quantity: false, // determines whether to show any quantity inputs at all
                        quantityIncrement: false, // button to increase quantity
                        quantityDecrement: false, // button to decrease quantity
                        quantityInput: false, // input field to directly set quantity
                        button: false,
                        description: false
                    },
                    options: shopifyOptions
                })
            }
          });
        }
      }
      /*]]>*/

function featureOn(checkbox, feature) {
  var fontFeature = "font-feature-settings: '"+feature+"' 1;"
  var featurePreview = feature+"-sample";
  if(checkbox.checked == true){
      document.getElementById(featurePreview).setAttribute("style", fontFeature);
  }else {
    document.getElementById(featurePreview).removeAttribute("style", fontFeature);
  }
}