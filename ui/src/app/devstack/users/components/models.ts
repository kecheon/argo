export interface User {
  id: string;
  name: string;
  domain_id: string;
  email?: string;
  enabled?: boolean;
  password_expires_at?: string
}