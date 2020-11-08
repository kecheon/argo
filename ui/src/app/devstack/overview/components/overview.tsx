import { Page } from 'argo-ui';
import * as React from 'react';
import {uiUrl} from '../../../shared/base';
require('./overview.scss');

export default () => {
  return (
    <Page title='Overview'>
        <div className='argo-table-list'>
          <div className='row argo-table-list__head'>
              <div className='row small-12'>
                  <div className='columns small-3'>WORKFLOW</div>
                  <div className='columns small-3'>WORKFLOW TEMPLATE</div>
                  <div className='columns small-3'>CLUSTER WORKFLOW TEMPLATE</div>
                  <div className='columns small-3'>CRON WORKFLOW TEMPLATE</div>
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