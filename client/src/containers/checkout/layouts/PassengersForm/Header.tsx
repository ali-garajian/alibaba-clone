import { Grid, Paper, makeStyles, Theme, Box, Button } from '@material-ui/core';
import {
	AirlineSeatReclineNormal as AirlineSeatReclineNormalIcon,
	Add as AddIcon,
} from '@material-ui/icons';
import shallow from 'zustand/shallow';
import { UseFieldArrayReturn } from 'react-hook-form';
import { IPassengers } from '@alibaba-clone/core';

import { ISearchOptionsSlice } from 'data/SearchOptions';
import useStore from 'data/Store';
import { IPassengersForm } from '.';

const useStyles = makeStyles((theme: Theme) => ({
	icon: {
		color: theme.palette.primary.main,
		fontSize: 30,
		transform: 'rotateY(180deg)',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 14,
		color: '#646464',
	},
	passengerCount: {
		color: '#8bc34a',
		marginRight: 5,
		fontWeight: 'bold',
	},
	passengerCountRoot: {
		'& .paper, .button, .content': {
			height: '100%',
		},
	},
}));

const passengersSelector = (state: ISearchOptionsSlice) =>
	[state.passengers, state.setPassengers] as const;

interface IPassengersFormHeaderProps
	extends Partial<UseFieldArrayReturn<IPassengersForm, 'passengers', 'id'>> {}
function PassengersFormHeader({ append }: IPassengersFormHeaderProps) {
	const classes = useStyles();
	const [passengers, setPassengers] = useStore(passengersSelector, shallow);

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={7}>
				<Paper>
					<Box p={1} display="flex" alignItems="center">
						<AirlineSeatReclineNormalIcon className={classes.icon} />
						<span className={classes.title}>مشخصات مسافران را وارد نمایید</span>
					</Box>
				</Paper>
			</Grid>
			<Grid item xs={12} md={5}>
				<Grid container style={{ height: '100%' }}>
					<Grid item xs={4}>
						<PassengerCount
							count={passengers.adult}
							title="بزرگسالان"
							category="adult"
							setPassengers={setPassengers}
							onAfterSetPassenger={() => {
								append?.({
									type: 'adult',
								});
							}}
						/>
					</Grid>
					<Grid item xs={4}>
						<PassengerCount
							count={passengers.child}
							title="کودک"
							category="child"
							setPassengers={setPassengers}
							disabled={
								passengers.child + passengers.infant >= passengers.adult
							}
							onAfterSetPassenger={() => {
								append?.({
									type: 'child',
								});
							}}
						/>
					</Grid>
					<Grid item xs={4}>
						<PassengerCount
							count={passengers.infant}
							title="نوراد"
							category="infant"
							setPassengers={setPassengers}
							disabled={
								passengers.child + passengers.infant >= passengers.adult
							}
							onAfterSetPassenger={() => {
								append?.({
									type: 'infant',
								});
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

interface IPassengerCount {
	count: number;
	title?: string;
	category: keyof IPassengers;
	setPassengers: React.Dispatch<React.SetStateAction<IPassengers>>;
	disabled?: boolean;
	onAfterSetPassenger?: VoidFunction;
}
function PassengerCount({
	count,
	setPassengers,
	title,
	category,
	disabled,
	onAfterSetPassenger,
}: IPassengerCount) {
	const classes = useStyles();

	return (
		<Box mx={1} height="100%" className={classes.passengerCountRoot}>
			<Paper className="paper">
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					className="content"
				>
					<Box display="flex" fontSize={13} flex={1} justifyContent="center">
						<span className={classes.passengerCount}>{count}</span>
						{title}
					</Box>
					<Button
						className="button"
						variant="contained"
						color="primary"
						disabled={disabled}
						onClick={() => {
							setPassengers((prev) => ({
								...prev,
								[category]: prev[category] + 1,
							}));
							onAfterSetPassenger?.();
						}}
					>
						<AddIcon />
					</Button>
				</Box>
			</Paper>
		</Box>
	);
}

export default PassengersFormHeader;
