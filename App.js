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
import PriceList from './PriceList';
import LineGraph from './LineGraph';


const { height, width } = Dimensions.get('window');


export default class App extends Component {

  state = {
    newPriceItem: '',
    newPriceVal: 0,
    dataIsReady: false,
    prices: {}, 
  };

  componentDidMount = () => {
    this.loadprices();
  };
  loadprices = async () => {
    try {
      const getprices = await AsyncStorage.getItem('prices');
      const parsedprices = JSON.parse(getprices);
      this.setState({ dataIsReady: true, prices: parsedprices || {} });
    } catch (err) {
      console.log(err);
    }
  };


  newPriceItemController = (textValue) => {
    this.setState({ newPriceItem: textValue });
  };
  newPriceValController = (numValue) => {
    this.setState({ newPriceVal: numValue });
  };
  saveprices = (newprices) => {
    AsyncStorage.setItem('prices', JSON.stringify(newprices));
  };
  
  addPrice = () => {
    const { newPriceItem, newPriceVal } = this.state;

    if (newPriceItem !== '') {
      this.setState((prevState) => {
        const ID = uuidv1();
        const newPriceObject = {
          [ID]: {
            id: ID,
            textValue: newPriceItem,
            numValue: newPriceVal,
            createdAt: Date.now(),
          },
        };
        const newState = {
          prices: {
            ...prevState.prices,
            ...newPriceObject,
          },
        };

        this.saveprices(newState.prices); 
        return { ...newState };
      });
    }
  };

  deletePrice = (id) => {
    this.setState((prevState) => {
      const prices = prevState.prices;
      delete prices[id];
      const newState = {
        ...prevState,
        ...prices,
      };
      this.saveprices(newState.prices); 
      return { ...newState };
    });
  };

  completePrice = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        prices: {
          ...prevState.prices,
          [id]: {
            ...prevState.prices[id]
          },
        },
      };
      this.saveprices(newState.prices); 
      return { ...newState };
    });
  };

  updatePrice = (id, textValue, numValue) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        prices: {
          ...prevState.prices,
          [id]: {
            ...prevState.prices[id],
            textValue: textValue,
            numValue: numValue,
          },
        },
      };
      this.saveprices(newState.prices); // add this
      return { ...newState };
    });
  };
  
  render() {
    const { newPriceItem, newPriceVal, dataIsReady, prices } = this.state;

    if (!dataIsReady) {
      return <ActivityIndicator />;
    }

    return (
      <LinearGradient style={styles.container} colors={['#DA4453', '#89216B']}>
        <LineGraph priceObjs={prices} />
        <StatusBar barStyle="light-content" />

        <Text style={styles.appTitle}>Price App{'\n'}Using AsyncStorage</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={'Add an item!'}
            value={newPriceItem}
            onChangeText={this.newPriceItemController}
            placeholderTextColor={'#999'}
            returnKeyType={'done'}
            autoCorrect={false}
            onSubmitEditing={this.addPrice}
          />

          <TextInput
            style={styles.input}
            placeholder={'Add an item!'}
            value={newPriceVal}
            onChangeText={this.newPriceValController}
            placeholderTextColor={'#999'}
            returnKeyType={'done'}
            autoCorrect={false}
            onSubmitEditing={this.addPrice}
          />

          <ScrollView contentContainerStyle={styles.listContainer}>
            {Object.values(prices).map((price) => (
              <PriceList
                key={price.id}
                {...price}
                deletePrice={this.deletePrice}
                completePrice={this.completePrice}
                updatePrice={this.updatePrice} 
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