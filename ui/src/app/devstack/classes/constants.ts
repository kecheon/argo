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

export const defaultToken = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlAxdWFIREZHdVlBLTRsdXFwc0NGQW5tTXpfSGNzSjBxRm43Vk41ekJWak0ifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJhcmdvIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImRlZmF1bHQtdG9rZW4tcTJuNWciLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGVmYXVsdCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImY2YzA0ZmU0LTY2YjYtNDNhOS04Y2JmLWE0OGNhMmRlZGVkMiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDphcmdvOmRlZmF1bHQifQ.NwkuwwnnGhuqKCRa0exxogi5yqyj1eJDJ25bGNG_NjnFXZ-e2ySqWdJYrgGdsSNEkvFYkNt6O5R03lZEarR2hJxauwzkK4YxzjtkybjKYpRkw5nonuotpU4jD-badsqXTQYgv4j5xXCmZ-MtJp_M1UW5tSfVPRa86vGOrtTULLF8DBh86KcQYNkH2ry4VK6ZL-smrtEl1iwO576uFKQF3TWaZD6p5jLRldVJzCCSVk187U1VifbJSzt-BK5U3z3IrVGgJKzpY2tqZYf208m4wGu3-lne_ZoX72-NkV-0rgb_Tg-xOhhX_mWeHRAUz0B7BnvR34d8cQG4NJIxPAv0bA';

export const argoToken = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlAxdWFIREZHdVlBLTRsdXFwc0NGQW5tTXpfSGNzSjBxRm43Vk41ekJWak0ifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJhcmdvIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImFyZ28tdG9rZW4tMnZ3ODciLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiYXJnbyIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImM0YTgyZTlmLTVjNDAtNDlhMy1iZjc0LTMyYzMxNDhiMzE0NCIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDphcmdvOmFyZ28ifQ.17_eKQ8BmRf-KghYKB8u9mU-t6nKDR4VzTmed8eKtfeMFcZse1Ol16NYNP7MRJ5dEy1DLFWwn238jbnxn83Tsl6kQtzaFD-OksD-BKZEtvzvyJXKkuHNRdF2l5J8rHqn6ltN4e3xAoYQXT7jZXTGLY6SaOBhpoyRllPVdsJwHPOeCU9xNezKIX6Lnd_F2ScVa99xjIEvv6Pm1Y_g5W32peFvqqdtRJTtULDkKCVM8jThsy16HTw1_jnEiHEAabVC-pF5KpBcR2hL3IjSXsYYLim2qA-47pgZAVLqLLTed6GVSvc4Y_e5NlVQ9uGz9km3rKlJHaguPzcwnhUndgvn5Q';

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
