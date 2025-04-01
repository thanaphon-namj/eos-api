import { MenuStatus } from '../menu.entity';
import { OptionDto } from './option.dto';

export interface MenuDto {
  name: string;
  name_en?: string;
  description?: string;
  image_url?: string;
  banner_url?: string;
  price: number;
  status?: MenuStatus;
  is_active?: boolean;
  is_banner?: boolean;
  category_id: number;
  options?: OptionDto[];
}
