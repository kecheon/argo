import * as React from 'react';
// import {InputFilter} from './input-filter';
import { ClusterSelectFilter } from './cluster-select-filter';


export const ClusterFilter = (props: {value: string; onChange: (cluster: string) => void}) => 
  <ClusterSelectFilter value={props.value} name='cls'
    onChange={cls => props.onChange(cls)} />;
