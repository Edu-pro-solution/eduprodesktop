import { StyleSheet, View } from 'react-native';
import useHeader from '@/hooks/useHeader';
import ListItem from '@/components/activate/ListItem';
import { router } from 'expo-router';
import BuyBanner from '@/components/activate/BuyBanner';
import Section from '@/components/activate/Section';

export default function ActivationOptionsScreen() {
  useHeader('Activate App');

  return (
    <Section>
      <BuyBanner text="If you downloaded the app from an app store or it was shared with you, most likely, you do not have a PIN or an Activation Key." />
      <View style={styles.list}>
        <ListItem
          title="I have a PIN"
          onPress={() => router.push('/activation/pin')}
        />
        <ListItem
          title="I have an Activation Key"
          onPress={() => router.push('/activation/key')}
        />
        <ListItem
          title="I want to buy"
          onPress={() => router.push('/activation/buy')}
        />
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 15,
    paddingHorizontal: 6,
    marginTop: 67,
  },
});
