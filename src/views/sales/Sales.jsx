import { View, StyleSheet, Text } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import { DatabaseContext } from "../../BD/DatabaseContext"
import Toast from 'react-native-toast-message';
const Sales = () => {
    const [listaProductos, setListaProductos] = useState([])
    const db = useContext(DatabaseContext)

    useEffect(() => {
        obtenerProductos()
    }, [db])


    const obtenerProductos = () => {
        if (db) {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM products',
                    [], (_, { rows }) => {
                        setListaProductos(rows._array)
                    }, (_, error) => Toast.show({
                        type: 'error',
                        text1: 'Sales',
                        text2: 'Al intentar obtener los productos\n' + error
                    })
                )
            }
            )
        }

    }

    return (
        <View style={styles.containner} >
            {
                listaProductos.map((product, key) =>
                    <View key={key} style={styles.cardProductos} >
                        <Text> {product.nombre_producto}</Text>
                    </View>
                )
            }

        </View>
    )
}

const styles = StyleSheet.create({
    containner: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 60
    }, cardProductos: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 7,
        marginBottom: 5
    }

})
export default Sales