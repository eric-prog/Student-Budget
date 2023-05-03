import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'uuid';
import PriceList from './PriceList';
import Graphs from './LineGraph';
import * as Font from 'expo-font';


const { height, width } = Dimensions.get('window');


let customFonts = {
  'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  'Inter-SemiBoldItalic': 'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12',
};


export default class App extends Component {

  state = {
    newPriceItem: '',
    newPriceVal: 0,
    dataIsReady: false,
    prices: {}, 
    fontsLoaded: false,
  };
  
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount = () => {
    this._loadFontsAsync();
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
  
  formatDate = () => {
    const date = new Date().toISOString()
    return date.substring(0, date.indexOf("T"));
  }

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
            createdAt: this.formatDate(),
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
    const { newPriceItem, newPriceVal, dataIsReady, fontsLoaded, prices } = this.state;

    if (!dataIsReady) {
      return <ActivityIndicator />;
    }

    if (!fontsLoaded) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>Student Budget 📈</Text>
        <Graphs priceObjs={prices} />
        <View style={styles.card}>
          <View style={styles.inputCard}>
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
          </View>
          <Text style={styles.history}>Price History 💰</Text>
          <ScrollView contentContainerStyle={styles.card}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    width: width
  },
  appTitle: {
    color: '#000',
    fontSize: 36,
    marginTop: 60,
    marginBottom: 60,
    fontWeight: '300',
    textAlign: 'center',
    fontFamily: 'Inter-Black',
  },
  history: {
    color: '#000',
    fontSize: 30,
    marginTop: 60,
    marginBottom: 30,
    fontWeight: '300',
    textAlign: 'center',
    fontFamily: 'Inter-Black',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    marginBottom: 15
  },
  input: {
    padding: 20,
    fontSize: 20,
    outlineStyle: 'none'
  },
  inputCard: {
    backgroundColor: '#E2E2E2',
    width: width-40,
    borderRadius: 15,
    marginTop: 20
  }
});