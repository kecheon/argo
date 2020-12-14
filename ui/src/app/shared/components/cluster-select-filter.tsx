import {Select} from 'argo-ui';
import * as React from 'react';
import { ClusterService } from '../../devstack/services/cluster-service';

const service = new ClusterService();

interface InputProps {
    value: string;
    placeholder?: string;
    name: string;
    onChange: (input: string) => void;
    changeCluster?: (input: string) => void;
}

interface InputState {
    value: string;
    localCache: string[];
    error?: Error;
    clusters: string[];
}

export class ClusterSelectFilter extends React.Component<InputProps, InputState> {
    constructor(props: InputProps) {
        super(props);
        this.state = {
            value: props.value,
            localCache: (localStorage.getItem(this.props.name + '_inputs') || '').split(',').filter(value => value !== ''),
            clusters: []
        };
    }
    // public componentDidMount() {
    //     service.get().then(ns => {
    //         this.setState(ns.namespaces.map((item: {name: string; }) => item.name));
    //     })
    // }
    public componentDidMount() {
        service.get()
        .then( clusters => {
            console.log(clusters);
            this.setState({ clusters: clusters.map((item: {name: string; }) => item.name) });
        })
    }


    public changeHandler = (e: any) => {
        this.setState({value: e.value});
        this.props.onChange(e.value);
        // tslint:disable-next-line:no-unused-expression
        (this.props.changeCluster && this.props.changeCluster(e.value));
    }
    public render() {
        return (
            <>
                <Select options={this.state.clusters} onChange={this.changeHandler}
                    placeholder={'Select cluster'} value={this.state.value} />
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
