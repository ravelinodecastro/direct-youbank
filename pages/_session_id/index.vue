<template>
  <div style="height: 100vh" class="bg-gray-yb p-md-4">
    <div class="container">
      <div class="col-md-9">
        <h4 class="text-dark">{{direct.receiver_name}}</h4>
        <div class="card bg-white">
          <div class="row p-4">
            <div class="col-md-7">
              <div class="d-flex justify-content-between">
                <img
                  :src="  user ? user.setting.darkmode == 1 ? '/images/youbank-logo-white.svg' : '/images/youbank-app-splash-logo.png':'/images/youbank-app-splash-logo.png'"
                  alt="Logo"
                  style="width: 120px;"
                />
                <div class="text-dark small">
                  Total:
                  <span
                    class="font-weight-bold"
                  >{{formatMoney(direct.amount)}} {{direct.money}}</span>
                </div>
              </div>
              <hr />
              <div v-if="authenticated">
                <div v-if="methodSetted==false">
                  <a
                    class="small"
                    v-if="loggedHere==false"
                    href="#"
                    @click.prevent="logout"
                  >Não é a sua conta?</a>
                  <div class="text-dark small">Olá, {{user.first_name}}.</div>
                  <div class="h4 font-weight-light text-dark">Escolha um meio de pagamento</div>

                  <div
                    class="d-flex mb-2"
                    v-for="method in direct.methods"
                    :key="method.id"
                    @click.prevent="selectMethod(method)"
                  >
                    <div
                      class="mr-2 d-flex justify-content-center align-items-center yb-radio-container"
                    >
                      <div
                        :class="{active: method.id==(methodSelected?methodSelected.id:'')}"
                        class="yb-radio-inner"
                      ></div>
                    </div>
                    <div class="mr-1 p-1 d-flex justify-content-center method-container">
                      <img :src="method.logo" :alt="method.name" class="img-fluid" />
                    </div>
                    <div class="text-dark small">{{method.name}}</div>
                  </div>

                  <div class="pt-4">
                    <button
                      @click.prevent="continuePaying"
                      type="submit"
                      class="btn btn-info btn-block rounded-pill"
                    >Continuar</button>
                  </div>
                </div>
                <div v-else-if="methodSetted">
                  <div class="h6 font-weight-light text-dark">Enviar para</div>
                  <div
                    class="text-dark small font-weight-bold"
                  >{{user.first_name}} {{user.last_name}}</div>
                  <div
                    class="text-dark small"
                  >{{user.address?user.address:'Enderenço não definido.'}}</div>

                  <hr />
                  <div class="h6 font-weight-light text-dark">Pagar com</div>

                  <div class="d-flex mb-2">
                    <div class="mr-1 p-1 d-flex justify-content-center method-container">
                      <img :src="methodSelected.logo" :alt="methodSelected.name" class="img-fluid" />
                    </div>
                    <div class="text-dark small">{{methodSelected.name}}</div>
                  </div>
                  <div class="pt-4">
                    <button
                      @click.prevent="pay"
                      class="btn btn-info btn-block rounded-pill"
                    >Aceitar e Pagar</button>
                  </div>
                </div>
              </div>
              <div v-else>
                <form @submit.prevent="submit">
                  <InputPhoneNumber
                    v-model="emailOrPhone"
                    :enableFlagContainer="false"
                    :onlyCountries="onlyCountries"
                    :maxLen="60"
                    :enabledCountryCode="false"
                    :autofocus="true"
                    :name="'emailOrPhone'"
                    :required="true"
                    :enabledFlags="true"
                    @validate="setPhoneNumber"
                    wrapperClasses="mt-5"
                    placeholder="Número de telefone ou e-mail"
                  ></InputPhoneNumber>

                  <div class="floating-label mt-5">
                    <input
                      required
                      v-model="form.password"
                      class="floating-input text-dark"
                      type="password"
                      placeholder=" "
                    />
                    <span class="highlight"></span>
                    <label class="label-floater">Senha</label>
                  </div>
                  <div>
                    <div class="small text-danger">{{message}}</div>
                  </div>
                  <div class="pt-4">
                    <button type="submit" class="btn btn-info btn-block rounded-pill">Entrar</button>
                  </div>

                  <div class="d-flex justify-content-between pt-4">
                    <a
                      :href="`${yb_url}/auth/recover`"
                      class="text-info small text-decoration-none"
                    >Esqueci a senha</a>
                    <a
                      :href="`${yb_url}/auth/signup`"
                      class="text-info small text-decoration-none"
                    >Cadastrar-me</a>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-md-5 d-none d-md-block">
              <img class="img-fluid" src="/images/youbank-app-background.png" alt="Background" />
            </div>
          </div>
        </div>
        <a
          class="small"
          :href="direct.redirect_on_failure_url"
        >Cancelar e voltar para {{direct.receiver_name}}</a>
      </div>

      <div class="containar-fluid bg-gray-yb footer-yb">
        <div class="py-3">
          <footer class="text-center text-md-right d-md-flex d-block justify-content-between">
            <div class="small text-muted">YouBank - Todos os direitos reservados.</div>
            <div class="small text-muted">Versão Beta 1.0</div>
            <a href="#" class="small text-muted text-decoration-none">Termos e Condições</a>
          </footer>
        </div>
      </div>
    </div>
    <Logout />
  </div>
