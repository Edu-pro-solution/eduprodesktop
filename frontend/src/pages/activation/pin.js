import useHeader from '@/hooks/useHeader';
import BuyBanner from '@/components/activate/BuyBanner';
import Section from '@/components/activate/Section';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pinSchema } from '@/constants/schema';
import { PinParams } from '@/constants/types';
import { View } from 'react-native';
import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';
import { useGenerateActivationKey } from '@/hooks/activation';
import { router } from 'expo-router';
import { AppService } from '@/repository/app';
import { showMessage } from 'react-native-flash-message';
import { useEffect } from 'react';

export default function ActivationByPinScreen() {
  useHeader('Activate by PIN');
  const methods = useForm<PinParams>({
    resolver: zodResolver(pinSchema),
    defaultValues: { pin: '', productKey: '' },
  });

  useEffect(() => {
    AppService.getActivationKey().then((key) => {
      if (key) {
        router.replace('/core');
      }
    });

    AppService.getProductKey().then((productKey) => {
      methods.setValue('productKey', productKey || '');
    });
  }, []);

  const { generateActivationKey, isPending } = useGenerateActivationKey();

  const onSuccess = (data: PinParams) => {
    generateActivationKey(data, {
      onSuccess: async (data) => {
        methods.reset();
        if (data.key) {
          const resp = await AppService.saveActivationKey(data.key);
          if (resp) {
            showMessage({
              message: 'Success',
              description: 'Activation key generated successfully',
              type: 'success',
            });
            router.replace('/dashboard/home');
          } else {
            showMessage({
              message: 'Error',
              description: 'Invalid activation key',
              type: 'danger',
            });
          }
        } else {
          showMessage({
            message: 'Error',
            description: data.message,
            type: 'danger',
          });
        }
      },
      onError: (error) => {
        showMessage({
          message: 'Error',
          description: error.message,
          type: 'danger',
        });
      },
    });
  };

  return (
    <Section>
      <BuyBanner text="A PIN has 10 digits. A PIN generates an Activation Key which activates the app and gives you full access to all the features. If you do not have a PIN, you need to buy one." />
      <View style={{ marginTop: 57, flex: 1 }}>
        <FormProvider {...methods}>
          <FormInput name="pin" label="Enter PIN" />
          <Button
            title="Generate Activation Key"
            style={{ marginTop: 'auto' }}
            onPress={methods.handleSubmit(onSuccess)}
            disabled={!methods.formState.isValid || isPending}
            isLoading={isPending}
          />
        </FormProvider>
      </View>
    </Section>
  );
}
