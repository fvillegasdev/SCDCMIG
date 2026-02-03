/// <reference path="../../typings/react/react-global.d.ts" />
/// <reference path="./StoreTypes.ts" />
/// <reference path="./reducers/AppReducer.ts" />

namespace EK.Store {
    "use strict";

    let thunk: any = (<any>window).ReduxThunk.default;

    //
    // reducers must be defined here
    //
    const reducers: any = Redux.combineReducers(EK.Store.BaseReducers);

    //
    // create main Store object
    //
    export let store: any = Redux.createStore(reducers, Redux.applyMiddleware(thunk));

    //
    // helper functions to manage state
    //
    export const getState: () => any = (): any => store.getState();
    export const getStateSection: <T>(reducer: string) => T = <T>(reducer: string): T => store.getState()[reducer];
    export const dispatch: (a: any) => any = (a: any) => store.dispatch(a);
    export const subscribeToState: Function = (callback: () => void) => store.subscribe(callback);
}