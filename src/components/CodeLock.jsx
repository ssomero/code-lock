import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'

import './CodeLock.css';

export default function CodeLock() {
    const [code, setCode] = useState("");
    const [locked, setLocked] = useState(false);
    const isInitialMount = useRef(true);

    const lockedIcon = require("../locked.png");
    const openIcon = require("../lock_open.png");

    const valuesInserted = () => {
        return code.length === 4;
    };

    const handleClick = (event) => {
        if (!valuesInserted()) {
            const newValue = code.concat('', event.target.value);
            setCode(newValue);
        }
    };

    const renderNumbers = () => {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => {
            return (
            <button key={number} value={number} className='number' type="button" onClick={(e) => handleClick(e)}>{number}</button>
            );
        })
    };

    const renderLockIcon = () => {
        return <div className='lock-icon'>{ locked ? <img alt="locked" src={lockedIcon}/> : <img alt="open" src={openIcon}/> }</div>;
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (valuesInserted()) {
                axios.post('http://localhost:8080/codecheck', { code })
                    .then(response => {
                        console.log(response);
                        setLocked(response.data.locked);
                    })
                    .catch(error => {
                        console.log(`An error occurreA: ${error}`);
                    })
                    .then(() => {
                        setCode("");
                    })
            }
        }
    }, [code]);

    return (
        <div className="code-lock">
            <div className="number-wrapper">
                {renderNumbers()}
                {renderLockIcon()}
            </div>
            <p>{code}</p>
        </div>
    );
}