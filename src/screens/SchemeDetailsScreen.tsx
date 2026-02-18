import { memo, useState } from 'react';
import { ArrowLeft, Search, ShoppingCart } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { Accordion } from '@/components/common/Accordion';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { NavLineGraph } from '@/components/graph/NavLineGraph';
import { ReturnAnalysis } from '@/components/returns/ReturnAnalysis';
import { ReturnCalculator } from '@/components/returns/ReturnCalculator';
import { Riskometer } from '@/components/riskometer/Riskometer';
import { FundInfoSection } from '@/components/scheme/FundInfoSection';
import { SchemeHeader } from '@/components/scheme/SchemeHeader';
import { AnalyticsSection } from '@/components/scheme/AnalyticsSection';
import { AllocationAnalysis } from '@/components/scheme/AllocationAnalysis';
import { HoldingAnalysis } from '@/components/scheme/HoldingAnalysis';
import { FundManagerSection } from '@/components/scheme/FundManagerSection';
import { SimilarFunds } from '@/components/scheme/SimilarFunds';
import schemeDetailsJson from '@/data/schemeDetails.json';
import navData from '@/data/navData.json';
import returnAnalysis from '@/data/returnAnalysis.json';
import similarFundsData from '@/data/similarFunds.json';
import { SchemeDetails } from '@/types/scheme';

const SchemeDetailsScreenComponent = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [scrollEnabled, setScrollEnabled] = useState(true);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={[styles.headerBackground, { height: insets.top + 260 }]} />
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.iconButton}>
          <ArrowLeft color={Colors.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('schemeDetails')}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Search color={Colors.white} size={24} />
          </TouchableOpacity>
          <View style={styles.cartWrapper}>
            <TouchableOpacity style={styles.cartButton}>
              <ShoppingCart color={Colors.schemeHeaderBackground} size={20} />
            </TouchableOpacity>
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>3</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
      >
        <SchemeHeader data={schemeDetails} />
        
        <ErrorBoundary fallback={t('errorGraph')}>
          <Accordion title={t('navPerformance')} defaultExpanded={false}>
            <NavLineGraph data={navData} />
          </Accordion>
        </ErrorBoundary>

        <ErrorBoundary fallback={t('errorReturns')}>
          <Accordion title={t('returnAnalysis')} defaultExpanded={false}>
            <ReturnAnalysis data={returnAnalysis} />
          </Accordion>
        </ErrorBoundary>

        <ErrorBoundary fallback={t('errorAnalytics')}>
          <Accordion title={t('analytics')} defaultExpanded={false}>
            <AnalyticsSection data={schemeDetails.analytics} />
          </Accordion>
        </ErrorBoundary>

        <ErrorBoundary fallback={t('errorAllocation')}>
          <Accordion title={t('allocation')} defaultExpanded={false}>
            <AllocationAnalysis data={schemeDetails.allocation} />
          </Accordion>
        </ErrorBoundary>

        <ErrorBoundary fallback={t('errorHoldings')}>
          <Accordion title={t('holdingAnalysis')} defaultExpanded={false}>
            <HoldingAnalysis data={schemeDetails.holdings} />
          </Accordion>
        </ErrorBoundary>

        <ErrorBoundary fallback={t('errorFundManagers')}>
          <Accordion title={t('fundManagers')} defaultExpanded={false}>
            <FundManagerSection data={schemeDetails.fundManagers} />
          </Accordion>
        </ErrorBoundary>

        <ErrorBoundary fallback={t('errorCalculator')}>
          <Accordion title={t('returnCalculator')} defaultExpanded={false}>
            <ReturnCalculator onSliderInteractionChange={(isInteracting) => setScrollEnabled(!isInteracting)} />
          </Accordion>
        </ErrorBoundary>

        <ErrorBoundary fallback={t('errorRiskometer')}>
          <Accordion title={t('riskometer')} defaultExpanded={false}>
            <Riskometer level={schemeDetails.riskLevel} />
          </Accordion>
        </ErrorBoundary>

        <ErrorBoundary fallback={t('errorSimilarFunds')}>
          <Accordion title={t('fundsInCategory')} defaultExpanded={false}>
            <SimilarFunds data={similarFundsData} />
          </Accordion>
        </ErrorBoundary>

        <ErrorBoundary fallback={t('errorFundInfo')}>
          <Accordion title={t('fundInfo')} defaultExpanded={false}>
            <FundInfoSection data={schemeDetails} />
          </Accordion>
        </ErrorBoundary>
      </ScrollView>
      
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
        <View style={styles.buttonSecondary}>
          <Text style={styles.buttonSecondaryText}>{t('oneTime')}</Text>
        </View>
        <View style={styles.buttonPrimary}>
          <Text style={styles.buttonPrimaryText}>{t('startSip')}</Text>
        </View>
      </View>
    </View>
  );
};

const schemeDetails = schemeDetailsJson as SchemeDetails;

export const SchemeDetailsScreen = memo(SchemeDetailsScreenComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 140,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.screenHorizontal,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenHorizontal,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.schemeHeaderBackground,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.schemeHeaderBackground,
    borderBottomLeftRadius: Spacing.radius.xl,
    borderBottomRightRadius: Spacing.radius.xl,
  },
  headerTitle: {
    ...Typography.h3,
    color: Colors.white,
    flex: 1,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  iconButton: {
    padding: Spacing.xs,
  },
  cartWrapper: {
    marginLeft: Spacing.xs,
  },
  cartButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.schemeHeaderBackground,
  },
  cartBadgeText: {
    ...Typography.small,
    color: Colors.schemeHeaderBackground,
  },
  // SectionContainer removed as it is replaced by Accordion
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.md,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Spacing.shadow.lg,
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: Colors.primary, // Green
    paddingVertical: Spacing.md,
    borderRadius: Spacing.radius.lg,
    alignItems: 'center',
    marginLeft: Spacing.sm,
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: Colors.primaryLight, // Light Green
    paddingVertical: Spacing.md,
    borderRadius: Spacing.radius.lg,
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  buttonPrimaryText: {
    ...Typography.button,
    color: Colors.white,
    textTransform: 'uppercase',
  },
  buttonSecondaryText: {
    ...Typography.button,
    color: Colors.primaryDark,
    textTransform: 'uppercase',
  },
});
