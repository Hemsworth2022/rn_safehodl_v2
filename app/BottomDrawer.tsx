import * as React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Appbar, FAB, useTheme, Text, Button, IconButton, MD3Colors } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TradeChart from './TradeChart';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from 'react';
const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

const BottomDrawer = (props: any) => {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const sheetRef = useRef<BottomSheet>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const snapPoints = useMemo(() => ["100%"], []);

  // callbacks
  const handleSheetChange = useCallback((index: any) => {
    console.log("handleSheetChange", index);
  }, []);



  const closeBottomSheet = () => {

    setIsVisible(false);
    // setTimeout(() => {
    sheetRef?.current?.close();
    // }, 100);
  }

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>

      <Appbar
        style={[
          styles.bottom,
          {
            height: BOTTOM_APPBAR_HEIGHT + bottom,
            backgroundColor: theme.colors.elevation.level2,
          },
        ]}
        safeAreaInsets={{ bottom }}
      // elevated={true}
      >
        {/* <Appbar.Content 
                title={
                    
                }
            /> */}
        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.headerTitle}>{`Current ${props.title} price`}</Text>
            <Text style={styles.headerSubtitle}>
              $7.727 <Text style={{ color: 'green', fontWeight: '600' }}>+0.09%</Text>
            </Text>
          </View>
          <TradeChart height={25} width={75} />
          {/* <Text style={styles.headerTitle}>{`Current ${props.title} price`}</Text> */}
        </View>
        <FAB
          mode="flat"
          size="small"
          icon="chevron-up"
          onPress={() => {
            if (sheetRef.current) {
              sheetRef.current.expand(); // Open the bottom sheet
              setIsVisible(true);
            }

          }}
          style={[
            styles.fab,
            { top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },
          ]}
        />
      </Appbar>
      {isVisible && (
        <TouchableWithoutFeedback onPress={() => null}>
          <View style={styles.blocker} />
        </TouchableWithoutFeedback>
      )}
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        style={{ zIndex: 1000 }}
      >
        <View style={{ padding: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <Text>{`Current ${props.title} Price`}</Text>
          <IconButton
            icon="close"
            iconColor={MD3Colors.primary0}
            // animated={true}
            size={20}
            mode="contained-tonal"
            onPress={closeBottomSheet}
          />
        </View>
        <TradeChart height="100%" width="auto" />

      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
    height: '100%',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row', // Apply flexDirection: 'row' here
    // justifyContent: 'space-between', // Optional, if you want spacing between items
    // alignItems: 'center', // Vertically align items to the center
    flex: 1, // Ensure it takes up the available space
    padding: 5
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
  },
  blocker: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: '#00000046',  // Blocks the background without showing a backdrop
  },
  bottom: {
    backgroundColor: 'grey',
    position: 'absolute',
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
    padding: 5,
    left: 0,
    right: 0,
    bottom: 0
  },
  fab: {
    position: 'absolute',
    right: 16,
  },
});

export default BottomDrawer;
