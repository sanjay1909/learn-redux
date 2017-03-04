import $$observable from 'symbol-observable';

export const ActionTypes = {
    INIT: '@@redux/INIT'
}


export default function createStore(reducer){
    let currentReducer = reducer;
    let currentState = {};
    let currentListeners = [];
    let nextListeners = currentListeners;
    let isDispatching = false;


    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
            nextListeners = currentListeners.slice()
        }
    }

    function getState() {
        return currentState
    }


    function subscribe(listener) {

        let isSubscribed = true;

        ensureCanMutateNextListeners();
        nextListeners.push(listener);

        return function unsubscribe() {
            if (!isSubscribed) {
                return
            }

            isSubscribed = false;

            ensureCanMutateNextListeners();
            const index = nextListeners.indexOf(listener);
            nextListeners.splice(index, 1)
        }
    }


    function dispatch(action) {

        if (isDispatching) {
            throw new Error('Reducers may not dispatch actions.');
        }

        try {
            isDispatching = true;
            currentState = currentReducer(currentState, action);
        } finally {
            isDispatching = false;
        }

        const listeners = currentListeners = nextListeners;
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }

        return action;
    }

    dispatch({ type: ActionTypes.INIT })

    return {
        dispatch,
        subscribe,
        getState
    }


}