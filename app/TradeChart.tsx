import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

const TradeChart = (props: any) => {
  // Example data for the chart (could represent stock prices, etc.)
  const data = [50, 10, 40, 95, 85, 35, 40];
  const contentInset = { top: 0, bottom: 0 };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', height: props.height, width: props.width }}>
        {/* LineChart without axes */}
        <LineChart
          style={{ flex: 1 }}
          data={data}
          svg={{ stroke: 'rgb(134, 65, 244)', strokeWidth: 2 }}
          contentInset={contentInset}
        >
          <Defs>
            {/* Optional gradient for the line */}
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="rgb(134, 65, 244)" stopOpacity="0.8" />
              <Stop offset="100%" stopColor="rgb(66, 194, 255)" stopOpacity="0.8" />
            </LinearGradient>
          </Defs>
        </LineChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default TradeChart;
