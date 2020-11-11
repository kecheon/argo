import * as React from 'react';
// import {InputFilter} from './input-filter';
import * as models from '../../../models';
import { Select } from 'argo-ui';

interface State {
  value: string;
  workflows?: models.Workflow[];
  onChange: (namespace: string) => void;
}

export const NamespaceFilter = (props: State) => {
  let options: any[] = [];
  if (props.workflows) {
    options = props.workflows.map(wf => wf.metadata.namespace).filter((value, index, self) => self.indexOf(value) === index)
    options = [{title: 'All namespaces', value: ''}].concat(options);
  }
  // return <InputFilter value={props.value} name='ns' onChange={ns => props.onChange(ns)} />;
  return <Select options={options} onChange={(ns) => props.onChange(ns.value)} placeholder={'Select namespace'} />
}
