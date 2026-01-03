import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { MATERI_LIST } from '@/assets/data/materiData';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebaseConfig';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Colors } from '@/constants/theme';

export default function MateriDetailScreen() {
    const { slug } = useLocalSearchParams();
    const materi = MATERI_LIST.find(m => m.id === slug);
    const { currentUser } = useAuth();
    const [isCompleted, setIsCompleted] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check if material is already completed
    useEffect(() => {
        if (!currentUser || !slug) return;
        const checkCompletion = async () => {
            try {
                const docRef = doc(db, 'material_completion', `${currentUser.uid}_${slug}`);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setIsCompleted(true);
                }
            } catch (err) {
                console.error("Error checking material completion:", err);
            } finally {
                setLoading(false);
            }
        };
        checkCompletion();
    }, [currentUser, slug]);

    const handleMarkComplete = async () => {
        if (!currentUser || !slug) return;
        try {
            const docRef = doc(db, 'material_completion', `${currentUser.uid}_${slug}`);
            await setDoc(docRef, {
                userId: currentUser.uid,
                materialId: slug,
                completedAt: serverTimestamp()
            });
            setIsCompleted(true);
            Alert.alert("Sukses", "Materi ditandai sebagai selesai!");
        } catch (err) {
            console.error("Error marking material complete:", err);
            Alert.alert("Error", "Gagal menandai materi selesai.");
        }
    };

    if (!materi) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <Text>Materi tidak ditemukan</Text>
            </SafeAreaView>
        );
    }

    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
        <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 20px; padding-bottom: 80px; line-height: 1.6; color: #212529; background-color: #ffffff; }
          h1 { color: #004aaa; border-bottom: 2px solid #dee2e6; padding-bottom: 10px; }
          h2 { color: #005fdb; margin-top: 30px; }
          h3 { color: #005fdb; margin-top: 25px; }
          code, pre { background-color: #f8f9fa; padding: 3px 6px; border-radius: 4px; font-family: monospace; }
          pre { padding: 15px; overflow-x: auto; }
          img { max-width: 100%; height: auto; }
          blockquote { border-left: 4px solid #10b981; margin: 0; padding-left: 15px; color: #555; }
          .katex-display { overflow-x: auto; overflow-y: hidden; }
        </style>
      </head>
      <body>
        <div id="content"></div>
        <script>
          const markdown = \`${materi.content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`;
          
          const mathBlocks = [];
          const protectedMarkdown = markdown.replace(/\$\$([\s\S]*?)\$\$|\$((?!\$)[\s\S]*?)\$/g, function(match) {
            mathBlocks.push(match);
            return 'MATH_BLOCK_' + (mathBlocks.length - 1);
          });
          
          let html = marked.parse(protectedMarkdown);
          
          html = html.replace(/MATH_BLOCK_(\d+)/g, function(match, index) {
            return mathBlocks[index];
          });
          
          document.getElementById('content').innerHTML = html;
          
          renderMathInElement(document.body, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false},
            ],
            throwOnError : false
          });
        </script>
      </body>
    </html>
  `;

    return (
        <>
            <Stack.Screen options={{ title: materi.title }} />
            <View style={{ flex: 1 }}>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: htmlContent }}
                    style={{ flex: 1 }}
                />
                
                {currentUser && (
                    <View style={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        left: 0, 
                        right: 0, 
                        padding: 16, 
                        backgroundColor: 'white', 
                        borderTopWidth: 1, 
                        borderTopColor: '#e5e7eb' 
                    }}>
                        {loading ? (
                            <ActivityIndicator color={Colors.primary} />
                        ) : (
                            <TouchableOpacity
                                onPress={handleMarkComplete}
                                disabled={isCompleted}
                                style={{
                                    backgroundColor: isCompleted ? Colors.success : Colors.primary,
                                    padding: 12,
                                    borderRadius: 8,
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    {isCompleted ? "Sudah Selesai ✓" : "Tandai Selesai"}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        </>
    );
}

