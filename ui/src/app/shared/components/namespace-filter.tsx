import * as React from 'react';
// import {InputFilter} from './input-filter';
import { SelectFilter } from './namespace-select-filter';


export const NamespaceFilter = (props: {value: string; onChange: (namespace: string) => void}) => 
  <SelectFilter value={props.value} name='ns'
    onChange={ns => props.onChange(ns)} />;
