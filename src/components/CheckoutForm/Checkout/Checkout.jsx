import React,{useState, useEffect} from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core';

import { commerce } from '../../../lib/commerce';
import useStyles from './styles';
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Endereço de entrega', 'Detalhes de pagamento'];

const Checkout = ({ cart }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});

                console.log(token);
                setCheckoutToken(token);
            } catch (error) {

            }
        }
        generateToken();
    }, [cart]);

    const Confirmantion = () => (
        <div>
            Pedido confirmado
        </div>
    );

    const Form = () => activeStep === 0
     ? <AddressForm checkoutToken={checkoutToken} />
     : <PaymentForm />


    return (
        <>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Fechar Compra</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step)=> (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmantion /> : checkoutToken && <Form />}
            </Paper>
        </main>
        </>
    )
}

export default Checkout;
