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
      priceValue: props.textValue,
    };
  }

  static propTypes = { // equivalent of interface using PropTypes from 'prop-types' library
    textValue: PropTypes.string.isRequired,
    deletePrice: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    completePrice: PropTypes.func.isRequired,
    updatePrice: PropTypes.func.isRequired,
  };

  finishEditing = () => {
    const { priceValue } = this.state;
    const { id, updatePrice } = this.props;
    updatePrice(id, priceValue);
    this.setState({
        isEditing: false,
      });
  };

  startEditing = () => {
    this.setState({
      isEditing: true,
    });
  };

  controlInput = (textValue) => {
    this.setState({ priceValue: textValue });
  };

  render() {
    const { isEditing, priceValue } = this.state;
    const { textValue, id, deletePrice } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          {isEditing ? (
            <TextInput
              value={priceValue}
              style={[
                styles.text,
                styles.input
              ]}
              multiline={true}
              returnKeyType={'done'}
              onBlur={this.finishEditing}
              onChangeText={this.controlInput}
            />
          ) : (
            <Text>
              {textValue}
            </Text>
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