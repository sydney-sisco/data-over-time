import React from 'react';
import { Data } from './Data';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

const DataList = ({ entries }) => {

  return (
    <Box sx={{mt: 8}}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        {entries.map((entry, index) => (
          <Grid
            xs={12}
            sm={8}
            md={7}
            component={Box}
          >
            <Data key={entry.id} data={entry} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DataList;
