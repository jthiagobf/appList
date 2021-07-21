import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, 
  TouchableOpacity, FlatList, keyboardAvoidingView, 
  Platform, Keyboard, Alert, AsyncStorage } from 'react-native';

import {Ionicons, MaterialIcons} from "@expo/vector-icons"
export default function App() {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState('');
  
  
  async function addTask(){
   
    if (newTask === ''){
     Alert.alert('pra quê adicionar lembretes vazios? não seja cuck!');
     return;
    }
   
    const search = task.filter(task => task === newTask);
   if (search.length != 0){
Alert.alert('você já adicionou essa tarefa!');
return
   }
    setTask([ ... task, newTask]);
   setNewTask('');
   Keyboard.dismiss();
 
  }
  
  async function removeTask(item){
    Alert.alert(
      'Deletar lembrete',
      'tem certeza que quer deletar?',
      [
        {
          text: 'cancel',
          onPress: () => {
            return;
          },
       style: 'cancel'
        },
        {
          text: 'Ok',
          onPress: () => setTask(task.filter(tasks => tasks != item))
        }
      ],
    {cancelable: false}
      );
    
  }
  
useEffect(()=> {

  async function carregaDados(){
    const task = await AsyncStorage.getItem('task');
    if(task){
      setTask(JSON.parse(task));
    }

  }
carregaDados();
}, [])

  useEffect(() => {
async function salvaDados(){
  AsyncStorage.setItem('task', JSON.stringify(task))

}
salvaDados();  
}, [task]);
  
  return (
    <>
    
    <View style={styles.container}>
      <View style={styles.Body}>
      <Text>Olá! adicione abaixo quantos lembretes achar necessário!</Text>
      <FlatList style={styles.FlatList}
      data={task}
      keyExtractor={item => item.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <View style={styles.ContainerView}>
          <Text style={styles.Texto}>{item}</Text>
        <TouchableOpacity onPress={() => removeTask(item)}>
         <MaterialIcons name="delete-forever" size={35} color="black" />

        </TouchableOpacity>
        </View>
      )}

      />
      </View>
      <View style={styles.Form}>
<TextInput 
style={styles.Input} 
placeholderTextColor='#999'
autoCorrect={false}
placeholder='Adicione um lembrete'
maxLength={25}
onChangeText={text =>setNewTask(text)}
value={newTask}
/>

<TouchableOpacity style={styles.Button} onPress={() => addTask()}>
<Ionicons name="ios-add-circle-outline" size={40} color="white" />

</TouchableOpacity>

  </View>
      
      <StatusBar style="auto" />
    </View>
    
  
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
  },
Body: {
  flex: 1,
},
Form: {

  padding: 0,
  height: 60,
  justifyContent: "center",
  alignSelf: "stretch",
  flexDirection: "row",
  paddingTop: 13,
  borderTopWidth: 1,
  borderColor: "#eee",
  backgroundColor: 'white',
},
Input: {
  flex: 1,
  height: 40,
  backgroundColor: "#eee",
  borderTopEndRadius: 4,
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderWidth: 1,
  borderColor: "#eee",

},

Button: {
  height: 40,
  width: 40,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#1c6cce",
  borderRadius: 4,
  marginLeft: 10,

},

FlatList: {
flex: 1,
marginTop: 5
},

ContainerView: {
  marginBottom: 15,
  padding: 15,
  borderRadius: 4,
  backgroundColor: '#eee',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderWidth: 1,
  borderColor: '#eee'

},

Texto: {

  fontSize: 14,
  color: '#333',
  fontWeight: 'bold',
  marginTop: 4,
  textAlign: 'center'
},

});
