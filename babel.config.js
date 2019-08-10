module.exports = {
  presets: [
    [
      "@vue/app",
      {
        // polyfills: ["es6.promise", "es6.symbol"],  //按需转译promise symbol
        useBuiltIns: "usage" //全部转译  *注意 此处为usage 不是entry  main.js不用import "@babel/polyfill"
      }
    ]
  ]
};
