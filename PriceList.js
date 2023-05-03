import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image
} from 'react-native';
import PropTypes from 'prop-types';


const { height, width } = Dimensions.get('window');


class PriceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      priceText: props.textValue,
      priceNum: props.numValue,
    };
  }

  static propTypes = { 
    textValue: PropTypes.string.isRequired,
    numValue: PropTypes.string.isRequired,
    deletePrice: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    completePrice: PropTypes.func.isRequired,
    updatePrice: PropTypes.func.isRequired,
  };

  finishEditing = () => {
    const { priceText, priceNum } = this.state;
    const { id, updatePrice } = this.props;
    updatePrice(id, priceText, priceNum);
    this.setState({
        isEditing: false,
    });
  };

  startEditing = () => {
    this.setState({
      isEditing: true,
    });
  };

  controlTextInput = (textValue) => {
    this.setState({ priceText: textValue });
  };
  controlNumInput = (numValue) => {
    this.setState({ priceNum: numValue });
  };

  render() {
    const { isEditing, priceText, priceNum } = this.state;
    const { textValue, createdAt, numValue, id, deletePrice } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          {isEditing ? (
            <View style={styles.textWrapper}>
              <TextInput
                value={priceText}
                style={[
                  styles.text,
                  styles.input
                ]}
                multiline={true}
                returnKeyType={'done'}
                onBlur={this.finishEditing}
                onChangeText={this.controlTextInput}
              />
              <TextInput
                value={priceNum}
                style={[
                  styles.text,
                  styles.input
                ]}
                multiline={true}
                returnKeyType={'done'}
                onBlur={this.finishEditing}
                onChangeText={this.controlNumInput}
              />
            </View>
          ) : (
            <View style={styles.textWrapper}>
              <Text style={styles.textValue}>
                {textValue}
              </Text>
              <Text style={styles.priceValue}>
                ${numValue}
              </Text>
              <Text style={styles.dateValue}>
                {createdAt}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.btnWrapper}> 
          <View style={styles.buttons}>
            <TouchableOpacity onPressOut={this.finishEditing}>
              <View style={styles.buttonContainer}>
                <Image source={require('./assets/check.png')} style={styles.icon}/>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity onPressOut={this.startEditing}>
              <View style={styles.buttonContainer}>
                <Image source={require('./assets/edit.png')} style={styles.icon}/>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPressOut={() => deletePrice(id)}>
            <View style={styles.buttonContainer}>
              <Image source={require('./assets/trash.png')} style={styles.icon}/>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E2E2E2',
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 12,
  },
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 23,
    height: 23
  },  
  input: {
    marginVertical: 15,
    width: (width / 2)-20,
    padding: 8,
    paddingBottom: 5,
    outlineStyle: 'none',
    backgroundColor: '#D0D0D0',
    borderRadius: 5,
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    width: (width / 2)-40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FF0000'
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },  
  textValue: {
    fontSize: 30,
    marginBottom: 18,
  },
  priceValue: {
    backgroundColor: '#2E2E2E',
    borderRadius: 6,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 25,
    marginBottom: 10,
    color: '#1EE3AD'
  },
  dateValue: {
    backgroundColor: '#2E2E2E',
    borderRadius: 6,
    padding: 5,
    fontSize: 14,
    color: '#E6CF12',
    paddingLeft: 15,
    paddingRight: 15,
  }
});

export default PriceList;