export const strict = false

// =================================================
// State
// =================================================
export const state = () => ({
    direct: null,
    countries: []
})
// =================================================
// Getters
// =================================================
export const getters = {
    authenticated(state) {
        return state.auth.loggedIn
    },
    user(state) {
        return state.auth.user
    },
    direct(state) {
        return state.direct
    },
    countries(state) {
        return state.countries
    },

}
// =================================================
// Mutations
// =================================================
export const mutations = {
    SET_DIRECT(state, direct) {
        state.direct = direct;
    },
    SET_COUNTRIES(state, countries) {
        state.countries = countries;
    },
}
// =================================================
// Actions
// =================================================
export const actions = {
    async setDirect({ commit }, session_id) {

        let direct = await this.$axios.$get(`/direct/session/${session_id}`);
        commit('SET_DIRECT', direct.data);
        return direct.success;
    },
    async setCountries({ commit }) {
        let countries = await this.$axios.$get('/countries');
        commit('SET_COUNTRIES', countries.data);
    },
}
