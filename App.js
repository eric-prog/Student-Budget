import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'uuid';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');

import TodoList from './TodoList';

export default class App extends Component {
  state = {
    newTodoItem: '',
    dataIsReady: false,
    todos: {}, // add this
  };
  newTodoItemController = (textValue) => {
    this.setState({
      newTodoItem: textValue,
    });
    console.log('data', this.state);
  };
  componentDidMount = () => {
    this.loadTodos();
  };

  loadTodos = async () => {
    try {
      const getTodos = await AsyncStorage.getItem('todos');
      const parsedTodos = JSON.parse(getTodos);
      this.setState({ dataIsReady: true, todos: parsedTodos || {} });
    } catch (err) {
      console.log(err);
    }
  };

  saveTodos = (newToDos) => {
    AsyncStorage.setItem('todos', JSON.stringify(newToDos));
  };
  addTodo = () => {
    const { newTodoItem } = this.state;

    if (newTodoItem !== '') {
      this.setState((prevState) => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            textValue: newTodoItem,
            createdAt: Date.now(),
          },
        };
        const newState = {
          ...prevState,
          newTodoItem: '',
          todos: {
            ...prevState.todos,
            ...newToDoObject,
          },
        };

        this.saveTodos(newState.todos); // add this
        return { ...newState };
      });
    }
  };

  deleteTodo = (id) => {
    this.setState((prevState) => {
      const todos = prevState.todos;
      delete todos[id];
      const newState = {
        ...prevState,
        ...todos,
      };
      this.saveTodos(newState.todos); // add this
      return { ...newState };
    });
  };

  inCompleteTodo = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: false,
          },
        },
      };
      this.saveTodos(newState.todos); // add this
      return { ...newState };
    });
  };

  completeTodo = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: true,
          },
        },
      };
      this.saveTodos(newState.todos); // add this
      return { ...newState };
    });
  };
  updateTodo = (id, textValue) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            textValue: textValue,
          },
        },
      };
      this.saveTodos(newState.todos); // add this
      return { ...newState };
    });
  };
  render() {
    const { newTodoItem, dataIsReady, todos } = this.state;

    if (!dataIsReady) {
      return <ActivityIndicator />;
    }

    return (
      <LinearGradient style={styles.container} colors={['#DA4453', '#89216B']}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.appTitle}>Todo App{'\n'}Using AsyncStorage</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={'Add an item!'}
            value={newTodoItem}
            onChangeText={this.newTodoItemController}
            placeholderTextColor={'#999'}
            returnKeyType={'done'}
            autoCorrect={false}
            onSubmitEditing={this.addTodo}
          />
          <ScrollView contentContainerStyle={styles.listContainer}>
            {Object.values(todos).map((todo) => (
              <TodoList
                key={todo.id}
                {...todo}
                deleteTodo={this.deleteTodo}
                inCompleteTodo={this.inCompleteTodo}
                completeTodo={this.completeTodo}
                updateTodo={this.updateTodo} // add this
              />
            ))}
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f23657',
  },
  appTitle: {
    color: '#fff',
    fontSize: 36,
    marginTop: 60,
    marginBottom: 30,
    fontWeight: '300',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24,
  },
  listContainer: {
    alignItems: 'center',
  },
});