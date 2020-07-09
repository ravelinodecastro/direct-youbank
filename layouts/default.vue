<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
export default {
  head() {
    return {
      meta: [
        {
          hid: "theme-color",
          name: "theme-color",
          content: this.user
            ? this.user.setting.darkmode == 1
              ? "#3e3e3e"
              : "#0CB6E1"
            : "#0CB6E1"
        },
        {
          hid: "msapplication-navbutton-color",
          name: "msapplication-navbutton-color",
          content: this.user
            ? this.user.setting.darkmode == 1
              ? "#3e3e3e"
              : "#0CB6E1"
            : "#0CB6E1"
        },

        {
          hid: "apple-mobile-web-app-status-bar-style",
          name: "apple-mobile-web-app-status-bar-style",
          content: this.user
            ? this.user.setting.darkmode == 1
              ? "#3e3e3e"
              : "#0CB6E1"
            : "#0CB6E1"
        }
      ],
      link: [
        {
          rel: "stylesheet",
          href: this.user
            ? this.user.setting.darkmode == 1
              ? "/css/darkmode.css"
              : ""
            : ""
        }
      ]
    };
  }
};
</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
