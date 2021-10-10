import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import shallow from 'zustand/shallow';
import { EFlightTicketType } from '@alibaba-clone/core';

import CustomAccordion from 'components/CustomAccordion';
import useStore, { IFiltersSlice } from 'data/Store';

const ticketTypeLabelMap: Record<EFlightTicketType, string> = {
	[EFlightTicketType.Systematic]: 'سیستمی',
	[EFlightTicketType.Charters]: 'چارتر',
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
							checked={checked[EFlightTicketType.Systematic]}
							onChange={handleChange}
							name={EFlightTicketType.Systematic}
							color="primary"
						/>
					}
					label={ticketTypeLabelMap[EFlightTicketType.Systematic]}
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={checked[EFlightTicketType.Charters]}
							onChange={handleChange}
							name={EFlightTicketType.Charters}
							color="primary"
						/>
					}
					label={ticketTypeLabelMap[EFlightTicketType.Charters]}
				/>
			</FormGroup>
		</CustomAccordion>
	);
}

export default TicketTypeFilter;
