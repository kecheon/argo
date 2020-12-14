import * as React from 'react';
import { Page } from 'argo-ui';
export class TenantsList extends React.Component {
  public render() {
    return(
      <Page title='Tenant Management' toolbar={{breadcrumbs: [{title: 'Tenant Management'}]}}>
        <div>Tenant management here</div>
      </Page>
    );
  }
}