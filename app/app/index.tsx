import { createStackNavigator } from '@react-navigation/stack';
import ProprietarioForm from '../src/Proprietario/ProprietarioForm';
import ProprietarioList from '../src/Proprietario/ProprietarioList';
import ProprietarioEdit from '../src/Proprietario/ProprietarioEdit';
import VeiculoList from '../src/Veiculo/VeiculoList'
import VeiculoEdit from '../src/Veiculo/VeiculoEdit'
import VeiculoForm from '../src/Veiculo/VeiculoForm'
import Home from '../src/Home'
import { Icon, Button } from 'react-native-elements';
const Stack = createStackNavigator();


export default function Index() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}>
      <Stack.Screen
        name="ProprietarioList"
        component={ProprietarioList}
        options={({ navigation }) => {
          return {
            title: "Lista de Proprietários",
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("ProprietarioForm")}
                type="clear"
                icon={<Icon name="add" size={25} color="white" />}
              />
            )
          }
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Menu de Opções'
        }}
      />
      <Stack.Screen
        name="ProprietarioForm"
        component={ProprietarioForm}
        options={{
          title: 'Formulário de Proprietários'
        }}
      />
      <Stack.Screen
        name="ProprietarioEdit"
        component={ProprietarioEdit}
        options={{
          title: 'Formulário de Edição'
        }}
      />
      <Stack.Screen
        name="VeiculoList"
        component={VeiculoList}
        options={({ navigation }) => ({
          title: 'Lista de Veículos',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("VeiculoForm")}
              type="clear"
              icon={<Icon name="add" size={25} color="white" />}
            />
          )
        })}
      />
      <Stack.Screen
        name="VeiculoEdit"
        component={VeiculoEdit}
        options={{
          title: 'Editar Veículo'
        }}
      />
      <Stack.Screen
        name="VeiculoForm"
        component={VeiculoForm}
        options={{
          title: 'Cadastrar Veículo'
        }}
      />
    </Stack.Navigator>
  );
}