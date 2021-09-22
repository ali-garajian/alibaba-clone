import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import shallow from 'zustand/shallow';
import { EFlightClass } from '@alibaba-clone/core';

import CustomAccordion from 'components/CustomAccordion';
import useStore, { IFiltersSlice } from 'data/Store';

const flightClassLabelMap: Record<EFlightClass, string> = {
	[EFlightClass.Buisiness]: 'بیزینس',
	[EFlightClass.Economy]: 'اکونومی',
};

const flightClasseSelector = (state: IFiltersSlice) =>
	[state.flightClasses, state.setFlightClasses] as const;

interface IFlightClassFilterProps {}
function FlightClassFilter({}: IFlightClassFilterProps) {
	const [checked, setChecked] = useStore(flightClasseSelector, shallow);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.name, event.target.checked);
	};

	return (
		<CustomAccordion title="کلاس پروازی">
			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox
							checked={checked[EFlightClass.Buisiness]}
							onChange={handleChange}
							name={EFlightClass.Buisiness}
							color="primary"
						/>
					}
					label={flightClassLabelMap[EFlightClass.Buisiness]}
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={checked[EFlightClass.Economy]}
							onChange={handleChange}
							name={EFlightClass.Economy}
							color="primary"
						/>
					}
					label={flightClassLabelMap[EFlightClass.Economy]}
				/>
			</FormGroup>
		</CustomAccordion>
	);
}

export default FlightClassFilter;
