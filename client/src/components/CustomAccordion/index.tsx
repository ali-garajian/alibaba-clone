import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails,
  withStyles,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

const Accordion = withStyles({
  root: {
    '&.Mui-expanded': {
      margin: 'auto',
    },
  },
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    minHeight: 64,
  },
  content: {
    fontSize: 15,
  },
})(MuiAccordionSummary);

interface ICustomAccordionProps {
  title: string;
}
export default function CustomAccordion({
  title,
  children,
}: React.PropsWithChildren<ICustomAccordionProps>) {
  return (
    <Accordion elevation={0} defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {title}
      </AccordionSummary>
      <AccordionDetails
        style={{
          flexDirection: 'column',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
}
