import actions from './actions'
import mutations from './mutations'

const store = {
    state: {
        count: 0,
        todos: [{
            id: 1,
            text: '111',
            done: true
        }, {
            id: 2,
            text: '222',
            done: false
        }]
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        },
        doneTodosCount: (state, getters) => {
            return getters.doneTodos.length
        },
        getTodoById: (state, getters) => (id) => {
            return state.todos.find(todo => todo.id === id)
        }
    },
    mutations: mutations,
    actions: actions
}

export default store