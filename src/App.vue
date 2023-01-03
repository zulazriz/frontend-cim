<script>

export default {
  name: 'App',
}
</script>

<template>
  <div id="app">
    <RouterView :key="$route.fullPath" />
  </div>
</template>
