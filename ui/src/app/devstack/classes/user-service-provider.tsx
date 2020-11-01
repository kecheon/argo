import React = require('react');
import { User, UserState, userStateReducer } from './current-user';

// Interface to define the basic props for the provider component
interface UserStateProviderProps {
  children: any;
}

// Interface to define to state of the context object.
interface IUserStateContext {
  state: UserState;
  dispatch: ({type}:{type:string}) => void;
}

// A basic empty context object.
export const GlobalStore = React.createContext({} as IUserStateContext);

// An wrapping function to handle thunks (dispatched actions which are wrapped in a function, needed for async callbacks)
const asyncer = (dispatch: any, state: UserState) => (action: any) =>
    typeof action === 'function' ? action(dispatch, state) : dispatch(action);

// The StateProvider component to provide the global state to all child components
export function UserStateProvider(props: UserStateProviderProps) {
  const [state, dispatchBase] = React.useReducer(userStateReducer, User);

  const dispatch = React.useCallback(asyncer(dispatchBase, state), [])

  return (
      <GlobalStore.Provider value={{ state, dispatch }}>
          { props.children }
      </GlobalStore.Provider>
  )
}