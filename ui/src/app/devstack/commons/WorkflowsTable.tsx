import React = require('react');
import { Table } from 'react-bootstrap';
import {IWorkflow} from '../overview/components/overview';

export const WorkflowsTable = ((workflows: IWorkflow[]) => {
  return (
    <Table striped={true} bordered={true} hover={true} size={'sm'}>
      <thead>
        <tr>
              <th className='columns small-2'>Namespace</th>
              <th className='columns small-1'>Phase</th>
              <th className='columns small-2'>Started At</th>
              <th className='columns small-2'>Finished At</th>
              <th className='columns small-2'>Node Duration</th>
              <th className='columns small-1'>CPU</th>
              <th className='columns small-1'>Memory</th>
              <th className='columns small-1'>Price</th>
        </tr>
      </thead>
      <tbody>
          { 
            workflows.map(workflow => {
              const orderedWorkflow = {
                namespace: workflow.namespace,
                phase: workflow.phase,
                startedAt: workflow.startedAt,
                finishedAt: workflow.finishedAt,
                nodeDurationFormatted: workflow.nodeDurationFormatted,
                resourceDurationCPU: workflow.resourceDurationCPU,
                resourceDurationMem: workflow.resourceDurationMem,
                price: workflow.resourceDurationCPU * 1666
              }
            return (
              // tslint:disable-next-line:jsx-key
              <tr key={workflow.uid}>
                { 
                  Object.entries(orderedWorkflow).map(([key, value]) => {
                      return (
                        // tslint:disable-next-line:jsx-key
                        <td key={key} style={isNumber(key) ? {textAlign: 'right'} : {textAlign: 'left'}}>
                          { isNumber(key) ? value.toLocaleString() : value }
                        </td>
                      )
                    })
                }
              </tr>
            );
          })}
          <tr>
            <td colSpan={7} style={{textAlign: 'center'}}>Total</td>
            <td style={{textAlign: 'right'}}>
              {(summation(workflows, 'resourceDurationCPU') * 1666).toLocaleString()}
            </td>
          </tr>
      </tbody>
    </Table>
  )
});

const isNumber = (key: string) => {
  const result = (key === 'resourceDurationCPU' || key === 'resourceDurationMem' || key === 'price');
  return result
}

const summation = (items: any[], prop: string) => {
  return items.reduce((a, b) => {
    return a + b[prop];
  }, 0)
}