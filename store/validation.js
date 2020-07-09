// =================================================
// State
// =================================================
export const state = () => ({
    errors: {
    },
    requestMessage: null
})
// =================================================
// Getters
// =================================================
export const getters = {
    errors(state) {
        return state.errors
    },
    requestMessage(state) {
        return state.requestMessage
    },
}
// =================================================
// Mutations
// =================================================
export const mutations = {
    SET_VALIDATION_ERRORS(state, errors) {
        state.errors = errors;
    },
    SET_REQUEST_MESSAGE(state, requestMessage) {
        state.requestMessage = requestMessage;
    },
}
// =================================================
// Actions
// =================================================
export const actions = {

    setErrors({ commit }, errors) {
        commit('SET_VALIDATION_ERRORS', errors);
    },
    clearErrors({ commit }) {
        commit('SET_VALIDATION_ERRORS', {});
    },
    setRequestMessage({ commit }, requestMessage) {
        commit('SET_REQUEST_MESSAGE', requestMessage);
    },
    clearRequestMessage({ commit }) {
        commit('SET_REQUEST_MESSAGE', "");
    },

}
