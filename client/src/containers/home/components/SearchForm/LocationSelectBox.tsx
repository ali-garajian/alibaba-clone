import { makeStyles, Divider, Theme } from '@material-ui/core';
import { SyncAlt as SyncAltIcon } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import clsx from 'clsx';
import {
	IdTitleModel,
	CitiesApi,
	AsyncAutocomplete,
} from '@alibaba-clone/core';

import _CACHE from 'data/_CACHE';

const useStyles = makeStyles((theme: Theme) => ({
	comboBoxInputRoot: {
		backgroundColor: '#fff',
		height: 50,
		width: 240,
		'& .MuiInputBase-root': {
			paddingTop: 8,
			backgroundColor: '#fff',
		},
		'& input': {
			fontSize: 14,
			color: '#646464',
		},
	},
	sourceComboBox: {
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
	},
	destinationComboBox: {
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
	},
	switchBtn: {
		position: 'absolute',
		right: '50%',
		top: '50%',
		transform: 'translateY(-50%)',
		color: theme.palette.primary.main,
		border: '1px solid #d2d2d2',
		borderRadius: '50%',
		padding: 6,
		boxSizing: 'content-box',
		fontSize: 15,
		backgroundColor: '#fff',
		zIndex: 10,
		transition: '0.2s',
		cursor: 'pointer',
		'&:hover': {
			color: '#fff',
			backgroundColor: theme.palette.primary.main,
		},
	},
	divider: {
		position: 'absolute',
		right: 'calc(50% + 15px)',
		zIndex: 5,
		backgroundColor: '#d2d2d2',
	},
}));

interface ILocationSelectBoxProps {
	source: IdTitleModel;
	onSourceChange(v: IdTitleModel): void;

	destination: IdTitleModel;
	onDestinationChange(v: IdTitleModel): void;

	onToggle: VoidFunction;
}
function LocationSelectBox({
	source,
	onSourceChange,
	destination,
	onDestinationChange,
	onToggle,
}: ILocationSelectBoxProps) {
	const classes = useStyles();

	return (
		<Box display="flex" position="relative" width="480px">
			<AsyncAutocomplete
				_CACHE={_CACHE}
				cacheKey="source-combobox"
				value={source}
				onChange={(_, value) => onSourceChange(value)}
				textFieldProps={{
					className: clsx(classes.comboBoxInputRoot, classes.sourceComboBox),
				}}
				fetchOptions={async (search) => {
					const response = await CitiesApi.getCities({ q: search });
					return response.data ?? [];
				}}
			/>
			<Divider orientation="vertical" className={classes.divider} />
			<SyncAltIcon
				className={classes.switchBtn}
				fontSize="small"
				onClick={onToggle}
			/>
			<AsyncAutocomplete
				_CACHE={_CACHE}
				cacheKey="destination-combobox"
				value={destination}
				onChange={(_, value) => onDestinationChange(value)}
				textFieldProps={{
					className: clsx(
						classes.comboBoxInputRoot,
						classes.destinationComboBox
					),
				}}
				fetchOptions={async (search) => {
					const response = await CitiesApi.getCities({ q: search });
					return response.data ?? [];
				}}
			/>
		</Box>
	);
}

export default LocationSelectBox;
