// npm install redux so we can have a global state that can be shared across other components
import { createStore } from 'redux'
// import the following google extension to view the global state while inspecting webpage
import { composeWithDevTools } from "redux-devtools-extension"

// Reducer is used to change the state in redux
// actions are taken from store.dispatch
const counterReducer = (state = { value: 0 }, action) => {
    switch (action.type) {
        case "ADD":
            return { value: state.value + 1 + action.someValue }
        default:
            return state

    }
}

const store = createStore(counterReducer, { value: 0 }, composeWithDevTools())

store.dispatch({
    type: "ADD",
    someValue: 10
})

export default store;