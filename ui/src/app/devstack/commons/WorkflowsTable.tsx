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
        </tr>
      </thead>
      <tbody>
          { workflows.map(workflow => {
            return (
              // tslint:disable-next-line:jsx-key
              <tr key={workflow.uid}>
                { Object.entries(workflow).filter(([key1, value1]) => {
                  const include = ['namespace', 'phase', 'startedAt', 'finishedAt', 'nodeDurationFormatted', 
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