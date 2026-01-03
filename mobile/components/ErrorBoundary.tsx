import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('[ErrorBoundary] Caught error:', error);
    console.error('[ErrorBoundary] Error info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Oops! Terjadi Error</Text>
          <Text style={styles.message}>
            {this.state.error?.message || 'Unknown error'}
          </Text>
          <Text style={styles.hint}>
            Check Metro console for details
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c00',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: '#600',
    textAlign: 'center',
    marginBottom: 10,
  },
  hint: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});
