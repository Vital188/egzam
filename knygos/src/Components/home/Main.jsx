import Home from "../../Contexts/Home";
import List from "./List";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import { useContext } from "react";
import DataContext from "../../Contexts/DataContext";

function Main() {

        const [lastUpdate, setLastUpdate] = useState(Date.now());
        const [rubs, setRubs] = useState(null);
        const [clot, setClot] = useState(null);
        const [order, setOrder] = useState(null);
        const { makeMsg } = useContext(DataContext);

        const reList = data => {
            const d = new Map();
            data.forEach(line => {
                if (d.has(line.type)) {
                    d.set(line.type, [...d.get(line.type), line]);
                } else {
                    d.set(line.type, [line]);
                }
            });
            return [...d];
        }

    
        // READ for list
        useEffect(() => {
            axios.get('http://localhost:3003/home/rubs/cc', authConfig())
                .then(res => {
                    setRubs(res.data);
                })
        }, [lastUpdate]);

        useEffect(() => {
            axios.get('http://localhost:3003/home/rubs/cc', authConfig())
                .then(res => {
                    setClot(res.data);
                })
        }, [lastUpdate]);

         useEffect(() => {
            if (null === order) {
                return;
            }
            axios.post('http://localhost:3003/home/orders/' + order.rubs_id, order, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
                makeMsg(res.data.text, res.data.type);
            })
         }, [order, makeMsg]);

      return (
        <Home.Provider value={{
            setOrder,
            rubs,
            setRubs, 
            clot
        }}>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <List/>
                </div>
            </div>
        </div>
        </Home.Provider>
    );
}

export default Main;