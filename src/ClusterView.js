import S from './store.js';
import { observer } from "mobx-react"
import { values } from "mobx"
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const PiCard = observer(({ pi }) =>
    <Grid item sm={4} xs={12}>
        <Card style={{ margin: 10, borderColor: pi.connected ? "green" : "red" }} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">
                    {pi.device.name}
                </Typography>
                <Typography style={{ color: pi.connected ? "green" : "red" }} variant="body2" component="h2">
                    {pi.connected ? "connected" : "connecting"}
                </Typography>
                <pre style={{ height: "200px", width: "100%", overflow: "scroll" }}>{pi.log}</pre>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => pi.send(S.script)}>Send</Button>
            </CardActions>
        </Card>
    </Grid >
)

const ClusterView = observer(() =>
    <Grid container>
        {values(S.cluster.dict).map((x, id) => <PiCard key={id} pi={x} />)}
    </Grid>
)


export default ClusterView;