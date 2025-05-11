import { MenuOptionChoice } from '../menu-option-choice.entity';

export interface OptionDto {
  id?: number;
  name: string;
  is_required?: boolean;
  allow_multiple?: boolean;
  choices?: MenuOptionChoice[];
}
