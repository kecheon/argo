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
  const [cluster, setCluster] = useState('');
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

  const getWorkflows = () => {
    overviewService.getWorkflows()
    .then((workflowsData: WorkflowsOverview) => {
      setWorkflowsOverview({...workflowsData});
    });
  }
  const getWorkFlowsByNamespace = (ns: string) => {
    overviewService.getWorkflowsByNamespace(ns)
    .then((workflowsData: WorkflowsOverview) => {
      setWorkflowsOverview({...workflowsData});
    });
  }

  const getOverviewByNamespace = (ns: string) => {
    overviewService.getByNamespace(ns)
    .then((overviewData: Overview) => {
      setOverview({...overviewData});
    });
  }

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
    getWorkflows();
  }, [])

  const changeHandler = (value: string) => {
    setNamespace(value);
    getOverviewByNamespace(value);
    getWorkFlowsByNamespace(value);
  }

  const clusterChangeHandler = (value: string) => {
    setCluster(value);
    if (value === 'all') {
      if (namespace !== '') {
        getWorkFlowsByNamespace(namespace);
      } else {
        getWorkflows();
      }
      return
    }
    const wfs = workflowsOverview.workflows;
    const filtered = wfs.filter((wf) => {
        return wf.clusterName === value;
    })
    workflowsOverview.workflows = filtered;
    setWorkflowsOverview({...workflowsOverview});
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
                  onChange={(option) => clusterChangeHandler(option.value) } />
                {(cluster !== '') && 
                  <a
                      onClick={() => {
                          setCluster('');
                          clusterChangeHandler('all');
                      }}>
                      <i className='fa fa-times-circle' /> Clear selection
                  </a>
                }
            </div>
          </form>
          </div>
        </div>
        { (workflowsOverview.workflows) && renderWorkflows(workflowsOverview.workflows) }
    </Page>
  )
}

const renderWorkflows = ((workflows: IWorkflow[]) => {
  return (
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
          { workflows.map(workflow => {
            return (
              // tslint:disable-next-line:jsx-key
              <tr key={workflow.uid}>
                { Object.entries(workflow).filter(([key1, value1]) => {
                  const include = ['name', 'phase', 'startedAt', 'finishedAt', 'nodeDurationFormatted', 
                  'resourceDurationCPU', 'resourceDurationMem'];
                  return include.includes(key1)
                }).map(([key, value]) => {
                    return (
                      // tslint:disable-next-line:jsx-key
                      <td key={key}>
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
  )
});