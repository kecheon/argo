export default {
  'namespaces': [
    {
      'is_wf': true,
      'wf': {
        'k8s_ns': 'argo',
        'quota_cpu': 20,
        'quota_ram': 32
      },
      'id': '26461bbc0b7e4fd7bb10091a3db426ad',
      'name': 'argo',
      'domain_id': 'default',
      'description': 'modeling',
      'enabled': true,
      'parent_id': 'default',
      'is_domain': false,
      'tags': [],
      'options': {},
      'links': {
        'self': 'http://183.111.177.141/identity/v3/projects/26461bbc0b7e4fd7bb10091a3db426ad'
      }
    },
    {
      'is_wf': true,
      'wf': {
      'k8s_ns': 'default'
      },
      'id': '449082e6de0a4a109464ce247d25fc3a',
      'name': 'default',
      'domain_id': 'default',
      'description': 'Bootstrap project for initializing the cloud.',
      'enabled': true,
      'parent_id': 'default',
      'is_domain': false,
      'tags': [],
      'options': {},
      'links': {
        'self': 'http://183.111.177.141/identity/v3/projects/449082e6de0a4a109464ce247d25fc3a'
      }
    },
    {
      'is_wf': true,
      'wf': {
        'k8s_ns': 'skt',
        'quota_cpu': 10,
        'quota_ram': 16
      },
      'id': '978a647141a04db2a28c19eba924f6c0',
      'name': 'skt',
      'domain_id': 'default',
      'description': 'inference',
      'enabled': true,
      'parent_id': 'default',
      'is_domain': false,
      'tags': [],
      'options': {},
      'links': {
        'self': 'http://183.111.177.141/identity/v3/projects/978a647141a04db2a28c19eba924f6c0'
      }
    }
  ],
  'links': {
    'next': null,
    'self': 'http://183.111.177.141/identity/v3/projects',
    'previous': null
  }
}
