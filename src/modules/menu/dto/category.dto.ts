export interface CategoryDto {
  id?: number;
  name: string;
  image_url?: string;
  priority: number;
  parent_id?: number;
}

export interface BannerDto {
  category_id: number;
  image_url: string;
}
