<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type
@import '@/assets/scss/_base.scss';

html {
  font-size: 62.5%;
}

body {
  font-family: $font-family;
  font-size: 3rem;
  background: $background;
}

a {
  text-decoration: none;
}

#app {
  width: 100%;
  min-height: 100vh;
  font-family: $font-family;
  color: #2c3e50;
}
</style>
