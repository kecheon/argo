import { Page, Select } from 'argo-ui';
import * as React from 'react';
import { useState, useEffect } from 'react';
import {uiUrl} from '../../../shared/base';
require('./overview.scss');

import { NamespaceService } from '../../services/namespace-service';
const service = new NamespaceService();
// tslint:disable-next-line:no-shadowed-variable
// const namespaces = service.get().then(namespaces => {
//   return namespaces.namespaces;
// })

export default () => {
  const [namespace, setNamespace] = useState('');
  const [options, setOptions] = useState([]);
  useEffect(() => {
    service.get().then(ns => {
      setOptions(ns.namespaces.map((item: {name: string; }) => item.name));
    })
  }, [])

  return (
    <Page title='Overview'>
        <div className='row'>
          <div className='columns small-3' />
          <div className='columns small-6'>

          <form>
            <div className='argo-form-row'>
                <Select options={options}
                  placeholder='Select Namespace'
                  value={namespace}
                  onChange={(option) => setNamespace(option.value)} />
            </div>
          </form>
          </div>
        </div>
        <div className='argo-table-list'>
          <div className='row argo-table-list__head'>
              <div className='row small-12'>
                  <div className='columns small-3 pointer'>WORKFLOW</div>
                  <div className='columns small-3 pointer'>WORKFLOW TEMPLATE</div>
                  <div className='columns small-3 pointer'>CLUSTER WORKFLOW TEMPLATE</div>
                  <div className='columns small-3 pointer'>CRON WORKFLOW TEMPLATE</div>
              </div>
          </div>
          <div className='workflows-list__row-container'>
              <div className='row argo-table-list__row'>
                  <div className='row small-12'>
                      <div className='columns small-3 pointer' onClick={() => document.location.href=uiUrl('workflows')}>
                        <i className='fa fa-stream fa-5x' />
                        <br/>Workflow 4
                      </div>
                      <div className='columns small-3 pointer' onClick={() => document.location.href=uiUrl('workflow-templates')}>
                        <i className='fa fa-window-maximize fa-5x' />
                        <br/>Workflow Template 2
                      </div>
                      <div className='columns small-3 pointer' onClick={() => document.location.href=uiUrl('cluster-workflow-templates')}>
                        <i className='fa fa-window-restore fa-5x' />
                        <br/>Cluster Workflow Template 2
                      </div>
                      <div className='columns small-3 pointer' onClick={() => document.location.href=uiUrl('cron-workflows')}>
                        <i className='fa fa-clock fa-5x' />
                        <br/>Cron Workflow Template 2
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </Page>
  )
}