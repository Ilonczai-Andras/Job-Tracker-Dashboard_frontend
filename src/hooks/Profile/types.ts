export interface Profile {
    id: number;
    auth0_id: string;
    name: string;
    email: string;
    picture: string;
    created_at: string;
    updated_at: string;
  }
  
  export type ProfileCreateInput = {
    auth0_id: string;
    name: string;
    email: string;
    picture: string;
  };
  