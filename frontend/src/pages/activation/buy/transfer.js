import Section from '@/components/activate/Section';
import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/ui/Button';
import useHeader from '@/hooks/useHeader';
import { AppService } from '@/repository/app';
import Clipboard from '@react-native-clipboard/clipboard';

export default function TransferScreen() {
  useHeader('Payment Details');

  return (
    <Section>
      <ThemedText type="subtitle">Price</ThemedText>
      <ThemedText>The cost of getting an activation key is N 3,000</ThemedText>
      <ThemedText className="mt-10" type="subtitle">
        How to pay
      </ThemedText>
      <ThemedText>{`Deposit or Transfer N 3,000 to  \n\nBank Name: First Bank of Nigeria \nAccount Number: 2034426960
        \nAccount Name: EdSofta Limited \nAccount Type: Current Account\n\n   Or \n\nBank Name: Guaranty Trust Bank \nAccount Number: 0490463960
        \nAccount Name: EdSofta Limited \nAccount Type: Current Account`}</ThemedText>

      <ThemedText className="mt-10" type="subtitle">
        After payment
      </ThemedText>
      <ThemedText>{`After payment, text Depositors’ Name and Product Key to Customer Care number on WhatsApp - 08141620162.
        \nYour Activation Key would be sent to you. \n\n`}</ThemedText>

      <Button
        title="Copy Product key"
        style={{ marginTop: 'auto' }}
        onPress={() => {
          AppService.getProductKey().then((key) => {
            Clipboard.setString(key || '');
          });
        }}
      />
    </Section>
  );
}
