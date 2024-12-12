import React, { useState } from 'react';
import {URL} from '../Const'
import { View, Text, TextInput, SafeAreaView, Pressable } from 'react-native';
import axios from 'axios';
import styles from './styles.js';
export default ({ route, navigation }) => {
    // Variável que recebe os dados da Lista e preeche os campos do form
    const [veiculo, setVeiculo] = useState(route.params ? route.params : {})
    //Função que Altera os dados utilizando a API
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${URL}/veiculo/${veiculo.id_veiculo}`, veiculo);
            navigation.navigate('VeiculoList'); 
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.text}>Identificação</Text>
                <TextInput
                    readOnly
                    style={styles.input}
                    value={veiculo.id_veiculo.toString()}
                />
                <Text style={styles.text}>Digite a Placa</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={placa => setVeiculo({
                        ...veiculo, placa
                    })}
                    value={veiculo.placa}
                />
                <Text style={styles.text}>Digite o Ano</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={ano => setVeiculo({
                        ...veiculo, ano
                    })}
                    value={veiculo.ano.toString()}
                    keyboardType='numeric'
                />
                <Text style={styles.text}>Digite a Mensalidade</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={mensalidade => setVeiculo({
                        ...veiculo, mensalidade
                    })}
                    value={veiculo.mensalidade}
                    keyboardType='numeric'
                />
                <Pressable
                    style={[styles.botao, {
                        backgroundColor: "#1d75cd"
                    }]}
                    onPress={handleClick} >
                    <Text style={styles.botaoText}>Alterar</Text>
                </Pressable >
            </View>
        </SafeAreaView>
    )
}