import { View, Text, SafeAreaView, Keyboard, FlatList } from 'react-native'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from '../Const.js';
import { Button, Icon, ListItem } from "react-native-elements";
import styles from './styles.js';
export default ({ route, navigation }) => {
    //Variável que recebe os dados da API
    const [veiculos, setVeiculos] = useState([]);
    const [reload, setReload] = useState(false);
    //Função que Deleta os dados utilizando a API
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}/veiculo/${id}`);
            setReload(!reload)
        } catch (err) {
            console.error(err);
        }
    };
    //Função que Lista os dados utilizando a API
    const fetchAll = async () => {
        try {
            const res = await axios.get(`${URL}/veiculo`);
            setVeiculos(res.data);
            Keyboard.dismiss();
        } catch (err) {
            console.error(err);
        }
    };
    //Função que inicia a listagem ao abrir o App
    useEffect(() => {
        console.log('fetch veiculos');
        fetchAll();
    }, [reload]);
    //Função para criar os botões Deletar e Editar na Função Lustagem
    function getActions(data) {
        return (
            <>
                <Button
                    onPress={() => navigation.navigate('VeiculoEdit', data)}
                    type="clear"
                    icon={<Icon name="edit" size={25} color="orange" />}
                />
                <Button
                    onPress={() => handleDelete(data.id_veiculo)}
                    type="clear"
                    icon={<Icon name="delete" size={25} color="red" />}
                />
            </>
        );
    }
    //Função que preenche a Lista e Joga no FlatList
    function Listagem({ data }) {
        return (
            <ListItem bottomDivider >
                <ListItem.Content>
                    <ListItem.Title>{`${data.placa} | ${data.ano}`}</ListItem.Title>
                    <ListItem.Subtitle>{data.proprietario.nome}</ListItem.Subtitle>
                </ListItem.Content>
                {getActions(data)}
            </ListItem>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.text}>Listando os Dados</Text>
            </View>
            <FlatList
                keyExtractor={item => item.id}
                data={veiculos}
                renderItem={({ item }) => (<Listagem data={item} />)}
            />
        </SafeAreaView>
    )
}