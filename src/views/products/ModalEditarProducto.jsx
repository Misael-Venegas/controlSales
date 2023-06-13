import React, { useState, useContext } from 'react'
import { Modal, View, StyleSheet, Pressable, Text, TextInput } from 'react-native'
import {
    DatabaseContext
} from '../../BD/DatabaseContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
const ModalEditarProducto = ({ visible, setVisible, setActualizarLista, datos }) => {

    const db = useContext(DatabaseContext)
    const [nombreProducto, setNombreProducto] = useState(datos?.nombre_producto);
    const [precioProducto, setPrecioProducto] = useState(datos?.precio)

    const cerrarModal = () => {
        setVisible(false)
    }

    const guardarProducto = () => {
        if (nombreProducto === "") {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'El nombre esta vacio'
            })
            return;
        }
        if (precioProducto <= 0) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'El precio debe ser mayor a cero'
            })
            return;
        }

        db.transaction(tx => {
            tx.executeSql(`UPDATE products set nombre_producto='${nombreProducto}', precio=${precioProducto} WHERE id=${datos.id} `,
                [], () => {
                    Toast.show({
                        type: 'success',
                        text1: "Succes",
                        text2: "El producto se actualizo de manera correcta"
                    })
                    setNombreProducto("")
                    setPrecioProducto(0.0)
                    setActualizarLista(Math.random())
                    setVisible(false)
                }, (_, error) => {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Error al intentar actualizar el producto ' + error
                    })
                })
        })

    }

    return (
        <View style={styles.centeredView} >
            <Modal
                animationType='slide'
                transparent={true}
                visible={visible}
                onRequestClose={() => setVisible(false)}

            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Ionicons name="close" size={24} color="black" onPress={() => cerrarModal()} style={styles.closeIcon} />

                        <Text style={styles.prosText} >Nombre del producto</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => setNombreProducto(e)}
                            value={nombreProducto}
                            placeholder="Nombre"
                            keyboardType="default"
                        />
                        <Text style={styles.prosText}>Precio</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => setPrecioProducto(e)}
                            value={precioProducto.toString()}
                            placeholder="$"
                            keyboardType="numeric"
                        />
                        <View style={styles.buttonContainer} >
                            <Pressable
                                style={styles.button}
                                onPress={() => guardarProducto()}>
                                <Text style={styles.textStyle}>Guardar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 7,
        padding: 10,
        elevation: 2,
        backgroundColor: '#EB4223'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    }, prosText: {
        marginTop: 10,
        marginLeft: 12,
        fontSize: 18,
        fontWeight: 'bold',
    }, input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 7,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
        borderColor: '#B3B3B3',
        width: 300
    }, buttonContainer: {
        width: 200, // Ajustar el ancho deseado del contenedor del botón
        alignSelf: 'center', // Centrar el contenedor del botón
        marginTop: 12
    }, closeIcon: {
        alignSelf: 'flex-end'
    }
});

export default ModalEditarProducto