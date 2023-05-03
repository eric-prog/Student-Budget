import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
    LineChart,
} from "react-native-chart-kit";


const { height, width } = Dimensions.get('window');


class Graphs extends Component {
    constructor(props) {
        super(props);
    }

    getLabels = () => {
        const { priceObjs } = this.props;
        if (Object.keys(priceObjs).length > 0) {
            return Object.values(priceObjs).map((price) => price.textValue);
        }
        return []
    }

    getPrices = () => {
        const { priceObjs } = this.props;
        if (Object.keys(priceObjs).length > 0) {
            return Object.values(priceObjs).map((price) =>  parseInt(price.numValue));
        }
        return []
    }

    render() {
        return (
            <View>
                <LineChart
                    data={{
                        labels: this.getLabels(),
                        datasets: [
                            {
                                data: this.getPrices()
                            }
                        ]
                    }}
                    style={styles.lineGraph}
                    width={width-40}
                    height={220}
                    yAxisLabel="$"
                    yAxisInterval={1} 
                    chartConfig={{
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0,
                    decimalPlaces: 2, 
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#0CCB83"
                    }
                    }}
                    bezier
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    lineGraph: {
        fontWeight: '300',
        fontFamily: 'Inter-Black',
    }
})

export default Graphs;