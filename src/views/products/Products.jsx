import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ToastAndroid, TouchableOpacity, Text, View } from 'react-native'
import { DatabaseContext } from '../../BD/DatabaseContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalAddProduct from './ModalAddProduct';

const Products = () => {

    const db = useContext(DatabaseContext)
    const [arrayProductos, setarrayProductos] = useState([])
    const [verModalAgregarProoducto, setverModalAgregarProoducto] = useState(false)
    const [actualizarLista, setActualizarLista] = useState(3.1416)

    useEffect(() => {
        fetchProducts();
    }, [actualizarLista])

    const fetchProducts = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM products;',
                [],
                (_, { rows }) => {
                    // const productsArray = Array.from(rows);
                    setarrayProductos(rows._array);

                },
                (_, error) => ToastAndroid.show('Error: al obtener los productos de la BD' + error, ToastAndroid.SHORT)
            );
        });
    };
    return (
        <SafeAreaView style={styles.containerView} >

            {arrayProductos.map((product, key) => (
                <View style={styles.cardLista} >
                    <Text key={key} style={styles.prosText} >{product?.nombre_producto}</Text>
                    <Text style={styles.propsTextPrice} > ${product?.precio} MXN</Text>
                </View>
            ))}

            <TouchableOpacity style={styles.button} onPress={() => setverModalAgregarProoducto(true)} >
                <Ionicons name='add' size={24} color="white" />
            </TouchableOpacity>

            {
                verModalAgregarProoducto && <ModalAddProduct setVisible={setverModalAgregarProoducto} visible={verModalAgregarProoducto} setActualizarLista={setActualizarLista} />
            }
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 60
    },
    button: {
        position: 'absolute',
        backgroundColor: '#EB4223',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        bottom: 0
    }, cardLista: {
        backgroundColor: '#FFF',
        marginBottom: 5,
        padding: 10,
        borderRadius: 7
    }, prosText: {
        fontSize: 16,
        fontWeight: 'bold',
    }, propsTextPrice: {
        fontWeight: 'bold',
        color: 'gray'
    }
});
export default Products