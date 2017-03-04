import createStore from './createStore';



function reducer(state = 0, action){
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;

    }
}


window.store = createStore(reducer);

window.increment = function(){
    window.store.dispatch({ type: 'INCREMENT' })
};

window.decrement = function(){
    window.store.dispatch({ type: 'DECREMENT' })
}
