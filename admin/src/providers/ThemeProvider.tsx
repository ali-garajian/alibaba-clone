import { ThemeProvider } from '@material-ui/core';

import DefaultTheme from 'themes';

export default function Provider({ children }: React.PropsWithChildren<{}>) {
  return <ThemeProvider theme={DefaultTheme}>{children}</ThemeProvider>;
}
