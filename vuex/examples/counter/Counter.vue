<template>
  <div id="app">
    Clicked: {{ $store.state.count }} times, count is {{ evenOrOdd }}.
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
    <ul>
      root
      <li>count: {{$store.state.count}}</li>
      <li>evenOrOdd: {{$store.getters.evenOrOdd}}</li>
    </ul>
    <ul>
      test
      <li>state.test.a: {{$store.state.test.a}}</li>
      <li>getters.a: {{$store.getters.a}}</li>
      <li>getters.count: {{$store.getters.count}}</li>
      <li>getters.rootCount: {{$store.getters.rootCount}}</li>
      <li>namespace: {{a}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions, createNamespacedHelpers } from 'vuex'
// import { mapState } from '../../types'
const { mapState } = createNamespacedHelpers('testNamespace')

export default {
  computed: {
    ...mapGetters(['evenOrOdd']),
    ...mapState(['a'])
  },
  methods: mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])
}
</script>
