import { View, Text, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { MATERI_LIST } from '@/assets/data/materiData';
import { SafeAreaView } from 'react-native-safe-area-context';
import GridBackground from '@/components/GridBackground';
import NavCard from '@/components/NavCard';
import { Colors, Spacing, FontSizes } from '@/constants/theme';
import ContentContainer from '@/components/ContentContainer';

export default function MateriScreen() {
    const router = useRouter();

    return (
        <GridBackground>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{
                    padding: Spacing.lg,
                    backgroundColor: Colors.backgroundCard,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.border,
                }}>
                    <Text style={{
                        fontSize: FontSizes['2xl'],
                        fontWeight: 'bold',
                        color: Colors.textPrimary,
                        marginBottom: 4,
                    }}>Daftar Materi</Text>
                    <Text style={{
                        fontSize: FontSizes.sm,
                        color: Colors.textSecondary,
                    }}>
                        Pelajari teori vektor dari dasar hingga lanjut
                    </Text>
                </View>
                
                <ContentContainer>
                    <View style={{ flex: 1, padding: Spacing.lg }}>
                    <FlatList
                    data={MATERI_LIST}
                    renderItem={({ item, index }) => (
                        <NavCard 
                            icon="book"
                            title={item.title}
                            desc={item.description}
                            route={`/materi/${item.id}`}
                            color={Colors.primary}
                        />
                    )}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 4 }}
                />
                    </View>
                </ContentContainer>
            </SafeAreaView>
        </GridBackground>
    );
}
