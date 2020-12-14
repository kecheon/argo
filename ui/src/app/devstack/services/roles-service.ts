import axios from 'axios';
// import { Role } from '../users/components/models';
import {endpoint} from '../../devstack/classes/constants';
// const keystoneEndPoint = 'http://183.111.177.141/identity/v3';

export class RolesService {
    public async get(): Promise<any> {
      const response = axios.get(`${endpoint}/argo/role`)
      const roles = { 'roles': [
        {
          'is_wf': true,
          'wf': {
            'k8s_role': 'wf-viewer'
          },
          'id': '0d65f613347b457ebc78c032a3bcc39b',
          'name': 'wf-viewer',
          'domain_id': '',
          'description': '',
          'options': {},
          'links': {
            'self': 'http://183.111.177.141/identity/v3/roles/0d65f613347b457ebc78c032a3bcc39b'
          }
        },
        {
          'is_wf': true,
          'wf': {
            'k8s_role': 'wf-tenant-admin'
          },
          'id': '1fd3a185d39047f6bc41e7e90de6f476',
          'name': 'wf-tenant-admin',
          'domain_id': null,
          'description': null,
          'options': {},
          'links': {
            'self': 'http://183.111.177.141/identity/v3/roles/1fd3a185d39047f6bc41e7e90de6f476'
          }
        },
        {
          'is_wf': true,
          'wf': {
            'k8s_role': 'wf-executor'
          },
          'id': '7c9c9face23a4bfdb85f3366cc725105',
          'name': 'wf-executor',
          'domain_id': null,
          'description': null,
          'options': {},
          'links': {
            'self': 'http://183.111.177.141/identity/v3/roles/7c9c9face23a4bfdb85f3366cc725105'
          }
        },
        {
          'id': 'cd4c189fc44f4f85875f721435f3a14e',
          'name': 'admin',
          'domain_id': '',
          'description': '',
          'options': {
            'immutable': true
          },
          'links': {
            'self': 'http://183.111.177.141/identity/v3/roles/cd4c189fc44f4f85875f721435f3a14e'
          }
        }
      ],
      'links': {
        'next': '',
        'self': 'http://183.111.177.141/identity/v3/roles',
        'previous': ''
        }
      };
      return roles;
  };
}
