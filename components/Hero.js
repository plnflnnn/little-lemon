import { View, Image, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

const Hero = () => {
  return (
    <View style={styles.hero}>
      <View style={styles.left}>
        <Text style={styles.title}>Little Lemon</Text>
        <Text style={styles.subtitle}>Chicago</Text>
        <Text style={styles.text}>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </Text>
      </View>
      <Image
        style={styles.image}
        source={require('../assets/images/hero.jpg')}
        accessible
        accessibilityLabel="Little Lemon restaurant"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: 16,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    color: colors.yellow,
    fontSize: 36,
    fontFamily: fonts.markazi,
  },
  subtitle: {
    fontFamily: fonts.markazi,
    fontSize: 24,
    color: colors.white,
  },
  text: {
    fontFamily: fonts.karla,
    fontSize: 16,
    fontWeight: '400',
    color: colors.white,
    marginTop: 16,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'cover',
    borderRadius: 16,
  },
});

export default Hero;
