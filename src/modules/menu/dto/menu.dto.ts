import { MenuStatus } from '../menu.entity';

export interface MenuDto {
  name: string;
  name_en?: string;
  description?: string;
  description_en?: string;
  image_url?: string;
  banner_url?: string;
  price: number;
  status?: MenuStatus;
  is_active?: boolean;
  is_banner?: boolean;
  category_id: number;
}
