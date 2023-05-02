import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import {Svg, Circle, Polygon, Polyline, Path, Rect, G} from 'react-native-svg'


const { height, width } = Dimensions.get('window');


class LineGraph extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//     //   isEditing: false,
//     //   priceValue: props.textValue,
//     };
//   }

//   static propTypes = { // equivalent of interface using PropTypes from 'prop-types' library
//     textValue: PropTypes.string.isRequired,
//     deletePrice: PropTypes.func.isRequired,
//     id: PropTypes.string.isRequired,
//     completePrice: PropTypes.func.isRequired,
//     updatePrice: PropTypes.func.isRequired,
//   };

  render() {
    return (
        <View>
            <LineChart
                data={{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                    data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                    ]
                    }
                ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
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