<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
/* Theme Color */
$--color-primary: #409EFF;
$--color-success: #67c23a;
$--color-warning: #e6a23c;
$--color-danger: #f56c6c;
$--color-info: #909399;
$--color-white: #fff;
$--color-black: #000;

/* Theme Text Color */
$--color-text-primary: #303133;
$--color-text-regular: #606266;
$--color-text-secondary: #909399;
$--color-text-placeholder: #c0c4cc;

/* Theme Background Color */
$--background-color-base: #f5f7fa;

/* Icon Font Path ( Required ) */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

/**
 * Wish to override other base theme syles?
 * @SEE: ./node_modules/element-ui/packages/theme-chalk/src/common/var.scss
 */

@import "~element-ui/packages/theme-chalk/src/index";
@import "~vue2-animate/src/sass/vue2-animate";

/* Requred Base App Style */
html {
  box-sizing: border-box;
}

@font-face{font-family:StateFaceRegular;src:url(fonts/stateface-regular-webfont.eot);src:url(fonts/stateface-regular-webfont.eot?#iefix) format('embedded-opentype'),url(fonts/stateface-regular-webfont.woff) format('woff'),url(fonts/stateface-regular-webfont.ttf) format('truetype'),url(fonts/stateface-regular-webfont.svg#StateFaceRegular) format('svg');font-weight:400;font-style:normal}.stateface:before{font-family:StateFaceRegular;margin-right:5px}.stateface-replace{text-indent:-999em;display:inline-block;position:relative;min-width:1em}.stateface-replace:before{position:absolute;left:0;top:0;text-indent:0}.stateface-ak:before{content:"A"}.stateface-al:before{content:"B"}.stateface-ar:before{content:"C"}.stateface-az:before{content:"D"}.stateface-ca:before{content:"E"}.stateface-co:before{content:"F"}.stateface-ct:before{content:"G"}.stateface-dc:before{content:"y"}.stateface-de:before{content:"H"}.stateface-fl:before{content:"I"}.stateface-ga:before{content:"J"}.stateface-hi:before{content:"K"}.stateface-ia:before{content:"L"}.stateface-id:before{content:"M"}.stateface-il:before{content:"N"}.stateface-in:before{content:"O"}.stateface-ks:before{content:"P"}.stateface-ky:before{content:"Q"}.stateface-la:before{content:"R"}.stateface-ma:before{content:"S"}.stateface-md:before{content:"T"}.stateface-me:before{content:"U"}.stateface-mi:before{content:"V"}.stateface-mn:before{content:"W"}.stateface-mo:before{content:"X"}.stateface-ms:before{content:"Y"}.stateface-mt:before{content:"Z"}.stateface-nc:before{content:"a"}.stateface-nd:before{content:"b"}.stateface-ne:before{content:"c"}.stateface-nh:before{content:"d"}.stateface-nj:before{content:"e"}.stateface-nm:before{content:"f"}.stateface-nv:before{content:"g"}.stateface-ny:before{content:"h"}.stateface-oh:before{content:"i"}.stateface-ok:before{content:"j"}.stateface-or:before{content:"k"}.stateface-pa:before{content:"l"}.stateface-ri:before{content:"m"}.stateface-sc:before{content:"n"}.stateface-sd:before{content:"o"}.stateface-tn:before{content:"p"}.stateface-tx:before{content:"q"}.stateface-us:before{content:"z"}.stateface-ut:before{content:"r"}.stateface-va:before{content:"s"}.stateface-vt:before{content:"t"}.stateface-wa:before{content:"u"}.stateface-wi:before{content:"v"}.stateface-wv:before{content:"w"}.stateface-wy:before{content:"x"}

*, *:before, *:after {
  box-sizing: inherit;
}
#app {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.router-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all .5s cubic-bezier(.55, 0, .1, 1);
}
</style>
