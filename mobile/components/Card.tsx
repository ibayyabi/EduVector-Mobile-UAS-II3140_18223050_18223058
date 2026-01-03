import { View, ViewProps } from 'react-native';
import { Shadows } from '@/constants/shadows';
import { Colors, BorderRadius } from '@/constants/theme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export default function Card({ children, style, ...props }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: Colors.cardBg,
          borderRadius: BorderRadius.lg,
          padding: 16,
          borderWidth: 1,
          borderColor: Colors.border,
          ...Shadows.md,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
