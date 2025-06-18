export interface ITechnology {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  tags: string[];
  category: string;
  compatibilities: string[];
  website?: string;
}
