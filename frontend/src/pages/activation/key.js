import Section from '@/components/activate/Section';
import BuyBanner from '@/components/activate/BuyBanner';
import useHeader from '@/hooks/useHeader';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { keySchema } from '@/constants/schema';
import { KeyParams } from '@/constants/types';
import { AppService } from '@/repository/app';
import { router } from 'expo-router';
import { showMessage } from 'react-native-flash-message';
import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';
import { View } from 'react-native';

export default function ActivationByKey() {
  useHeader('Activate by Key');

  const methods = useForm<KeyParams>({
    resolver: zodResolver(keySchema),
    defaultValues: { activationKey: '' },
  });

  const onSubmit = (data: KeyParams) => {
    AppService.saveActivationKey(data.activationKey).then((resp) => {
      if (resp) {
        router.replace('/core');
      } else {
        showMessage({
          message: 'Error',
          description: 'Invalid activation key',
          type: 'danger',
        });
      }
    });
  };

  return (
    <Section>
      <BuyBanner text="An Activation Key has 12 digits. It activates the app and gives you full access to all the features. If you do not have an Activation Key, you need to buy one." />
      <View style={{ marginTop: 57, flex: 1 }}>
        <FormProvider {...methods}>
          <FormInput name="activationKey" label="Enter Activation Key" />
          <Button
            title="Activate"
            style={{ marginTop: 'auto' }}
            onPress={methods.handleSubmit(onSubmit)}
            disabled={!methods.formState.isValid}
          />
        </FormProvider>
      </View>
    </Section>
  );
}
