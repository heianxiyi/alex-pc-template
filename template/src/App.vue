<template>
    <div id="app" :class="$route.name != 'login' ? 'base': ''">
        <div id="nav" v-if="$route.name != 'login'">
            <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>
        </div>
        <router-view />
    </div>
</template>
<script>
export default {
    name: "app"
};
</script>
<style lang="stylus">
@import './styles/common'
.base
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    margin-top 60px
</style>
