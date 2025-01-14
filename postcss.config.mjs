/** @type {import("postcss-load-config").Config} */
const config = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      propList: ["*"],
      rootValue: 16,
      selectorBlackList: ["html"],
    },
    tailwindcss: {},
  },
}

export default config
