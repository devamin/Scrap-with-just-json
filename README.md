4 years old project, I created this to serve one of my needs, you can scrap any website by just providing the JSONQuery as showing in this example and you will get data back. **No longer maintained**
```


{
    "start": "https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw=t-shirt&_sacat=0",
    "box": ".s-item__wrapper.clearfix",
    "link": "a.s-item__link",
    "att": "href",
    "type": "end",
    "includes": [{
        "type": "ARRAY_OF_OBJECTS",
        "box": ".s-item__wrapper.clearfix",
        "elements": [{
            "key": "price",
            "selector": ".s-item__price",
            "att": "textContent",
            "type": "FIELD",
            "filters": [{
                "type": "GT",
                "comparedTo": 15
            }],
            "mutate": {
                "type": "FLOAT"
            }
        }, {
            "key": "title",
            "selector": ".s-item__title",
            "att": "textContent",
            "type": "FIELD"
        }, {
            "key": "shipping",
            "selector": ".s-item__shipping.s-item__logisticsCost",
            "att": "textContent",
            "type": "FIELD"
        }],
        "key": "products"
    }]
}
```
