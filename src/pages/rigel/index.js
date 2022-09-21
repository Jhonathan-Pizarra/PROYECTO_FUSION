import {Layout} from "@/components/others/layout";
import {withSSRAuth} from "@/hocs/withSSRAuth"
import axios from "axios";

const Rigel = () => {

    const obtenerNumeroSerie = ({
                             sType = "Imei",
                             sModel = "LTE2 Samsung Verde",
                             preowned = 1
                         }) => {

        const product = {
            sType,
            sModel,
            preowned
        };

        axios.post(`https://www2.rigel-m.com/api/v1/catalogues/sold-serial-numbers`, product)
            .then(response => console.log(response));

        alert('Consumido!');
    }


    const actualizarEstadoPorNumeroSerie = ({
                              serial_number = "1213213213",
                              state =  1
                          }) => {

        const product = {
            serial_number,
            state
        };

        axios.post(`https://www2.rigel-m.com/api/v1/catalogues/change-serial-number-status`, product)
            .then(response => console.log(response));

        alert('Consumido 2!');
    }


    return(
        <>
            <Layout>
              <h1>Hola Mundo</h1>
              <button onClick={()=>obtenerNumeroSerie()}>Rigel 1</button>
              <button onClick={()=> actualizarEstadoPorNumeroSerie()}>Rigel 2</button>
            </Layout>
        </>
    );
}

export async function getServerSideProps(context) {
    return withSSRAuth(context)
}

export default Rigel
