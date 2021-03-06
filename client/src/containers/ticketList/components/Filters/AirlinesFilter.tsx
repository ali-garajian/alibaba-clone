import { Box, makeStyles, Theme, FormGroup, Checkbox } from '@material-ui/core';
import shallow from 'zustand/shallow';
import { MoneyFormat } from '@alibaba-clone/core';

import CustomAccordion from 'components/CustomAccordion';
import useStore, { IFiltersSlice } from 'data/Store';
import { airlines as airlineList } from 'data/dummy_data/airlines';

const useStyles = makeStyles((theme: Theme) => ({
	airlineLogo: {
		width: 24,
		height: 24,
	},
	airlineName: {
		color: '#646464',
		fontSize: 13,
		marginLeft: 5,
	},
	airlineCheapestPrice: {
		fontSize: 12,
		color: '#212121',
		marginLeft: 'auto',
	},
}));

const airlinesSelector = (state: IFiltersSlice) =>
	[state.airlines, state.setAirlines] as const;

interface IAirlinesFilterProps {}
function AirlinesFilter({}: IAirlinesFilterProps) {
	const classes = useStyles();
	const [airlines, setAirlines] = useStore(airlinesSelector, shallow);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAirlines(+event.target.name);
	};

	return (
		<CustomAccordion title="شرکت های هواپیمایی">
			<FormGroup>
				{airlineList.map((airline) => (
					<Box key={airline.id} display="flex" alignItems="center">
						<Checkbox
							checked={airlines.findIndex((id) => id === airline.id) > -1}
							onChange={handleChange}
							name={airline.id.toString()}
							color="primary"
						/>
						<img
							src={airline.logo}
							className={classes.airlineLogo}
							alt="airline logo"
						/>
						<span className={classes.airlineName}>{airline.name}</span>
						<span className={classes.airlineCheapestPrice}>
							{airline.cheapestPrice
								? `${MoneyFormat(airline.cheapestPrice * 10000)} ریال`
								: 'تکمیل ظرفیت'}
						</span>
					</Box>
				))}
			</FormGroup>
		</CustomAccordion>
	);
}

export default AirlinesFilter;
