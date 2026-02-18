import { memo, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Canvas, RoundedRect } from '@shopify/react-native-skia';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { ToggleSwitch } from '@/components/common/ToggleSwitch';

type ReturnMode = 'Lumpsum' | 'SIP';

interface ReturnData {
  label: string;
  value: number;
}

interface ReturnAnalysisProps {
  data: { SIP: ReturnData[]; Lumpsum: ReturnData[] };
}

const options = [
  { label: 'Point to Point', value: 'Lumpsum' as ReturnMode },
  { label: 'SIP Returns', value: 'SIP' as ReturnMode },
];

const ReturnAnalysisComponent = ({ data }: ReturnAnalysisProps) => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<ReturnMode>('Lumpsum');
  
  const chartData = data[mode];
  
  const maxValue = 16;
  const chartHeight = 180;
  const barWidth = 32;
  const spacing = 24;
  const totalWidth = chartData.length * (barWidth + spacing);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ToggleSwitch options={options} value={mode} onChange={setMode} />
      </View>
      
      <View style={styles.chartContainer}>
        {/* Y-Axis Labels */}
        <View style={styles.yAxis}>
          {[16, 12, 8, 4, 2].map((val) => (
            <Text key={val} style={styles.axisLabel}>{`${val}%`}</Text>
          ))}
        </View>

        {/* Bar Chart */}
        <View style={styles.graphArea}>
           <Canvas style={{ width: totalWidth, height: chartHeight }}>
             {chartData.map((item, index) => {
               const x = index * (barWidth + spacing);
               const height = (item.value / maxValue) * chartHeight;
               const y = chartHeight - height;
               return (
                 <RoundedRect
                   key={item.label}
                   x={x}
                   y={y}
                   width={barWidth}
                   height={height}
                   color={Colors.primary} // Use primary color (Green)
                   r={1}
                 />
               );
             })}
           </Canvas>
           
           {/* X-Axis Labels */}
           <View style={styles.xAxis}>
             {chartData.map((item, index) => (
               <Text 
                 key={item.label} 
                 style={[
                   styles.xAxisLabel, 
                   { 
                     width: barWidth, 
                     left: index * (barWidth + spacing),
                   }
                 ]}
               >
                 {item.label}
               </Text>
             ))}
           </View>
        </View>
      </View>
    </View>
  );
};

export const ReturnAnalysis = memo(ReturnAnalysisComponent);

const styles = StyleSheet.create({
  container: {
    // Container styles removed
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align toggle to right
    marginBottom: Spacing.lg,
  },
  // title removed
  chartContainer: {
    flexDirection: 'row',
    height: 220,
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingRight: Spacing.sm,
    height: 180,
    paddingBottom: 20, // Align with chart baseline
  },
  axisLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  graphArea: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  xAxis: {
    flexDirection: 'row',
    marginTop: Spacing.sm,
    height: 20,
    position: 'relative',
  },
  xAxisLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    position: 'absolute',
  },
});
