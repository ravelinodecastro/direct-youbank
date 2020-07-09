<template></template>
<script>
export default {
  data() {
    return {
      time: 10000,
      sleep: false
    };
  },
  onIdle() {
    this.sleep = true;
    if (this.authenticated) {
      this.logoutAlert();
    }
  },
  onActive() {
    this.sleep = false;
  },
  methods: {
    logoutAlert() {
      let timerId = setInterval(() => {
        this.time -= 1000;
        if (!this.sleep) clearInterval(timerId);
        if (this.time < 1) {
          clearInterval(timerId);
          this.logout();
        }
      }, 1000);
      let timerInterval;
      this.$Swal
        .fire({
          html: `<div class="d-flex justify-content-center"><i style="font-size: 5em; " class="color-yb-orange-alert icon-youbank-icon-feedback"></i></div>
          <p class="h5 font-weight-bold text-center mt-5 text-dark">Você ficou muito tempo inactivo.</p>
          <p class="text-center mt-5 text-dark">Restam <b></b> segundos para terminar a sessão.</p>
          <p class="text-center mt-5 text-dark">Deseja terminar  agora?</p>`,
          showCancelButton: true,
          confirmButtonText: "Sim",
          cancelButtonText: "Não",
          timer: 10000,
          onBeforeOpen: () => {
            timerInterval = setInterval(() => {
              const content = this.$Swal.getContent();
              if (content) {
                const b = content.querySelector("b");
                if (b) {
                  b.textContent = parseInt(this.$Swal.getTimerLeft() / 1000);
                }
              }
            }, 1000);
          },
          onClose: () => {
            clearInterval(timerInterval);
          }
        })
        .then(result => {
          if (result.value) {
            this.logout();
          } else {
            this.sleep = false;
            this.time = 10000;
          }
        });
    },
    async logout() {
      await this.$auth.logout();
    }
  }
};
</script>
