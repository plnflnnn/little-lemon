import { View, TouchableOpacity, Text, StyleSheet , ScrollView} from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <ScrollView horizontal  showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onChange(index);
          }}
          style={{
            width: '35%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginRight: 10,
            marginTop: 10,
            marginLeft: 20,
            backgroundColor: selections[index] ? '#495E57' : '#EDEFEE',
            borderWidth: 1,
            borderColor: '495E57',
            borderRadius: 20,
          }}>
          <View>
            <Text style={{ fontWeight: 600, color: selections[index] ? 'white' : '#495E57' }}>
              {section}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 16,

  },
});

export default Filters;
