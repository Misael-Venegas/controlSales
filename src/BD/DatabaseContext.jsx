import React, { createContext, useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

export const DatabaseContext = createContext(null);

const db = SQLite.openDatabase('products.db');

export const DatabaseProvider = ({ children }) => {
    const [database, setDatabase] = useState(null);

    useEffect(() => {
        setDatabase(db);
    }, []);

    return (
        <DatabaseContext.Provider value={database}>
            {children}
        </DatabaseContext.Provider>
    );
};
