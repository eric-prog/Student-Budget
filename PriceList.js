import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
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
    const { textValue, numValue, id, deletePrice } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          {isEditing ? (
            <View>
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
            <View>
              <Text>
                {textValue}
              </Text>
              <Text>
                {numValue}
              </Text>
            </View>
          )}
        </View>

          <View style={styles.buttons}>
            <TouchableOpacity onPressOut={this.finishEditing}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Finish</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity onPressOut={this.startEditing}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Edit</Text>
              </View>
            </TouchableOpacity>
          </View>
        <TouchableOpacity onPressOut={() => deletePrice(id)}>
            <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Delete</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },

  input: {
    marginVertical: 15,
    width: width / 2,
    paddingBottom: 5,
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 20,
  },
  // Styles
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    // remove borderColor property from here
    borderWidth: 3,
    marginRight: 20,
  },
  completeCircle: {
    borderColor: '#bbb',
  },
  incompleteCircle: {
    borderColor: '#DA4453',
  },

  rowContainer: {
    flexDirection: 'row',
    width: width / 2,
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

  // Styles

  strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  unstrikeText: {
    color: '#29323c',
  },
});

export default PriceList;