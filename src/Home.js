import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const Home = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [message, setMessage] = useState('');
  const [modalType, setModalType] = useState(''); // 'success', 'error', or 'confirm'

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://192.168.38.156:5000/todos');
      if (response.ok) {
        const todos = await response.json();
        setTodoList(todos);
      } else {
        console.error('Failed to fetch todos');
      }
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      if (todo.trim() === '') {
        setMessage('Please enter a todo first.');
        setModalType('error');
        setModalVisible(true);
        return;
    }
        const response = await fetch('http://192.168.38.156:5000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo }),
        });

        if (response.ok) {
            await fetchTodos(); 
            setTodo(''); 
            setMessage('Todo added successfully');
            setModalType('success');
            setModalVisible(true);
        } else {
            setMessage('Failed to add todo');
            setModalType('error');
            setModalVisible(true);
        }
    } catch (error) {
        setMessage('Failed to add todo');
        setModalType('error');
        setModalVisible(true);
    }
  };

  const updateTodo = async (index) => {
    try {
      const response = await fetch(`http://192.168.38.156:5000/todos/${todoList[index]._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo }),
      });

      if (response.ok) {
        await fetchTodos(); // Reload todos
        setTodo('');
        setEditIndex(null);
        setMessage('Todo updated successfully');
        setModalType('success');
        setModalVisible(true);
      } else {
        setMessage('Failed to update todo');
        setModalType('error');
        setModalVisible(true);
      }
    } catch (error) {
      setMessage('Failed to update todo');
      setModalType('error');
      setModalVisible(true);
    }
  };

  const handleDelete = (index) => {
    setTodoToDelete(index);
    setMessage('Are you sure you want to delete this todo?');
    setModalType('confirm');
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://192.168.38.156:5000/todos/${todoList[todoToDelete]._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchTodos(); // Reload todos
        setModalVisible(false);
        setTodoToDelete(null);
        setMessage('Todo deleted successfully');
        setModalType('success');
        setModalVisible(true);
      } else {
        setMessage('Failed to delete todo');
        setModalType('error');
        setModalVisible(true);
      }
    } catch (error) {
      setMessage('Failed to delete todo');
      setModalType('error');
      setModalVisible(true);
    }
  };

  const cancelDelete = () => {
    setModalVisible(false);
    setTodoToDelete(null);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setMessage('');
    setModalType('');
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
      <Button
        title={editIndex !== null ? 'Update Todo' : 'Add Todo'}
        onPress={editIndex !== null ? () => updateTodo(editIndex) : addTodo}
      />
      <FlatList
        data={todoList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.todoContainer}>
            <Text style={styles.todoText}>{item.todo}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => {
                setEditIndex(index);
                setTodo(todoList[index].todo);
              }} style={styles.editButton}>
                <Text style={styles.buttonText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Success/Error/Confirmation Modal */}
      <Modal isVisible={isModalVisible} onBackdropPress={handleCloseModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{message}</Text>
          {modalType === 'confirm' && (
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={cancelDelete} />
              <View style={styles.buttonSpacer} />
              <Button title="OK" onPress={confirmDelete} />
            </View>
          )}
          {modalType !== 'confirm' && (
            <Button title="OK" onPress={handleCloseModal} />
          )}
        </View>
      </Modal>
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
    flexShrink: 1,  
    marginRight: 10,
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
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center' 
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
  },
  buttonSpacer: {
    marginHorizontal: 10,
  },
});

export default Home;
