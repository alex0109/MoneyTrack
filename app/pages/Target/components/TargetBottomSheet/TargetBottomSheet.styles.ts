import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const radius = PixelRatio.roundToNearestPixel(90);

export const styles = StyleSheet.create({
  donutContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  donutChartContainer: {
    height: radius * 2,
    width: radius * 2,
  },
  completeResultContainer: {
    marginTop: 10,
  },
  completeResultText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'column',
  },
  header: {
    height: height * 0.2,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'NotoSans-Bold',
    textAlign: 'center',
  },
  subTitleContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  subTitle: {
    fontSize: 20,
    fontFamily: 'NotoSans-Bold',
    textAlign: 'center',
    marginLeft: '1%',
    marginRight: '1%',
  },
  content: {
    height: '100%',
    width: width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },
  belt: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    padding: 5,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
