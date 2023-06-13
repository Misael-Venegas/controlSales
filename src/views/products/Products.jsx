import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ToastAndroid, TouchableOpacity, Text, View, Alert } from 'react-native'
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



    const deleteProduct = (id) => {

        Alert.alert(
            'Confirmación',
            '¿Estás seguro de que deseas eliminar este producto?', [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: () => {
                    db.transaction(tx => {
                        tx.executeSql(
                            `DELETE FROM products WHERE id=${id}`,
                            [],
                            () => {
                                ToastAndroid.show('Producto eliminado', ToastAndroid.SHORT);
                                setActualizarLista(Math.random());
                            },
                            (_, error) =>
                                ToastAndroid.show(
                                    'Error al intentar eliminar el producto' + error,
                                    ToastAndroid.SHORT
                                )
                        );
                    });
                },
            },
        ],
            { cancelable: true }
        )

    }
    return (
        <SafeAreaView style={styles.containerView} >

            {arrayProductos.map((product, key) => (
                <View key={key} style={styles.cardLista} >
                    <View style={styles.iconContainer}>
                        <Ionicons name="checkmark-circle-outline" size={24} color="#EB4223" />
                    </View>
                    <View style={styles.infoContainer} >
                        <Text style={styles.prosText} >{product?.nombre_producto}</Text>
                        <Text style={styles.propsTextPrice} > ${product?.precio} MXN</Text>
                    </View>
                    <View>
                        <Ionicons name="md-pencil-sharp" size={24} color="black" />
                    </View>
                    <View style={styles.propsIconDelete} >
                        <Ionicons name="trash" size={24} color="#DC001A" onPress={() => deleteProduct(product.id)} />
                    </View>

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
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 7,
        marginBottom: 5
        // Otros estilos para el contenedor principal
    },
    iconContainer: {
        marginRight: 10,
        // Otros estilos para el contenedor del ícono
    },
    infoContainer: {
        flex: 1,
        // Otros estilos para el contenedor de información
    },
    prosText: {
        fontSize: 16,
        fontWeight: 'bold',
        // Otros estilos para el texto de pros
    },
    propsTextPrice: {
        fontSize: 14,
        // Otros estilos para el texto de precio
    },
    propsIconDelete: {
        marginLeft: 5
    }
});
export default Products