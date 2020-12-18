import { Select } from 'argo-ui';
import * as React from 'react';
import { useState, useEffect } from 'react';

import { NamespaceService } from '../services/namespace-service';

const service = new NamespaceService();

export default (props: any) => {
  const [namespace, setNamespace] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    service.get().then(ns => {
      setOptions(ns.namespaces.map((item: {name: string; }) => item.name));
    })
  }, [])
  const changeHandler = (value: string) => {
    setNamespace(value);
  }
  return (
    <div className='row small-12'>
      <div className='columns small-1' />
      <div className='columns small-11'>
      <form>
        <div className='argo-form-row'>
            <Select options={options}
              placeholder='Select Namespace'
              value={namespace}
              onChange={(option) => changeHandler(option.value) } />
        </div>
      </form>
      </div>
    </div>
  )
}