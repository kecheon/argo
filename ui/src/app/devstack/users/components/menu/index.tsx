import * as React from 'react';
import {Page} from 'argo-ui';

export default () => {
  return (
    <Page title='User management' toolbar={{breadcrumbs: [{title: 'User management'}]}}>
      <div className='argo-container'>
        <div className='row argo-table-list__row'>
            <h3>Manage Users</h3>
            <div>Create/update/delete User</div>
        </div>
        <div className='row argo-table-list__row'>
            <h3>Manage Namespaces</h3>
            Create/update/delete Namespaces
        </div>
        <div className='row argo-table-list__row'>
            <h3>Manage Roles</h3>
            View Role
        </div>
      </div>
    </Page>
  );
}
