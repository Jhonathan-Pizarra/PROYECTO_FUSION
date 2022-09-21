import {useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from '@/lib/api';

const AutoCompleteInput = ({handleInput,indexProduct,id,url='https://1r1hpx7qw6.execute-api.us-east-1.amazonaws.com/dev/plans',dataType='name'}) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
        return undefined;
        }
        
        (async () => {
        const {data:response}  = await axios(url)

        if (active) {
            setOptions([...response]);
        }
        })();

        return () => {
        active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
        setOptions([]);
        }
    }, [open]);
  return (
    <>
    <Autocomplete
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option[dataType] === value[dataType]}
      getOptionLabel={(option) => option[dataType]}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
            style={{backgroundColor: '#FFFFFF'}}

            name={id}
            size="small"
          {...params}
          label="Seleccione un  valor"
          onChange={(event) => handleInput(event, indexProduct-1)}
          onSelect={(event) => handleInput(event, indexProduct-1)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
    </>
  )
}

export default AutoCompleteInput