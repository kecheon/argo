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
