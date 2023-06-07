import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, SafeAreaView, ToastAndroid } from 'react-native'

const Products = () => {

    const [nombreProducto, setNombreProducto] = useState("");
    const [precioProducto, setPrecioProducto] = useState(0.0)


    const guardarProducto = () => {
        if (nombreProducto === "") {
            ToastAndroid.show('Error: El nombre esta vacio', ToastAndroid.SHORT);
            return;
        }
        if (precioProducto <= 0) {
            ToastAndroid.show('Error: El precio debe ser mayor a cero', ToastAndroid.SHORT);
            return;
        }

        ToastAndroid.show('El producto se registro de manera correcta', ToastAndroid.SHORT);
    }

    return (
        <SafeAreaView>
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
            <View style={styles.buttonContainer}>
                <Button
                    title="Guardar"
                    onPress={() => guardarProducto()}
                    color="#EB4223" // Cambiar el color del botón (opcional)

                />
            </View>


        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 7,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
        borderColor: '#B3B3B3'
    }, prosText: {
        marginTop: 10,
        marginLeft: 12,
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: 200, // Ajustar el ancho deseado del contenedor del botón
        alignSelf: 'center', // Centrar el contenedor del botón
        marginTop: 12
    }
});
export default Products