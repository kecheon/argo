import { Table } from 'react-bootstrap';
import DatePicker, { DayValue, DayRange, Day } from 'react-modern-calendar-datepicker'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
// import DatePicker from 'react-datepicker'; 
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
  const [cluster, setCluster] = useState('');
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
        const start = (new Date(dayRange.from.year, dayRange.from.month, dayRange.from.day - 7)).toISOString();
        const end = (new Date(dayRange.to.year, dayRange.to.month, dayRange.to.day)).toISOString();
        getWorkflows(start, end);
    }, [])

  const changeNamespaceHandler = (value: string) => {
    setNamespace(value);
    const startDate = (new Date(dayRange.from.year, dayRange.from.month, dayRange.from.day)).toISOString();
    const endDate = (new Date(dayRange.to.year, dayRange.to.month, dayRange.to.day)).toISOString();
    if (value === '') {
        getWorkflows(startDate, endDate);
    } else {
        meteringService.getByNamespace(value, startDate, endDate).then((workflowsData: any) => {
          setWorkflows(workflowsData)
        });
    }
  }

  const changeClusterHandler = (value: string) => {
    setCluster(value);
    if (value === '') {
      setNamespace('');
      const startDate = (new Date(dayRange.from.year, dayRange.from.month, dayRange.from.day)).toISOString();
      const endDate = (new Date(dayRange.to.year, dayRange.to.month, dayRange.to.day)).toISOString();
      getWorkflows(startDate, endDate);
    } else {
      const filteredWorkflows = workflows.filter((workflow) => {
        return workflow.clusterName === value;
      });
      setWorkflows(filteredWorkflows);
    }
  }

  const clickHandler = () => {
      console.log(dayRange);
      const startDate = (new Date(dayRange.from.year, dayRange.from.month - 1, dayRange.from.day)).toISOString();
      const endDate = (new Date(dayRange.to.year, dayRange.to.month - 1, dayRange.to.day)).toISOString();
      console.log(startDate, endDate);
      getWorkflows(startDate, endDate);
  }

  // const [selectedDay, setSelectedDay] = useState(null);
  const renderCustomInput = (ref: any) => (
    <input
      size={50}
      readOnly={true}
      ref={ref.ref} // necessary
      placeholder='Select range'
      value={new Date(dayRange.from.year, dayRange.from.month, dayRange.from.day).toISOString() 
        + '~' +  new Date(dayRange.to.year, dayRange.to.month, dayRange.to.day).toISOString() 
      }
      style={{
        textAlign: 'center',
        border: '1px solid #9c88ff',
        boxShadow: '0 1.5rem 2rem rgba(156, 136, 255, 0.2)',
        color: '#9c88ff',
        outline: 'none',
      }}
      className='my-custom-input-class' // a styling class
    />
  )

  return (
    <Page title='Metering'>
        <div className='row'>
          <div className='columns small-4'>
              <br/><br/>
                <DatePicker value={dayRange} 
                  // renderInput={renderCustomInput}
                  onChange={setDayRange} />
                <button className='argo-button argo-button--base argo-button--sm'  onClick={clickHandler}>Go</button>
                {/* <DatePicker
                    selected={this.props.maxStartedAt}
                    onChange={date => {
                        this.props.onChange(this.props.namespace, this.props.cluster, this.props.selectedPhases, this.props.selectedLabels, this.props.minStartedAt, date);
                    }}
                    placeholderText='To'
                    dateFormat='dd MMM yyyy'
                    todayButton='Today'
                    className='argo-field argo-textarea'
                /> */}
          </div>
          <div className='columns small-4'>
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
          <div className='columns small-4'>
            <form>
                <div className='argo-form-row'>
                    <Select options={clusterOptions}
                    placeholder='Select Cluster'
                    value={cluster}
                    onChange={(option) => changeClusterHandler(option.value) } />
                    {(cluster !== '') && 
                        <a
                            onClick={() => {
                                setCluster('');
                                changeClusterHandler('');
                            }}>
                            <i className='fa fa-times-circle' /> Clear selection
                        </a>
                    }
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
    </Page>
  )
}