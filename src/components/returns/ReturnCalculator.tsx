import { memo, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CustomSlider } from '@/components/common/CustomSlider';
import { Colors } from '@/constants/colors';
import { Config } from '@/constants/config';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { ToggleSwitch } from '@/components/common/ToggleSwitch';
import { calculateReturns, CalculatorMode } from '@/utils/calculations';
import { formatCurrency, parseNumericInput } from '@/utils/formatters';

interface ReturnCalculatorProps {
  initialMode?: CalculatorMode;
  onSliderInteractionChange?: (isInteracting: boolean) => void;
}

const options = [
  { label: 'Monthly SIP', value: 'Monthly SIP' as CalculatorMode },
  { label: 'One Time', value: 'One Time' as CalculatorMode },
];

const tenureOptions = [
  { label: '1M', value: 1 / 12 },
  { label: '3M', value: 3 / 12 },
  { label: '6M', value: 6 / 12 },
  { label: '1Y', value: 1 },
  { label: '3Y', value: 3 },
  { label: '5Y', value: 5 },
];

const ReturnCalculatorComponent = ({
  initialMode = 'Monthly SIP',
  onSliderInteractionChange,
}: ReturnCalculatorProps) => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<CalculatorMode>(initialMode);
  const [amount, setAmount] = useState<number>(
    initialMode === 'Monthly SIP' ? Config.MIN_SIP_AMOUNT : Config.MIN_LUMPSUM_AMOUNT
  );
  const [tenure, setTenure] = useState<number>(3); // Default 3 years
  const [result, setResult] = useState(() => calculateReturns(amount, tenure, mode));

  useEffect(() => {
    const timer = setTimeout(() => {
      setResult(calculateReturns(amount, tenure, mode));
    }, 300);
    return () => clearTimeout(timer);
  }, [amount, tenure, mode]);

  useEffect(() => {
    setAmount(mode === 'Monthly SIP' ? Config.MIN_SIP_AMOUNT : Config.MIN_LUMPSUM_AMOUNT);
  }, [mode]);

  const amountLabel = useMemo(
    () => (mode === 'Monthly SIP' ? t('monthlySipAmount') : t('oneTimeAmount')),
    [mode, t]
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <ToggleSwitch options={options} value={mode} onChange={setMode} />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.amountHeader}>
            <Text style={styles.inputLabel}>{amountLabel}</Text>
            <View style={styles.amountPill}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                value={String(amount)}
                onChangeText={(text) => setAmount(parseNumericInput(text))}
                keyboardType="numeric"
                style={styles.amountInput}
              />
            </View>
          </View>
          <CustomSlider
            style={styles.slider}
            minimumValue={mode === 'Monthly SIP' ? 500 : 5000}
            maximumValue={mode === 'Monthly SIP' ? 100000 : 1000000}
            step={mode === 'Monthly SIP' ? 500 : 5000}
            value={amount}
            onValueChange={setAmount}
            onInteractionChange={onSliderInteractionChange}
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.minMaxLabel}>₹ {mode === 'Monthly SIP' ? '500' : '5K'}</Text>
            <Text style={styles.minMaxLabel}>₹ {mode === 'Monthly SIP' ? '1L' : '10L'}</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>{t('selectDuration')}</Text>
          <View style={styles.tenureContainer}>
            {tenureOptions.map((option) => (
              <Pressable
                key={option.label}
                style={[styles.tenureChip, tenure === option.value && styles.tenureChipActive]}
                onPress={() => setTenure(option.value)}
              >
                <Text
                  style={[styles.tenureText, tenure === option.value && styles.tenureTextActive]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.resultContainer}>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>{t('totalInvestment')}</Text>
          <Text style={styles.resultValue}>{formatCurrency(result.totalInvested)}</Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>{t('wouldHaveBecome')}</Text>
          <Text style={[styles.resultValue, styles.positive]}>
            {formatCurrency(result.estimatedValue)}
            <Text style={styles.percentageGain}>
              {' '}
              ({result.totalReturns > 0 ? '+' : ''}
              {((result.totalReturns / result.totalInvested) * 100).toFixed(2)}%)
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export const ReturnCalculator = memo(ReturnCalculatorComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.radius.lg,
    borderWidth: 1,
    borderColor: Colors.graphPillBorder,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: Spacing.lg,
  },
  card: {
    padding: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  amountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  inputLabel: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  amountPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    minWidth: 110,
    justifyContent: 'center',
  },
  currencySymbol: {
    ...Typography.h4,
    color: Colors.white,
    marginRight: 2,
  },
  amountInput: {
    ...Typography.h4,
    color: Colors.white,
    minWidth: 80,
    textAlign: 'right',
    padding: 0,
  },
  slider: {
    width: '100%',
    marginBottom: Spacing.xs,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  minMaxLabel: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },
  tenureContainer: {
    flexDirection: 'row',
    marginTop: Spacing.sm,
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  tenureChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.graphPillBorder,
  },
  tenureChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tenureText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  tenureTextActive: {
    color: Colors.white,
  },
  resultContainer: {
    backgroundColor: Colors.graphTooltipBackground,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  resultLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  resultValue: {
    ...Typography.h4,
    color: Colors.textPrimary,
  },
  positive: {
    color: Colors.primary,
  },
  percentageGain: {
    ...Typography.caption,
    color: Colors.primary,
  },
});
