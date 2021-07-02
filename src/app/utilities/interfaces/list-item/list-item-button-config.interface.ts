import { EButtonFill, EButtonMode } from "../../enum/";

export interface IListItemButtonConfig {
  title?: string;
  color?: string;
  cssClass?: string;
  metaData?: any;
  id?: any;
  fill?: EButtonFill;
  mode?: EButtonMode;
  html?: string;
}
