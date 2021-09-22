import { useMemo } from 'react';
import { Box, makeStyles, Paper, Theme, Grid } from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';
import { format } from 'date-fns-jalali';
import { EFlightClass, ITicket } from '@alibaba-clone/core';

import useStore from 'data/Store';
import { ITicketSlice } from 'data/Ticket';

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
}));

function createTicketInfo(ticket: ITicket | null) {
	if (!ticket) return null;

	return [
		{
			field: 'شرکت هواپیمایی',
			value: ticket.airline.name,
		},
		{
			field: 'مبدا',
			value: ticket.source.title,
		},
		{
			field: 'مقصد',
			value: ticket.destination.title,
		},
		{
			field: 'تاریخ و ساعت پرواز',
			value: format(new Date(ticket.departureDate), 'HH:mm - MMMM d EEEE'),
		},
		{
			field: 'شماره پرواز',
			value: ticket.id,
		},
		{
			field: 'کلاس پروازی',
			value: ticket.class === EFlightClass.Buisiness ? 'بیزینس' : 'اکونومی',
		},
		{
			field: 'مقدار بار مجاز',
			value: `${ticket.permittedLoggage} کیلوگرم`,
		},
	];
}

const ticketInfoSelector = (state: ITicketSlice) => state.selectedTicket;

function TicketInfo() {
	const classes = useStyles();

	const ticket = useStore(ticketInfoSelector);

	const ticketInfo = useMemo(() => createTicketInfo(ticket), [ticket]);

	if (!ticketInfo) return null;

	return (
		<Paper elevation={2}>
			<Box p={4}>
				<Box display="flex" mb={1}>
					<InfoIcon className={classes.icon} fontSize="inherit" />
					<span className={classes.title}>اطلاعات بلیط</span>
				</Box>
				<Paper elevation={2}>
					<Box className={classes.tableCntr}>
						{ticketInfo.map((row, index) => (
							<Grid container className="row" key={index}>
								<Grid item xs={3} className={classes.field}>
									{row.field}
								</Grid>
								<Grid item xs={9} className={classes.value}>
									{row.value}
								</Grid>
							</Grid>
						))}
					</Box>
				</Paper>
			</Box>
		</Paper>
	);
}

export default TicketInfo;
