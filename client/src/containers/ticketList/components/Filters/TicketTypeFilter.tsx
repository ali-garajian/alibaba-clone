import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import shallow from 'zustand/shallow';

import CustomAccordion from 'components/CustomAccordion';
import { ETicketType } from 'types/models/Ticket';
import useStore, { IFiltersSlice } from 'data/Store';

const ticketTypeLabelMap: Record<ETicketType, string> = {
  [ETicketType.Systematic]: 'سیستمی',
  [ETicketType.Charters]: 'چارتر',
};

const ticketTypeSelector = (state: IFiltersSlice) =>
  [state.ticketTypes, state.setTicketTypes] as const;

interface ITicketTypeFilterProps {}
function TicketTypeFilter({}: ITicketTypeFilterProps) {
  const [checked, setChecked] = useStore(ticketTypeSelector, shallow);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.name, event.target.checked);
  };

  return (
    <CustomAccordion title="نوع بلیط">
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked[ETicketType.Systematic]}
              onChange={handleChange}
              name={ETicketType.Systematic}
              color="primary"
            />
          }
          label={ticketTypeLabelMap[ETicketType.Systematic]}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checked[ETicketType.Charters]}
              onChange={handleChange}
              name={ETicketType.Charters}
              color="primary"
            />
          }
          label={ticketTypeLabelMap[ETicketType.Charters]}
        />
      </FormGroup>
    </CustomAccordion>
  );
}

export default TicketTypeFilter;
