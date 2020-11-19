<template>
  <div>
    <button @click="search">button</button>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      variable: ''
    }
  },
  methods: {
    search: _.debounce(function (value) {
      console.log('11')
    }, 1000)
  }
}
</script>
