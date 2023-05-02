import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
    LineChart,
    // BarChart,
    // PieChart,
    // ProgressChart,
    // ContributionGraph,
    // StackedBarChart
} from "react-native-chart-kit";


const { height, width } = Dimensions.get('window');


class LineGraph extends Component {
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
                    width={width}
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} 
                    chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, 
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
        );
    }
}


export default LineGraph;