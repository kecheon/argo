import { Table } from 'react-bootstrap';
import { addDays } from 'date-fns';
import { Page, Select } from 'argo-ui';
import * as React from 'react';
import { useState, useEffect } from 'react';
import {uiUrl} from '../../../shared/base';
import { NamespaceService } from '../../services/namespace-service';
import { ClusterService } from '../../services/cluster-service';
import { MeteringService } from '../../services/metering-service';
import { IWorkflow, WorkflowsOverview } from '../../overview/components/overview';
const service = new NamespaceService();
const clusterService = new ClusterService();
const meteringService = new MeteringService();

interface IWorkflows {
    workflows: IWorkflow[];
}

export default () => {
  const [namespace, setNamespace] = useState('');
  const [options, setOptions] = useState([]);
  const [clusterOptions, setClusterOptions] = useState([]);
  const [workflows, setWorkflows] = useState({
    workflows: []
  })
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(null);
//   const onDateChange = (dates: any) => {
//     const [start, end] = dates;
//     setStartDate(start);
//     setEndDate(end);
//   };

  useEffect(() => {
    service.get().then(ns => {
      setOptions(ns.namespaces.map((item: {name: string; }) => item.name));
    });
    clusterService.get().then(clusters => {
      setClusterOptions(clusters.map((item: { name: string }) => item.name));
    });
    meteringService.get('startDate', 'endDate').then((workflowsData: IWorkflows) => {
      setWorkflows({...workflowsData});
    })

  }, [])

  const changeHandler = (value: string) => {
    setNamespace(value);
    meteringService.getByNamespace(value).then((workflowsData: IWorkflows) => {
      setWorkflows({...workflowsData})
    });
  }

  const changeHandler2 = (value: string) => {
    setNamespace(value);
  }

  return (
    <Page title='Metering'>
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

        <div className='row'>
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
              {workflows.workflows.map(workflow => {
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