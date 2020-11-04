/*
  This file collects files inside of modules folders and makes modules out of those files
  Files should be named in following convention:
  1. state.js (field)
  2. getters.js (getField)
  3. mutations.js (SET_FIELD)
  4. actions.js (fetchField)

  We are following the best practicies from here:
  https://dev.to/localeai/architecting-vuex-store-for-large-scale-vue-js-applications-4f1f

  Please when you writing your own module use async/await instead of Promises
*/

const requireModule = require.context('.', true, /\.js$/)
const modules = {}

requireModule.keys().forEach((fileName) => {
  if (fileName === './index.js') return

  // Replace ./ and .js
  const path = fileName.replace(/(\.\/|\.js)/g, '')
  const [moduleName, imported] = path.split('/')

  if (!modules[moduleName]) {
    modules[moduleName] = {
      namespaced: true
    }
  }

  modules[moduleName][imported] = requireModule(fileName).default
})
export default modules
