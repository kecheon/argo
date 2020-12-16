export interface User {
  default_project_id?: string;
  description?: any;
  id: string;
  name: string;
  domain_id: string;
  email?: string;
  enabled?: boolean;
  password_expires_at?: string;
  links?: {
    self: string;
  },
  primary_namespace_id?: string;
  password?: string;
}

export interface Namespace {
  is_wf: boolean;
  wf: object;
  id: string;
  name?: string;
  domain_id?: string;
  description: string;
  enabled: boolean;
  parent_id?: string;
  is_domain?: boolean;
  tags?: [];
  options?: object;
  links?: {
    self: string;
  }
  quota_cpu?: number;
  quota_ram?: number;
}

export interface Role {
  is_wf: boolean;
  wf: {
    k8s_role: string;
  };
  id: string;
  name: string;
  domain_id?: string;
  description: string;
  options: object;
  links?: {
    self: string;
  }
}

export interface Cluster {
  id: string;
  name: string;
  domain_id: string;
  description?: string;
  enabled: boolean;
  parent_id: string;
  is_domain: boolean;
}
