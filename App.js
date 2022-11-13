import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';



import { Separator } from './components/Separator'
import { EmptyList } from './components/EmptyList'
import { ListItem } from './components/ListItem'



export default function App() {
  // state to keep items
  const [items, setItems] = useState([])
  const [itemName, setItemName] = useState()
  const [totalNum, setTotalNum] = useState(0)
  const [startup, setStartup] = useState(true)



  useEffect(() => {
    if (startup === true) {
      readItems()
      setStartup(false)
    }
  }, [startup])

  useEffect(() => {
    if (items.length >= 0 && startup === false) {
      saveItems()
    }
  }, [items])


  const renderer = ({ item }) => (
    <ListItem
      name={item.name}
      id={item.id}
      completed={item.completed}
      update={itemUpdate}
      delete={itemDelete}
    />
  )

  // function to sort items in chronological order
  const sortItems = () => {
    let data = items
    data.sort((item1, item2) => {
      if (item1.id > item2.id) {
        return 1
      }
      if (item1.id < item2.id) {
        return -1
      }
      else {
        return 0
      }
    })
    setItems([...data])
  }


  // function to read items from storage
  const readItems = async () => {
    // console.log('loading data...')
    let data = await AsyncStorage.getItem('ListData')
    data = (data !== null) ? JSON.parse(data) : []
    setItems(data)
  }


  // function to save items into storage
  const saveItems = async () => {
    // console.log('saving items...')
    const data = JSON.stringify(items)
    // use asyncstorage to store data
    try {
      await AsyncStorage.setItem('ListData', data)
    }
    catch (error) {
      console.log(error)
    }
  }


  //Add function
  const pressHandler = () => {
    //Validation
    if (itemName.trim().length !== 0) {
      let newItem = {
        name: itemName,
        id: new Date().getTime(),
        completed: false
      }
      // sort the items chronologically
      setItems(items.concat(newItem))
      setItemName('')

      //Count number of the list 
      setTotalNum(totalNum + 1)
    }
    else {
      Alert.alert('Error', 'Invalid entry')
    }
  }

  //Update function
  const itemUpdate = (id) => {
    //console.log( id )
    // copy the items array into arr
    let arr = items
    arr.forEach((item) => {
      if (item.id === id) {
        item.completed = true
      }
    })
    // ...arr converts [ 0, 1, 2, 3] to 0,1,2,3
    // react will only update a state if you pass a new array
    setItems([...arr])
  }

  //Delete function
  const itemDelete = (id) => {
    //console.log( id )
    //create a copy of items
    let arr = items
    let toKeep = arr.filter((item) => {
      if (item.id !== id) {
        return item
      }
    })
    setItems([...toKeep])
    //Decrement the number of list
    setTotalNum(totalNum - 1)
  }

  //All clear list function
  const clearItems = () => {
    Alert.alert("Are you sure?", "Delete all lists?", [
      {
        text: 'Yes',
        onPress: () => {setItems([]); setTotalNum(totalNum == 0)},
      },
      { text: 'No' },
    ]);
  };


  //UI
  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.title}>TODO LIST : {totalNum}</Text>

        <TouchableOpacity style={styles.allClearButton} onPress={clearItems}>
          <Image style={styles.delIcon}
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAZUlEQVRIiWNgGCmggYGB4T8a7iBGIyMWsf8UOgbFTCYKDSMbwIKBYvU09wGxFqC7kGgfDhofjFowasGoBRQAFiLVoRfr2Ip5rGDAgugplEavxXBhZD1EAT8GBoYnJFjwBKpnGAIAUcAmPA1WYN0AAAAASUVORK5CYII=',
            }} />
        </TouchableOpacity>

      </View>

      <FlatList
        data={items}
        renderItem={renderer}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={EmptyList}
        style={styles.list}
      />

      <View style={styles.inputGroup} >

        <TouchableOpacity style={styles.addButton} onPress={pressHandler}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.todoInput}
          placeholder='Write a to do'
          value={itemName}
          id="itemName"
          name="itemName"
          onChangeText={(txtvalue) => setItemName(txtvalue)}
        />

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A0E7E5',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingVertical: 30,
  },
  allClearButton: {
    justifyContent: 'center',
  },
  delIcon: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  inputGroup: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
  todoInput: {
    fontSize: 20,
    backgroundColor: '#eeeeee',
    alignSelf: 'stretch',
    color: '#616161',
    padding: 40,
    paddingTop: 40,
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },
  addButton: {
    backgroundColor: '#EDAEC0',
    width: 90,
    height: 90,
    borderRadius: 50,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    marginBottom: -45,
    zIndex: 10,
  },
  addButtonText: {
    color: '#eeeeee',
    fontSize: 30,
    padding: 10,
  },
  list: {
    flex: 1,
    marginBottom: 120,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
