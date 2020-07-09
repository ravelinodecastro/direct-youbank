import Vue from 'vue';
import { mapGetters } from 'vuex';

const Validation = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    errors: 'validation/errors',
                    requestMessage: 'validation/requestMessage',

                })
            }
        })
    }
}

Vue.use(Validation)