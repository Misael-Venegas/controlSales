import * as SQLite from 'expo-sqlite'

const connectionBD = () => {
    return SQLite.openDatabase('Sales.db')
}

module.exports = { connectionBD }