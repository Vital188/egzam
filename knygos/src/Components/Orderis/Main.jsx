import Orders from "../../Contexts/Orders";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import Listas from '../Orderis/Listas'

function Main() {

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [rubs, setRubs] = useState (null)



    // READ for list
    useEffect(() => {
           axios.get('http://localhost:3003/rubs/wc', authConfig())
            .then(res => {
                setRubs(((res.data)));
            })
    }, [lastUpdate]);

   
    return (
        <Orders.Provider value={{
            rubs
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Listas />
                    </div>
                </div>
            </div>
        </Orders.Provider>
    );
}

export default Main;