import React from 'react';
import styles from '../../styles/OptionsMenu.module.css';
import { useState } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MuiToggleButton from '@mui/material/ToggleButton';

import { SelectHour } from '../../components/create-page/SelectHour';
import TimezoneSelect from 'react-timezone-select';
import { BasicDatePicker } from '../homepage/DatePicker';
import { Increment } from './Increment';

/* Define our own styling
https://stackoverflow.com/questions/69707814/set-selected-background-color-of-mui-togglebutton
*/
const ToggleButton = styled(MuiToggleButton)({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: '#087f5b',
  },
});

export const OptionsMenu = ({
  deltaTime,
  setDeltaTime,
  startHour,
  setStartHour,
  endHour,
  setEndHour,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setTimeZone,
}) => {
  console.log('Start date:', startDate);

  /* Code for TimeZone */
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  ); // use default timezone of user
  const currTZ = JSON.stringify(selectedTimezone, null, 2);

  /* Code for Time Increment */
  const [timeInterval, setTimeInterval] = useState('15');
  const handleChange = (event, newTimeInterval) => {
    if (newTimeInterval == null) {
      return; /* Prevent users hitting the same button twice --> no null state */
    }
    setTimeInterval(newTimeInterval);
  };

  const control = {
    value: timeInterval,
    onChange: handleChange,
    exclusive: true,
  };

  console.log('startDate from OptionsMenu: ', startDate);

  return (
    <div className="container-padding-sm">
      <div className={`${styles.options_container}`}>
        <div className="flex justify-content">
          <ul className={styles.options_list}>
            <li>
              Start Date
              <div>
                <BasicDatePicker
                  defaultDate={startDate}
                  setDate={(val) => setStartDate(val)}
                />
              </div>
            </li>
            <li>
              End Date
              <div>
                <BasicDatePicker
                  defaultDate={endDate}
                  setDate={(val) => setEndDate(val)}
                />
              </div>
            </li>

            {/* start hour has to be before end hour */}
            <li>
              Hour Start
              <div>
                <SelectHour
                  defaultHour={startHour}
                  setHour={setStartHour}
                  isStartHour={true}
                />
              </div>
            </li>
            <li>
              Hour End
              <div>
                <SelectHour
                  defaultHour={endHour}
                  setHour={setEndHour}
                  isStartHour={false}
                />
              </div>
            </li>
            <li>
              Timezone
              <div className="select-wrapper">
                <TimezoneSelect
                  value={selectedTimezone}
                  onChange={setSelectedTimezone}
                />
              </div>
            </li>
            <li>
              Increment
              <Increment deltaTime={deltaTime} setDeltaTime={setDeltaTime} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
