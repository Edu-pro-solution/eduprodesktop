import BuyBanner from '@/components/activate/BuyBanner';
import ListItem from '@/components/activate/ListItem';
import Section from '@/components/activate/Section';
import { useBuyActivationKey } from '@/hooks/activation';
import useHeader from '@/hooks/useHeader';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function BuyScreen() {
  const { buyActivationKey } = useBuyActivationKey();

  useHeader('Buy Activation Key');

  return (
    <Section>
      <BuyBanner text="If you downloaded the app from an app store or it was shared with you, most likely, you do not have a PIN or an Activation Key." />
      <View style={styles.list}>
        <ListItem
          title="Transfer to Bank Account"
          onPress={() => router.push('/activation/buy/transfer')}
        />
        <ListItem title="Pay online" onPress={buyActivationKey} />
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
