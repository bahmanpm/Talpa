const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.transpileOptions = {
          transforms: {
            dangerousTaggedTemplateString: true,
          },
        };
        return options;
      });
    config.module
      .rule("graphql")
      .test(/\.gql$/)
      .use("graphql-tag/loader")
      .loader("graphql-tag/loader");
  },
});
