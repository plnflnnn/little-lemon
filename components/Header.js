import { View, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { colors } from '../theme/colors';

const Header = ({ previewImage, screen, onBack }) => {
  const navigation = useNavigation();
  const { user } = useUser();
  const image = previewImage !== undefined ? previewImage : user.image;
  const showBack = screen === 'Profile';
  const showAvatar = screen !== 'Onboarding';

  return (
    <View style={styles.header}>
      {showBack ? (
        <Pressable
          style={styles.backBtn}
          onPress={() => {
            onBack?.();
            navigation.navigate('Home');
          }}
        >
          <Image
            source={require('../assets/images/back-arrow.png')}
            accessible
            accessibilityLabel="Back"
          />
        </Pressable>
      ) : (
        <View style={styles.sideSlot} />
      )}

      <Pressable
        style={styles.logo}
        disabled={screen === 'Onboarding'}
        onPress={() => navigation.navigate('Home')}
      >
        <Image
          source={require('../assets/images/logo.png')}
          accessible
          accessibilityLabel="Little Lemon Logo"
          style={styles.logoImg}
          resizeMode="contain"
        />
      </Pressable>

      {showAvatar ? (
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <Image
            style={styles.avatar}
            accessible
            accessibilityLabel="Profile"
            source={
              image
                ? { uri: image }
                : require('../assets/images/avatar.png')
            }
          />
        </Pressable>
      ) : (
        <View style={styles.sideSlot} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,
    height: 70,
    paddingHorizontal: 20,
  },
  sideSlot: {
    width: 50,
    height: 50,
  },
  logo: {
    flex: 1,
    height: 42,
    marginHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 25,
  },
});

export default Header;
