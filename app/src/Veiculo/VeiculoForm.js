import { View, Text, SafeAreaView, TextInput, Pressable, Keyboard } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import React, { useEffect, useState } from "react";
import {URL} from '../Const'
import axios from "axios";
import styles from './styles.js';
export default function VeiculoForm() {
    //Variáveis state
    const [veiculo, setVeiculo] = useState({})
    const [proprietarios, setProprietarios] = useState([]);
    const fetchAllProprietarios = async () => {
        try {
            const res = await axios.get(`${URL}/proprietario`);
            const mapProprietarios = res.data.map(p => ({
                label: p.nome, value: p.id_proprietario
            }));
            setProprietarios(mapProprietarios);
            Keyboard.dismiss();
        } catch (err) {
            console.error(err);
        }
    };
    //Função que inicia a listagem ao abrir o App
    useEffect(() => {
        fetchAllProprietarios();
    }, []);
    //Função que Cadastra os dados utilizando a API
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            console.log(veiculo)
            await axios.post(`${URL}/veiculo`, veiculo);
            navigation.navigate('VeiculoList');
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.text}>Digite a Placa</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={placa => setVeiculo({
                        ...veiculo, placa
                    })}
                />
                <Text style={styles.text}>Digite o Ano</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={ano => setVeiculo({
                        ...veiculo, ano
                    })}
                    keyboardType='numeric'
                />
                <Text style={styles.text}>Digite a Mensalidade</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={mensalidade => setVeiculo({
                        ...veiculo, mensalidade
                    })}
                    keyboardType='numeric'
                />
                <Text style={styles.text}>Proprietário</Text>
                <RNPickerSelect
                    onValueChange={(id_proprietario) => setVeiculo({
                        ...veiculo, id_proprietario
                    })}
                    items={proprietarios}
                    placeholder={{ label: "Selecione um proprietário", value: null }}
                />
            </View>
            <View style={styles.areaBtn}>
                <Pressable
                    style={[styles.botao, {
                        backgroundColor: "#1d75cd"
                    }]}
                    onPress={handleClick} >
                    <Text style={styles.botaoText}>Cadastrar</Text>
                </Pressable >
            </View>
        </SafeAreaView>
    )
};
