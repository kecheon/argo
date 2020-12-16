import {Select} from 'argo-ui';
import * as React from 'react';
import { NamespaceService } from '../../devstack/services/namespace-service';

const service = new NamespaceService();

interface InputProps {
    value: string;
    placeholder?: string;
    name: string;
    onChange: (input: string) => void;
}

interface InputState {
    value: string;
    localCache: string[];
    error?: Error;
    namespaces: string[];
}

export class SelectFilter extends React.Component<InputProps, InputState> {
    constructor(props: InputProps) {
        super(props);
        this.state = {
            value: props.value,
            localCache: (localStorage.getItem(this.props.name + '_inputs') || '').split(',').filter(value => value !== ''),
            namespaces: []
        };
    }
    public componentDidMount() {
        service.get().then(ns => ns.namespaces)
        .then( ns => {
            this.setState({ namespaces: ns.map((item: {name: string; }) => item.name) });
        })
    }

    public changeHandler = (e: any) => {
        this.setState({value: e.value});
        this.props.onChange(e.value);
    }
    public render() {
        return (
            <>
                <Select options={this.state.namespaces} onChange={this.changeHandler}
                    placeholder={'Select namespace'} value={this.state.value} />
                {(this.state.value !== '') && 
                    <a
                        onClick={() => {
                            this.setState({value: ''});
                            this.props.onChange('');
                        }}>
                        <i className='fa fa-times-circle' /> Clear selection
                    </a>
                }
            </>
        );
    }

    private setValueAndCache(value: string) {
        this.setState(state => {
            const localCache = state.localCache;
            if (!state.localCache.includes(value)) {
                localCache.unshift(value);
            }
            while (localCache.length > 5) {
                localCache.pop();
            }
            localStorage.setItem(this.props.name + '_inputs', localCache.join(','));
            return {value, localCache};
        });
    }
}
