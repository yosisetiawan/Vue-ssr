<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default{
  metaInfo:{
    title: 'My Example App', // set a title
    titleTemplate: '%s - Yay!', // title is now "My Example App - Yay!"
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'description', content: 'I have things here on my site.'},
      {name: 'twitter:card', content: 'summary'},
      {name: 'twitter:site', content: 'https://www.my-site.com/my-special-page'},
      {name: 'twitter:title', content: 'My Page Title ← My Site'},
      {name: 'twitter:description', content: 'I have things here on my site.'},
      // Your twitter handle, if you have one.
      {name: 'twitter:creator', content: '@alligatorio'},
      {name: 'twitter:image:src', content: 'https://www.my-site.com/my-special-image.jpg'},

      // Google / Schema.org markup:
      {itemprop: 'name', content: 'My Page Title ← My Site'},
      {itemprop: 'description', content: 'I have things here on my site.'},
      {itemprop: 'image', content: 'https://www.my-site.com/my-special-image.jpg'}
    ]
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
