import { useState } from 'react';
import {
	Box,
	Popper,
	Fade,
	makeStyles,
	Paper,
	ClickAwayListener,
	Theme,
} from '@material-ui/core';
import {
	PersonOutline as PersonOutlineIcon,
	Add as AddIcon,
	Remove as RemoveIcon,
} from '@material-ui/icons';
import { IPassengers } from '@alibaba-clone/core';

const useStyles = makeStyles({
	title: {
		fontSize: 14,
		color: '#646464',
		width: 190,
		display: 'flex',
		alignItems: 'center',
		padding: 20,
		height: 50,
	},
	icon: {
		color: '#aaa',
		marginRight: 8,
	},
});

interface IPassengerPickerBoxProps {
	passengers: IPassengers;
	setPassengers: React.Dispatch<React.SetStateAction<IPassengers>>;
}
function PassengerPickerBox({
	passengers,
	setPassengers,
}: IPassengerPickerBoxProps) {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const open = Boolean(anchorEl);

	return (
		<>
			<Paper
				className={classes.title}
				onClick={(e) => setAnchorEl(e.currentTarget)}
			>
				<PersonOutlineIcon className={classes.icon} />
				{passengers.adult + passengers.child + passengers.infant} مسافر
			</Paper>
			<Popper
				id="passenger-picker-popper"
				open={open}
				anchorEl={anchorEl}
				transition
				disablePortal
				style={{
					zIndex: 100,
				}}
			>
				{({ TransitionProps }) => (
					<ClickAwayListener onClickAway={() => setAnchorEl(null)}>
						<Fade {...TransitionProps} timeout={350}>
							<Box mt="4px">
								<Paper>
									<Box p={2} width="320px">
										<PassengerCategory
											category="adult"
											ageLimit="12 سال به بالا"
											count={passengers.adult}
											setPassengers={setPassengers}
											validate={(value) =>
												value >= 1 &&
												value >= passengers.child + passengers.infant
											}
										/>
										<PassengerCategory
											category="child"
											ageLimit="2 سال تا 12 سال"
											count={passengers.child}
											setPassengers={setPassengers}
											validate={(value) =>
												value >= 0 &&
												value + passengers.infant <= passengers.adult
											}
										/>
										<PassengerCategory
											category="infant"
											ageLimit="10 روز تا 2 سال"
											count={passengers.infant}
											setPassengers={setPassengers}
											validate={(value) =>
												value >= 0 &&
												value + passengers.child <= passengers.adult
											}
										/>
									</Box>
								</Paper>
							</Box>
						</Fade>
					</ClickAwayListener>
				)}
			</Popper>
		</>
	);
}

const usePassengerCateogryStyles = makeStyles((theme: Theme) => ({
	category: {
		fontWeight: 'bold',
		fontSize: 14,
		marginRight: 8,
	},
	ageLimit: {
		fontSize: 12,
	},
	icon: {
		fontSize: 14,
		border: `1px solid ${theme.palette.primary.main}`,
		padding: 5,
		margin: '0 8px',
		boxSizing: 'content-box',
		color: theme.palette.primary.main,
		borderRadius: '50%',
		cursor: 'pointer',
		'&.clicked': {
			background: theme.palette.primary.main,
			color: '#fff',
		},
	},
	count: {
		fontSize: 12,
		color: '#646464',
	},
}));
interface IPassengerCateogryProps {
	category: keyof IPassengers;
	ageLimit: string;
	count: number;
	setPassengers: React.Dispatch<React.SetStateAction<IPassengers>>;
	validate?(value: number): boolean;
}
function PassengerCategory({
	category,
	ageLimit,
	count,
	setPassengers,
	validate = (value) => value >= 0,
}: IPassengerCateogryProps) {
	const classes = usePassengerCateogryStyles();

	return (
		<Box display="flex" justifyContent="space-between" mb={1}>
			<Box>
				<span className={classes.category}>
					{{ adult: 'بزرگسالان', child: 'کودک', infant: 'نوزاد' }[category]}
				</span>
				<span className={classes.ageLimit}>({ageLimit})</span>
			</Box>
			<Box display="flex" alignItems="center">
				<AddIcon
					className={classes.icon}
					onMouseDown={(e) => e.currentTarget.classList.add('clicked')}
					onMouseUp={(e) => e.currentTarget.classList.remove('clicked')}
					onClick={() =>
						setPassengers((prev) => ({
							...prev,
							[category]: validate?.(prev[category] + 1)
								? prev[category] + 1
								: prev[category],
						}))
					}
				/>
				<span className={classes.count}>{count}</span>

				<RemoveIcon
					className={classes.icon}
					onMouseDown={(e) => e.currentTarget.classList.add('clicked')}
					onMouseUp={(e) => e.currentTarget.classList.remove('clicked')}
					onClick={() =>
						setPassengers((prev) => ({
							...prev,
							[category]: validate?.(prev[category] - 1)
								? prev[category] - 1
								: prev[category],
						}))
					}
				/>
			</Box>
		</Box>
	);
}

export default PassengerPickerBox;
