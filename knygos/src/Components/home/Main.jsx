import Home from "../../Contexts/Home";
import List from "./List";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import { useContext } from "react";
import DataContext from "../../Contexts/DataContext";

function Main() {

        const [lastUpdate, setLastUpdate] = useState(Date.now());
        const [book, setBook] = useState(null);
        const [clot, setClot] = useState(null);
        const [order, setOrder] = useState(null);
        const { makeMsg } = useContext(DataContext);
        const [rateData, setRateData] = useState(null);

        // const reList = data => {
        //     const d = new Map();
        //     data.forEach(line => {
        //         if (d.has(line.type)) {
        //             d.set(line.type, [...d.get(line.type), line]);
        //         } else {
        //             d.set(line.type, [line]);
        //         }
        //     });
        //     return [...d];
        // }

    
        // READ for list
        useEffect(() => {
            axios.get('http://localhost:3003/home/book/cc', authConfig())
                .then(res => {
                    setBook(res.data);
                })
        }, [lastUpdate]);

        useEffect(() => {
            axios.get('http://localhost:3003/home/book/cc', authConfig())
                .then(res => {
                    setClot(res.data);
                })
        }, [lastUpdate]);

         useEffect(() => {
            if (null === order) {
                return;
            }
            axios.post('http://localhost:3003/home/orders/' + order.book_id, order, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
                makeMsg(res.data.text, res.data.type);
            })
         }, [order, makeMsg]);

         useEffect(() => {
            if (null === rateData) {
                return;
            }
            axios.put('http://localhost:3003/home/book/' + rateData.id, rateData, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
                makeMsg(res.data.text, res.data.type);
            });
        }, [rateData, makeMsg]);

      return (
        <Home.Provider value={{
            setOrder,
            book,
            setBook, 
            clot, 
            setRateData
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