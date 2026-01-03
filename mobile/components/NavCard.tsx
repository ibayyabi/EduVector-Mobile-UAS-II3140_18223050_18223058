import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors, Spacing, BorderRadius, FontSizes } from '@/constants/theme';
import { Shadows } from '@/constants/shadows';

interface NavCardProps {
  icon: keyof typeof FontAwesome.glyphMap;
  title: string;
  desc: string;
  route: string;
  color: string;
}

function NavCard({ icon, title, desc, route, color }: NavCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(route as any)}
      activeOpacity={0.9}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
        <FontAwesome name={icon} size={24} color={color} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      <View style={styles.arrow}>
        <FontAwesome name="chevron-right" size={12} color={Colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );
}

export default NavCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  title: {
    fontSize: FontSizes.base,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  desc: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  arrow: {
    paddingLeft: Spacing.sm,
  }
});
