import { useState } from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { colors } from '../theme/colors';
import { DEFAULT_AVATAR, getAvatarSource } from '../utils/avatar';

const Header = ({ previewImage, onBack }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useUser();
  const isOnboarding = route.name === 'Onboarding';
  const isProfile = route.name === 'Profile';
  const imageUri = previewImage !== undefined ? previewImage : user.image;
  const [failedUri, setFailedUri] = useState(null);
  const avatarSource =
    imageUri && imageUri !== failedUri
      ? getAvatarSource(imageUri)
      : DEFAULT_AVATAR;

  return (
    <View style={styles.header}>
      {isProfile ? (
        <Pressable
          style={styles.sideButton}
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
        disabled={isOnboarding}
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

      {isOnboarding ? (
        <View style={styles.sideSlot} />
      ) : (
        <Pressable
          style={styles.sideSlot}
          onPress={() => navigation.navigate('Profile')}
        >
          <Image
            style={styles.avatar}
            accessible
            accessibilityLabel="Profile"
            resizeMode="cover"
            source={avatarSource}
            onError={() => {
              if (imageUri) {
                setFailedUri(imageUri);
              }
            }}
          />
        </Pressable>
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
    overflow: 'hidden',
  },
  sideSlot: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    minWidth: 0,
    height: 42,
    marginHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoImg: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.grey,
  },
});

export default Header;
