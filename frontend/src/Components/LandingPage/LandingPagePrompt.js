import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        background: "rgba(255, 250, 250, 0.6)",
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: "45px",
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    button: {
        marginBottom: '20px',
        width: '30%',
    }
}));

const LandingPagePrompt = () => {
    const classes = useStyles();
return (
    <div>
        <Link to="/login" style={{textDecoration: 'none'}}>
            <div className='slider'>
                Find
                <div className='flip'>
                    <div>
                        <div>LOVE</div>
                    </div>
                    <div>
                        <div>JOCKE</div>
                    </div>
                    <div>
                        <div>FRIENDS</div>
                    </div>
                </div>
                on Matcha!
            </div>
            <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.button}
            >
                Login
            </Button><br/>
        </Link>

        <Link to="/signup" style={{textDecoration: 'none'}}>
            <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.button}
            >
                Sign Up <br/>
            </Button>
        </Link>
    </div>
)
}

export default LandingPagePrompt;