import { TextField, makeStyles, Divider, Theme } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  SyncAlt as SyncAltIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
} from '@material-ui/icons';
import { Box } from '@material-ui/core';
import clsx from 'clsx';

import { IdTitleModel } from 'types/base/IdTitleModel';
import { cities } from '../../utils/dummy_data';

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
  startAdornment: {
    fontSize: 20,
    color: '#aaa',
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
      <Autocomplete
        id="destination-combobox"
        value={source}
        onChange={(_, value) => onSourceChange(value)}
        options={cities}
        getOptionLabel={(option) => option.title}
        disableClearable
        popupIcon={null}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            className={clsx(classes.comboBoxInputRoot, classes.sourceComboBox)}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              startAdornment: (
                <LocationOnOutlinedIcon className={classes.startAdornment} />
              ),
            }}
          />
        )}
      />
      <Divider orientation="vertical" className={classes.divider} />
      <SyncAltIcon
        className={classes.switchBtn}
        fontSize="small"
        onClick={onToggle}
      />
      <Autocomplete
        id="destination-combobox"
        value={destination}
        onChange={(_, value) => onDestinationChange(value)}
        options={cities}
        getOptionLabel={(option) => option.title}
        disableClearable
        popupIcon={null}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            className={clsx(
              classes.comboBoxInputRoot,
              classes.destinationComboBox
            )}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              startAdornment: (
                <LocationOnOutlinedIcon className={classes.startAdornment} />
              ),
            }}
          />
        )}
      />
    </Box>
  );
}

export default LocationSelectBox;
