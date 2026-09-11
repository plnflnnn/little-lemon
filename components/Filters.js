import { TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filtersContainer}
    >
      {sections.map((section, index) => {
        const selected = selections[index];
        return (
          <TouchableOpacity
            key={section}
            onPress={() => onChange(index)}
            style={[styles.chip, selected ? styles.chipSelected : styles.chipIdle]}
          >
            <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
              {section}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  chip: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  chipIdle: {
    backgroundColor: colors.grey,
  },
  chipText: {
    fontWeight: '600',
    color: colors.primary,
  },
  chipTextSelected: {
    color: colors.white,
  },
});

export default Filters;
