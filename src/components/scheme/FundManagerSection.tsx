import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { SchemeDetails } from '@/types/scheme';

interface FundManagerSectionProps {
  data: SchemeDetails['fundManagers'];
}

const FundManagerSectionComponent = ({ data }: FundManagerSectionProps) => {
  const { t } = useTranslation();

  if (!data || data.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {data.map((manager, index) => (
          <View key={manager.id} style={[styles.card, index < data.length - 1 && styles.cardMargin]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {manager.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{manager.name}</Text>
              <Text style={styles.details}>{`${manager.since} • ${t('present')} (${manager.experience})`}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export const FundManagerSection = memo(FundManagerSectionComponent);

const styles = StyleSheet.create({
  container: {
    // Styles removed
  },
  // title removed
  list: {
    // Card styles removed
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardMargin: {
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    ...Typography.h4,
    color: Colors.primary,
  },
  info: {
    flex: 1,
  },
  name: {
    ...Typography.bodyBold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  details: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});