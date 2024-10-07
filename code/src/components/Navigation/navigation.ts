import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type NavigationItem = {
  displayName: string,
  onclick: () => void,
  Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & { muiName: string; }
};
