import React, {useState, useEffect} from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';

import { commerce } from '../../lib/commerce';

import FormInput from './CustomTextField';

const AddressForm = ({ checkoutToken }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label:name }))
    console.log(countries);

    const fetchShippingCountries = async (checkoutTokenId) => { 
            const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

            setShippingCountries(countries);
            setShippingCountry(Object.keys(countries)[0]);
    }

    useEffect(() =>{
        fetchShippingCountries(checkoutToken.id)
    }, []);
    return (
        <>
            <Typography variant="h6" gutterBottom>Endereço de entrega</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='Nome'/>
                        <FormInput required name='lastName' label='Sobre nome'/>
                        <FormInput required name='address1' label='Endereço'/>
                        <FormInput required name='Email' label='Email'/>
                        <FormInput required name='City' label='Cidade'/>
                        <FormInput required name='zip' label='Cep'/>
                         <Grid item xs={12} sm={6}>
                            <InputLabel>País de Envio</InputLabel>
                            <select value={shippingCountry} fullwidth onChange={(e) => setShippingCountry(e.target.value)}>
                               
                                {/* <MenuItem key={} value={}>
                                    Selecionar
                                </MenuItem> */}
                            </select>
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Subdivisão de Envio</InputLabel>
                            <select value={} fullwidth onChange={}>
                                <MenuItem key={} value={}>
                                    Selecionar
                                </MenuItem>
                            </select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Opções de Envio</InputLabel>
                            <select value={} fullwidth onChange={}>
                                <MenuItem key={} value={}>
                                    Selecionar
                                </MenuItem>
                            </select>
                        </Grid>  */}
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm;