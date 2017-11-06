export default {
    increment (context) {
        context.commit('increment')
    },
    increment2 ({ commit }) {
        commit('increment')
    }
}