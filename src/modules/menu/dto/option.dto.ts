import { OptionStatus } from '../menu-option.entity';

export interface OptionDto {
  name: string;
  additional_price: number;
  group_name?: string;
  status?: OptionStatus;
  is_active?: boolean;
  menu_id: number;
}
