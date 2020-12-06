import * as React from 'react';
import {UserStateGlobalStore} from './user-service-provider';

// A higher order component to inject the state and dispatcher
export default function withUserState(Component: any) {
    return function WrapperComponent(props: any) {
        return <UserStateGlobalStore.Consumer>{context => <Component {...props} state={context.state} dispatch={context.dispatch} />}</UserStateGlobalStore.Consumer>;
    };
}
