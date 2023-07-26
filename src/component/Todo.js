import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import "./todo.css"
export default function Todo({title,details}) {
  return (
    <>
      <Card sx={{ minWidth: 275 }} style={{background:"#039be5",marginTop:'10px'}}>
        <CardContent>
          <Grid container spacing={2} >
            <Grid item xs={8}>
              <Typography variant="h5">{title}</Typography>
              <Typography>{details}</Typography>
            </Grid>
            <Grid item xs={4} style={{display:'flex',justifyContent:"space-around"}}>
              <IconButton className="iconBtn" style={{color:"red",background:"white",border:"3px solid red"}} >
                <DeleteIcon />
              </IconButton>

              <IconButton className="iconBtn" style={{color:"green",background:"white",border:"3px solid green"}} >
                <CheckIcon />
              </IconButton>

              <IconButton className="iconBtn" style={{color:"blue",background:"white",border:"3px solid blue"}} >
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
