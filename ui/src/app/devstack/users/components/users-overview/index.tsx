import * as React from 'react';
import {Page} from 'argo-ui';
require('./menu.scss');
import {uiUrl} from '../../../../shared/base';

const menu = [
  {
      title: 'Manage User',
      description: 'Create/update/delete User',
      path: 'list'
  },
  {
      title: 'Manage Namespaces',
      description: 'Create/update/delete Namespaces',
      path: 'namespaces'
  },
  {
      title: 'Manage Role',
      description: 'View Roles',
      path: 'roles'
  },
  {
      title: 'Manage Cluster',
      description: 'View clusters',
      path: 'cluster'
  },
  // {
  //     title: 'Manage Tenant',
  //     description: 'Create/update/delete Tenant',
  //     path: 'tenants'
  // }
]

export const UsersOverview = () => {
  const clickHandler = (path: string) => {
    document.location.href = uiUrl(`users/${path}`)
  }
  return (
    <Page title='User management' toolbar={{breadcrumbs: [{title: 'User management'}]}}>
      <div className='settings-overview'>
        <div className='argo-container'>
          {menu.map(item => (
                <div key={item.path} className='settings-overview__redirect-panel' onClick={() => clickHandler(item.path)}>
                    <div className='settings-overview__redirect-panel__content'>
                        <div className='settings-overview__redirect-panel__title'>{item.title}</div>
                        <div className='settings-overview__redirect-panel__description'>{item.description}</div>
                    </div>
                    <div className='settings-overview__redirect-panel__arrow'>
                        <i className='fa fa-angle-right' />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </Page>
  );
}
