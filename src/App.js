import './App.css';
import {Autocomplete, Box, Button, CircularProgress, TextField} from "@mui/material";
import {Fragment, useEffect, useState} from "react";
import {getCountries} from "./api/countries";
import {getCities} from "./api/cities";
import {getMeasurements} from "./api/airQualityMeasurements";
import MeasurementTable from "./components/measurementTable";

function App() {
    const [country, setCountry] = useState(null);
    const [firstCity, setFirstCity] = useState(null);
    const [secondCity, setSecondCity] = useState(null);
    const [options, setOptions] = useState([]);
    const [rowsData, setRowsData] = useState({
        firstTableRows: [],
        firstTableDesc: {},
        secondTableRows: [],
        secondTableDesc: {},
    });
    const [citiesOptions, setCitiesOptions] = useState([]);
    const loading = options.length === 0;


    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
        (async () => {
            const response = await fetchAllCountries();

            if (active) {
                setOptions([...response]);
            }
        })();
        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        // make changes there for the api call of the cities
        if (country !== null) {
            (async () => {
                const response = await fetchAllCities(country.code);
                setCitiesOptions([...response]);
            })();
        }
    }, [country])

    const fetchAllCountries = async () => {
        return await getCountries();
    };

    const fetchAllCities = async (countryCode) => {
        // reset values
        setFirstCity(null);
        setSecondCity(null);
        // get values
        return await getCities(countryCode);
    };

    const getAirFlowData = async () => {
        if (firstCity !== null && secondCity !== null) {
            const tablesData = {
                firstTableRows: await getMeasurements(country.code, firstCity.city),
                secondTableRows: await getMeasurements(country.code, secondCity.city),
                firstTableDesc: {
                    countryName: country.name,
                    cityName: firstCity.city
                },
                secondTableDesc: {
                    countryName: country.name,
                    cityName: secondCity.city
                },
            };
            setRowsData(tablesData);
        }
    }

    return (
        <Box className={'main-container'}>
            <Box className={'selection-container'}>
                <Autocomplete
                    id="asynchronous"
                    onChange={(event, newValue) => {
                        setCountry(newValue);
                    }}
                    sx={{width: 300}}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    getOptionLabel={(option) => option.name}
                    options={options}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Countries"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                        {params.InputProps.endAdornment}
                                    </Fragment>
                                ),
                            }}
                        />
                    )}
                />


                <Autocomplete
                    value={firstCity}
                    onChange={(event, newValue) => {
                        setFirstCity(newValue);
                    }}
                    id="controllable-states-demo"
                    isOptionEqualToValue={(option, value) => option.city === value.city}
                    getOptionLabel={(option) => option.city}
                    options={citiesOptions}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="First City"/>}
                />

                <Autocomplete
                    value={secondCity}
                    onChange={(event, newValue) => {
                        setSecondCity(newValue);
                    }}
                    id="controllable-states-demo"
                    isOptionEqualToValue={(option, value) => option.city === value.city}
                    getOptionLabel={(option) => option.city}
                    options={citiesOptions}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="Second City"/>}
                />

                <Button variant="contained" onClick={() => {
                    getAirFlowData().then()
                }}>Apply</Button>
            </Box>
            <Box className={'table-container'}>
                <Box style={{flexBasis: '50%'}}>
                    <MeasurementTable rows={rowsData.firstTableRows} headDesc={rowsData.firstTableDesc}/>
                </Box>
                <Box style={{flexBasis: '50%'}}>
                    <MeasurementTable rows={rowsData.secondTableRows} headDesc={rowsData.secondTableDesc}/>
                </Box>
            </Box>
        </Box>
    );
}

export default App;
