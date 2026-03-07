import { Database } from "./supabase";

export type News = Database['public']['Tables']['news']['Row'];
export type Professional = Database['public']['Tables']['professionals']['Row'];
export type Company = Database['public']['Tables']['companies']['Row'];
export type Announcement = Database['public']['Tables']['announcements']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];

export type ProfessionalWithProfile = Professional & {
    profile: Profile;
};

export type AnnouncementWithCompany = Announcement & {
    companies: Company;
};

