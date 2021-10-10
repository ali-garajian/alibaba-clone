import {
	Box,
	makeStyles,
	Paper,
	Theme,
	Table,
	TableRow,
	TableCell,
	TableHead,
	TableBody,
} from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';
import { MoneyFormat } from '@alibaba-clone/core';

import useStore, { RootState } from 'data/Store';
import shallow from 'zustand/shallow';
import { IPassengerInputData } from 'containers/checkout/layouts/PassengersForm';

const useStyles = makeStyles((theme: Theme) => ({
	icon: {
		color: theme.palette.primary.main,
		marginRight: 5,
		fontSize: 30,
	},
	title: {
		fontSize: 18,
		color: '#646464',
	},
	tableCntr: {
		'& .row:nth-child(even), .row:nth-child(even) $field': {
			backgroundColor: '#f5f5f5',
		},
	},
	field: {
		fontSize: 13,
		fontWeight: 'bold',
		textAlign: 'center',
		backgroundColor: '#f9fafe',
		color: '#646464',
		padding: '12px 0',
	},
	value: {
		padding: '12px 0',
		fontSize: 14,
		textAlign: 'center',
		color: '#646464',
	},
	table: {
		border: '1px solid #e1e1e1',
		borderRadius: 5,
		borderCollapse: 'separate',
		borderSpacing: 0,
	},
	tableHead: {
		background: '#e1e1e1',
		'& *': {
			color: '#646464',
		},
	},
}));

const dataSelector = (state: RootState) =>
	[state.passengersInfo, state.selectedFlightTicket] as const;

function PassengersInfo() {
	const classes = useStyles();

	const [passengersInfo, ticket] = useStore(dataSelector, shallow);

	if (!ticket) return null;

	return (
		<Paper elevation={2}>
			<Box p={4}>
				<Box display="flex" mb={2} ml={2}>
					<InfoIcon className={classes.icon} fontSize="inherit" />
					<span className={classes.title}>مشخصات مسافران</span>
				</Box>
				<PassengersCategoryInfo
					title="بزرگسال"
					passengersInfo={passengersInfo.filter(
						(passenger) => passenger.type === 'adult'
					)}
					price={ticket.price}
				/>
				<PassengersCategoryInfo
					title="کودک"
					passengersInfo={passengersInfo.filter(
						(passenger) => passenger.type === 'child'
					)}
					price={ticket.price}
				/>
				<PassengersCategoryInfo
					title="نوزاد"
					passengersInfo={passengersInfo.filter(
						(passenger) => passenger.type === 'infant'
					)}
					price={ticket.price}
				/>
			</Box>
		</Paper>
	);
}

interface IPassengersCategoryInfoProps {
	title: string;
	passengersInfo: IPassengerInputData[];
	price: number;
}
function PassengersCategoryInfo({
	title,
	passengersInfo,
	price,
}: IPassengersCategoryInfoProps) {
	const classes = useStyles();

	if (!passengersInfo.length) return null;

	return (
		<Box my={2}>
			<Box mb={1}>{title}</Box>
			<Table className={classes.table}>
				<TableHead className={classes.tableHead}>
					<TableRow>
						<TableCell align="center">نام و نام خانوادگی</TableCell>
						<TableCell align="center">نام و نام خانوادگی به انگلیسی</TableCell>
						<TableCell align="center">جنسیت</TableCell>
						<TableCell align="center">کد ملی</TableCell>
						<TableCell align="center">تاریخ تولد</TableCell>
						<TableCell align="center">قیمت</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{passengersInfo.map((passenger, index) => (
						<TableRow key={index}>
							<TableCell align="center">
								{`${passenger.firstname} ${passenger.lastname}`}
							</TableCell>
							<TableCell align="center">{`${passenger.firstname_en} ${passenger.lastname_en}`}</TableCell>
							<TableCell align="center">{passenger.sex?.title}</TableCell>
							<TableCell align="center">{passenger.ssn}</TableCell>
							<TableCell align="center">{`${passenger.birthdate?.year?.title}/${passenger.birthdate?.month?.title}/${passenger.birthdate?.day?.title}`}</TableCell>
							<TableCell align="center">{`${MoneyFormat(
								price * 10_000
							)} ریال`}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
}

export default PassengersInfo;
