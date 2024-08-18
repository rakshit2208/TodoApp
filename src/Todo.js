import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Todo = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos) {
        setTodoList(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Failed to load todos.', error);
    }
  };

  const saveTodos = async (todos) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos.', error);
    }
  };

  const addTodo = () => {
    if (editIndex !== null) {
      const updatedTodos = [...todoList];
      updatedTodos[editIndex] = todo;
      setTodoList(updatedTodos);
      saveTodos(updatedTodos);
      setEditIndex(null);
    } else {
      const newTodos = [...todoList, todo];
      setTodoList(newTodos);
      saveTodos(newTodos);
    }
    setTodo('');
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setTodo(todoList[index]);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todoList.filter((_, i) => i !== index);
    setTodoList(updatedTodos);
    saveTodos(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Todo"
        value={todo}
        onChangeText={setTodo}
      />
      <Button title={editIndex !== null ? 'Update Todo' : 'Add Todo'} onPress={addTodo} />
      <FlatList
        data={todoList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.todoContainer}>
            <Text style={styles.todoText}>{item}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => editTodo(index)} style={styles.editButton}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(index)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoText: {
    fontSize: 18,
  },
  actions: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 10,
    padding: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  deleteButton: {
    padding: 5,
    backgroundColor: '#F44336',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Todo;
