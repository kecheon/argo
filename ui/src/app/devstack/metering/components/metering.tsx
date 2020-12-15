import { Table } from 'react-bootstrap';
import DatePicker, { DayValue, DayRange, Day } from 'react-modern-calendar-datepicker'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { addDays } from 'date-fns';
import { Page, Select } from 'argo-ui';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NamespaceService } from '../../services/namespace-service';
import { ClusterService } from '../../services/cluster-service';
import { MeteringService } from '../../services/metering-service';
const service = new NamespaceService();
const clusterService = new ClusterService();
const meteringService = new MeteringService();

export default () => {
  const [namespace, setNamespace] = useState('');
  const [options, setOptions] = useState([]);
  const [clusterOptions, setClusterOptions] = useState([]);
  const [workflows, setWorkflows] = useState([])
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(null);
//   const onDateChange = (dates: any) => {
//     const [start, end] = dates;
//     setStartDate(start);
//     setEndDate(end);
//   };
    const today = new Date()
    const defaultFrom = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate() - 7
    }
    const defaultTo ={
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
    }
    const defaultRange = {
        from: defaultFrom,
        to: defaultTo,
      };
    

    const [dayRange, setDayRange] = React.useState<DayRange>(defaultRange);
    
    const getWorkflows = (startDate: string, endDate: string) => {
        meteringService.get(startDate, endDate).then((workflowsData: any) => {
            setWorkflows(workflowsData);
        });
    };

    useEffect(() => {
        service.get().then(ns => {
            setOptions(ns.namespaces.map((item: {name: string; }) => item.name));
        });
        clusterService.get().then(clusters => {
            setClusterOptions(clusters.map((item: { name: string }) => item.name));
        });
        const start = addDays(new Date(), -7).toISOString();
        const end = (new Date()).toISOString();
        getWorkflows(start, end);
    }, [])

  const changeNamespaceHandler = (value: string) => {
    setNamespace(value);
    const startDate = (new Date(dayRange.from.year, dayRange.from.month, dayRange.from.day)).toISOString();
    const endDate = (new Date(dayRange.to.year, dayRange.to.month, dayRange.to.day)).toISOString();
    if (value === '') {
        const start = addDays(new Date(), -7).toISOString();
        const end = (new Date()).toISOString();
        getWorkflows(start, end);

    } else {
        meteringService.getByNamespace(value, startDate, endDate).then((workflowsData: any) => {
          setWorkflows(workflowsData)
        });
    }
  }

  const changeHandler2 = (value: string) => {
    setNamespace(value);
  }

  const clickHandler = () => {
      console.log(dayRange);
      const startDate = (new Date(dayRange.from.year, dayRange.from.month, dayRange.from.day)).toISOString();
      const endDate = (new Date(dayRange.to.year, dayRange.to.month, dayRange.to.day)).toISOString();
      getWorkflows(startDate, endDate);
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
                        onChange={(option) => changeNamespaceHandler(option.value) } />
                    {(namespace !== '') && 
                        <a
                            onClick={() => {
                                setNamespace('');
                                changeNamespaceHandler('');
                            }}>
                            <i className='fa fa-times-circle' /> Clear selection
                        </a>
                    }
                </div>
            </form>
          </div>
        </div>

        <div className='row'>
          <div className='columns small-6'>
                <DatePicker value={dayRange} onChange={setDayRange} />
                <button onClick={clickHandler}>Go</button>
          </div>
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
              {workflows.map((workflow: any) => {
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