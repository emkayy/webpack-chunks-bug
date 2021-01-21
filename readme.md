Git repo for webpack issue #12464
https://github.com/webpack/webpack/issues/12464

Run  
`npm install`  
`npm run webpack`  

Expected is the creation of just 2 bundles.
However, a vendor bundle is also created, even though

```
optimization: {
    splitChunks: false
},
```

and

```
new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
}),
```

should both prevent that from happening.
