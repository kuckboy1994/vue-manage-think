export default {
    increment (state) {
        state.count++
    },
    increment2 (state, n) {
        state.count += n
    },
    increment3 (state, payload) {
        state.count += payload.amount
    }
}