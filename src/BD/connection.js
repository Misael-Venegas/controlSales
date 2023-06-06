import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('Sales.db')

module.exports = db