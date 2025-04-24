export interface Profile {
  id: number;
  auth0_id: string;
  name?: string;
  email?: string;
  picture?: string;
  created_at: string;
  updated_at: string;
}

export interface ProfileCreateInput {
  auth0_id: string;
  name?: string;
  email?: string;
  picture?: string;
}

export interface ProfileUpdateInput {
  id: number;
  data: Partial<Omit<ProfileCreateInput, 'auth0_id'>>;
}