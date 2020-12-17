import {uiUrl} from '../../shared/base';
const workflowsUrl = uiUrl('workflows');
const workflowTemplatesUrl = uiUrl('workflow-templates');
const clusterWorkflowTemplatesUrl = uiUrl('cluster-workflow-templates');
const cronWorkflowsUrl = uiUrl('cron-workflows');
const archivedWorkflowsUrl = uiUrl('archived-workflows');
const helpUrl = uiUrl('help');
const apiDocsUrl = uiUrl('apidocs');
const usersUrl = uiUrl('users');
const loginUrl = uiUrl('login');
const logoutUrl = uiUrl('logout');
const reportsUrl = uiUrl('reports');
const overviewUrl = uiUrl('overview');
const metricUrl = uiUrl('metric');
const monitorUrl = uiUrl('monitor');
const meteringUrl = uiUrl('metering');

const isProd = process.env.NODE_ENV === 'production';
// export const endpoint = isProd ? 'https://argo.innog2b.com' : 'http://localhost:3000';
export const endpoint = 'http://localhost:3000';

export const navItems = {
  loggedInUser: [
      {
          title: 'Logout',
          path: logoutUrl,
          iconClassName: 'fa fa-sign-out-alt'
      }
  ],
  anonymousUser: [
      {
          title: 'Login',
          path: loginUrl,
          iconClassName: 'fa fa-sign-in-alt'
      }
  ],
  admin2: [
    {
        title: 'Overview',
        path: overviewUrl,
        iconClassName: 'fa fa-eye'
    }
  ],
  user: [
      {
          title: 'Timeline',
          path: workflowsUrl,
          iconClassName: 'fa fa-stream'
      },
      {
          title: 'Workflow Templates',
          path: workflowTemplatesUrl,
          iconClassName: 'fa fa-window-maximize'
      },
      {
          title: 'Cluster Workflow Templates',
          path: clusterWorkflowTemplatesUrl,
          iconClassName: 'fa fa-window-restore'
      },
      {
          title: 'Cron Workflows',
          path: cronWorkflowsUrl,
          iconClassName: 'fa fa-clock'
      },
      {
          title: 'Reports',
          path: reportsUrl,
          iconClassName: 'fa fa-chart-bar'
      },
      {
          title: 'Monitor',
          path: monitorUrl,
          iconClassName: 'fa fa-tachometer-alt'
      },
      {
          title: 'Metering',
          path: meteringUrl,
          iconClassName: 'fa fa-ruler-horizontal'
      }
  ],
  tadmin: [
      {
          title: 'User',
          path: usersUrl,
          iconClassName: 'fa fa-user-alt'
      }
  ],
  admin: [
      {
          title: 'Archived Workflows',
          path: archivedWorkflowsUrl,
          iconClassName: 'fa fa-archive'
      },
      {
          title: 'Metric',
          path: metricUrl,
          iconClassName: 'fa fa-ruler-combined'
      },
      {
          title: 'API Docs',
          path: apiDocsUrl,
          iconClassName: 'fa fa-code'
      },
      {
          title: 'Help',
          path: helpUrl,
          iconClassName: 'fa fa-question-circle'
      }
  ]
};
