import { View, StyleSheet, Image } from 'react-native';
import { colors } from '../theme/colors';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/little-lemon-logo.png')}
        accessible
        accessibilityLabel="Little Lemon Logo"
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
});

export default Splash;
