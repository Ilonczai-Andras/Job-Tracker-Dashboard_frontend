export interface Application {
    id: number;
    profile_id: number;
    title: string;
    description: string;
    company: string;
    status: "todo" | "inprogress" | "interview" | "offer" | "rejected";
    link: string;
    deadline: string;
  }
  
  export type ApplicationCreateInput = {
    title: string;
    description: string;
    company: string;
    status: string;
    link: string;
    deadline: string;
  }
  
  export interface ApplicationUpdateInput {
    id: number;
    data: Partial<ApplicationCreateInput>;
  }
  