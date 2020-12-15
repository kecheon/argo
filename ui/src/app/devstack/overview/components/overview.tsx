import { Page, Select } from 'argo-ui';
import * as React from 'react';
import { useState, useEffect } from 'react';
import {uiUrl} from '../../../shared/base';
import { Table } from 'react-bootstrap';
require('./overview.scss');

import { NamespaceService } from '../../services/namespace-service';
import { OverviewService } from '../../services/overview-service';
import { ClusterService } from '../../services/cluster-service';
const service = new NamespaceService();
const overviewService = new OverviewService();
const clusterService = new ClusterService();

interface Overview {
  workflowsNum: number;
  clusterWorkflowTemplatesNum: number;
  cronWorkflowsNum: number;
}
export interface WorkflowsOverview {
  totalNodeDuration: number;
  totalEstimatedDuration: number;
  totalResourceDurationCPU: number;
  totalResourceDurationMem: number;
  workflows: IWorkflow[];
}

export interface IWorkflow {
  uid: string;
  namespace: string;
  name: string;
  phase: string;
  finishedAt: string;
  startedAt: string;
  progress: string;
  nodeDuration: number;
  nodeDurationFormatted: string;
  estimatedDuration: number;
  estimatedDurationFormatted: string;
  clusterName: string;
  resourceDurationCPU: number;
  resourceDurationMem: number;
  price?: number;
}


export default () => {
  const [namespace, setNamespace] = useState('');
  const [options, setOptions] = useState([]);
  const [clusterOptions, setClusterOptions] = useState([]);
  const [overview, setOverview] = useState({
    workflowsNum: 0,
    clusterWorkflowTemplatesNum: 0,
    cronWorkflowsNum: 0
  });
  const [workflowsOverview, setWorkflowsOverview] = useState({
    totalNodeDuration: 0,
    totalEstimatedDuration: 0,
    totalResourceDurationCPU: 0,
    totalResourceDurationMem: 0,
    workflows: []
  })
  useEffect(() => {
    service.get().then(ns => {
      setOptions(ns.namespaces.map((item: {name: string; }) => item.name));
    });
    clusterService.get().then(clusters => {
      setClusterOptions(clusters.map((item: { name: string }) => item.name));
    });
    overviewService.get().then((overviewData: Overview) => {
      setOverview({...overviewData});
    });
    overviewService.getWorkflows().then((workflowsData: WorkflowsOverview) => {
      setWorkflowsOverview({...workflowsData});
    })

  }, [])

  const changeHandler = (value: string) => {
    setNamespace(value);
    overviewService.getByNamespace(value).then((overviewData: Overview) => {
      setOverview({...overviewData})
    });
  }

  const changeHandler2 = (value: string) => {
    setNamespace(value);
    // clusterService.get(value).then((res: any) => {
    //   console.log(res);
    // });
  }

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
                  onChange={(option) => changeHandler(option.value) } />
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
                        <br/>Workflows { overview.workflowsNum }
                      </div>
                      <div className='columns small-3 pointer' onClick={() => document.location.href=uiUrl('workflow-templates')}>
                        <i className='fa fa-window-maximize fa-5x' />
                        <br/>Workflow Template 2
                      </div>
                      <div className='columns small-3 pointer' onClick={() => document.location.href=uiUrl('cluster-workflow-templates')}>
                        <i className='fa fa-window-restore fa-5x' />
                        <br/>Cluster Workflow Template { overview.clusterWorkflowTemplatesNum }
                      </div>
                      <div className='columns small-3 pointer' onClick={() => document.location.href=uiUrl('cron-workflows')}>
                        <i className='fa fa-clock fa-5x' />
                        <br/>Cron Workflow Template { overview.cronWorkflowsNum }
                      </div>
                  </div>
              </div>
          </div>
        </div>

        <div className='row'>
          <div className='columns small-3' />
          <div className='columns small-6'>
          <form>
            <div className='argo-form-row'>
                <Select options={clusterOptions}
                  placeholder='Select Cluster'
                  value={namespace}
                  onChange={(option) => changeHandler2(option.value) } />
            </div>
          </form>
          </div>
        </div>
        <Table striped={true} bordered={true} hover={true} size={'sm'}>
          <thead>
            <tr>
                  <th className='columns small-2'>NAME</th>
                  <th className='columns small-1'>Phase</th>
                  <th className='columns small-2'>Started At</th>
                  <th className='columns small-2'>Finished At</th>
                  <th className='columns small-2'>Node Duration</th>
                  <th className='columns small-1'>CPU</th>
                  <th className='columns small-1'>Memory</th>
            </tr>
          </thead>
          <tbody>
              {workflowsOverview.workflows.map(workflow => {
                return (
                  // tslint:disable-next-line:jsx-key
                  <tr>
                    { Object.entries(workflow).filter(([key1, value1]) => {
                      const include = ['name', 'phase', 'startedAt', 'finishedAt', 'nodeDurationFormatted', 
                      'resourceDurationCPU', 'resourceDurationMem'];
                      return include.includes(key1)
                    }).map(([key, value]) => {
                        return (
                          // tslint:disable-next-line:jsx-key
                          <td>
                            { value }
                          </td>
                        )
                      })
                    }
                  </tr>
                );
              })}
          </tbody>
        </Table>
    </Page>
  )
}