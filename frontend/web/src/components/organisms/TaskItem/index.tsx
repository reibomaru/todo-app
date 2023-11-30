import { Grid, Typography } from "@mui/material";

type Props = {
  label: string;
  displayValue: string;
};

const TaskItem = ({ label, displayValue }: Props) => {
  return (
    <Grid item container>
      <Grid item container alignItems="center">
        <Typography variant="h6" component="h3" sx={{ marginRight: 1 }}>
          {label}
        </Typography>
      </Grid>
      <Typography variant="body1" component="div">
        {displayValue}
      </Typography>
    </Grid>
  );
};

export default TaskItem;
