export interface Reminder {
    id: number;
    user_id: number;
    application_id: number | null;
    title: string;
    description?: string;
    remind_at: string;
    is_sent: boolean;
    notification_offset: number;
    created_at: string;
    updated_at: string;
  }
  
  // Új Reminder létrehozásához:
  export type ReminderCreateInput = {
    application_id: number | null;
    title: string;
    description?: string;
    remind_at: string;
    is_sent: boolean;
    notification_offset: number;
  };
  
  // Frissítéshez:
  export interface ReminderUpdateInput {
    id: number;
    data: Partial<Omit<ReminderCreateInput, "application_id">>;
  }
  