</template>
<script>
import InputPhoneNumber from "~/components/InputPhoneNumber.vue";
import Logout from "~/components/Logout.vue";
export default {
  components: {
    InputPhoneNumber,
    Logout
  },
  head() {
    return {};
  },
  async validate({ params, query, store }) {
    return await store.dispatch("setDirect", params.session_id);
  },
  data() {
    return {
      yb_url: process.env.YB_URL,
      methodSelected: null,
      methodSetted: false,
      loggedHere: false,
      emailOrPhone: "",
      message: "",
      form: {
        phone_number: "",
        dialCode: "",
        iso: "",
        number_type: "",
        number_is_valid: "",
        email: "",
        password: ""
      }
    };
  },
  mounted() {
    //this.changeRedirect(this.$route.path);

    this.methodSelected = this.direct.methods[0];
  },
  methods: {
    changeRedirect(key) {
      this.$auth.options.redirect.home = key;
      this.$auth.options.redirect.login = key;
      this.$auth.$storage.setUniversal("redirect", key, false);
      this.$auth.$storage.setLocalStorage("redirect", key, false);
      this.$auth.$storage.setCookie("redirect", key, false);
    },
    selectMethod(method) {
      this.methodSelected = method;
    },
    continuePaying() {
      if (this.methodSelected == null) {
        this.methodSelected = this.direct.methods[0];
      }
      this.methodSetted = true;
    },

    setPhoneNumber(e) {
      this.emailOrPhone = e.number.significant;
      this.form.number_type = e.type;
      this.form.number_is_valid = e.valid;
      this.form.dialCode = e.country.dialCode;
      this.form.iso = e.country.iso2;
    },
    checkEmailOrNumber() {
      if (this.validateEmail(this.emailOrPhone)) {
        this.form.email = this.emailOrPhone;
        return true;
      } else if (this.form.number_is_valid) {
        this.form.phone_number = this.emailOrPhone;
        return true;
      } else {
        this.$Swal.fire(
          "Erro!",
          "Número de telefone ou e-mail incorrecto.",
          "error"
        );
        return false;
      }
    },
    async logout() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        loader: "dots",
        color: "#0CB6E1"
      });

      await this.$auth.logout();

      loader.hide();
    },
    async submit() {
      if (this.checkEmailOrNumber()) {
        let loader = this.$loading.show({
          // Optional parameters
          container: this.fullPage ? null : this.$refs.formContainer,
          canCancel: false,
          loader: "dots",
          color: "#0CB6E1"
        });
        try {
          await this.$auth.loginWith("local", {
            data: this.form
          });

          this.loggedHere = true;
          loader.hide();
        } catch (e) {
          this.message = "Falha na autenticação";
          //Swal.fire("Erro!", this.requestMessage, "error");
          this.error = this.requestMessage;
          loader.hide();
        }
      }
    },
    async pay() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        loader: "dots",
        color: "#0CB6E1"
      });

      this.$axios
        .$post(`/direct/session/${this.direct.session_id}`, this.methodSelected)
        .then(data => {
          if (data.success) {
            if (data.data.reference) {
              this.$Swal.fire({
                html: `<div class="d-flex justify-content-center"><i style="font-size: 5em; " class="color-yb-blue-alert icon-youbank-icon-success"></i></div>
                  <p class="small text-center mt-2 text-dark">
                  ${data.message}
                  </p>
                  <div class="small text-center text-dark py-1">Valor a Pagar: <span class="font-weight-bold">
                  ${this.formatMoney(data.data.amount)} ${data.data.money}
                  </span></div>
                  <div class="small text-center text-dark py-1">Entidade: <span class="font-weight-bold">
                  ${data.data.entity}
                  </span></div>
                  <div class="small text-center text-dark py-1">Nome da Entidade: <span class="font-weight-bold">
                  ${data.data.entity_name}
                  </span></div>
                  <div class="small text-center text-dark py-1">Referência: <span class="font-weight-bold">
                  ${this.referenceMask(data.data.reference)}
                  </span></div></div>`,

                confirmButtonText: "Está bem"
              });
            } else {
              this.$Swal.fire({
                html: `<div class="d-flex justify-content-center"><i style="font-size: 5em; " class="color-yb-blue-alert icon-youbank-icon-success"></i></div>
                  <p class="text-center mt-5 text-dark">${data.message}</p>`,

                confirmButtonText: "Está bem"
              });
              if (data.redirect_on_success_url)
                window.location.replace(data.redirect_on_success_url);
            }
          } else {
            this.$Swal.fire("Erro!", data.message, "error");
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          loader.hide();
        });
    }
  },
  computed: {
    onlyCountries() {
      let data = [];

      this.countries.map(item => {
        data.push(item.iso);
      });

      return data;
    }
  }
};
</script>
