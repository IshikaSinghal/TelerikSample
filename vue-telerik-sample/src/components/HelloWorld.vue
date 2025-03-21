<template>
  <div>
    <h3>Grid</h3>
    <DataGrid></DataGrid>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import DataGrid from './grid/DataGrid.vue';

@Component({
  components: {
    DataGrid
  }
})  
export default class HelloWorld extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
