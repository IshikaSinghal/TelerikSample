<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |  
      <router-link to="/alertmodalpopup">AlertModalPopup</router-link>
    </nav>
    <router-view /> <!-- This will render the routed components -->
  </div>
</template>

<script>
import '@progress/kendo-theme-default/dist/all.css'; // Add Kendo CSS
// Import components if needed, but router-view handles rendering
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
