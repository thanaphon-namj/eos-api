import { MenuStatus } from '../menu.entity';

export interface MenuDto {
  name: string;
  name_en?: string;
  description?: string;
  image_url?: string;
  price: number;
  status?: MenuStatus;
  is_active?: boolean;
  is_recommended?: boolean;
  category_id: number;
  options?: number[];
}

export interface QueryDto {
  category_id: string;
  sub_category_id?: string;
}
