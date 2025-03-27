export interface ContentCategoryI {
  id: number;
  content_category: string;
}
export interface PreviewCardI {
  id: number;
  profile_image: string;
  is_bookmarked?: string;
  profile_name: string;
  content_category: ContentCategoryI[];
  user_type: string;
  username: string;
}

export interface DashboardSection {
  title: string;
  data: PreviewCardI[];
}

export interface DashboardDataI {
  data: DashboardSection[];
}

export interface SearchProfilesI {
  facebook: string;
  id: number;
  instagram: string;
  profile_image: string;
  profile_name: string;
  twitter: string | null;
  user_type: string;
  username: string;
  user?: number;
  content_category: ContentCategoryI[];
}
