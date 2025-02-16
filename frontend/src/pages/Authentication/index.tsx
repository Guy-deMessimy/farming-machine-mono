// import AuthForm from '../components/AuthForm';
import { FormProvider, useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { ComplexFormValues } from '../../shared/types/forms.type';
import AuthForm from './components/auth-form';
import './styles.scss';

const AuthenticationPage = () => {
  // return <AuthForm />;
  const myDefaultValues = (): ComplexFormValues => ({
    email: '',
    password: '',
  });
  const form = useForm<ComplexFormValues>({
    shouldUnregister: true,
    mode: 'onChange',
    criteriaMode: 'all',
    shouldUseNativeValidation: false,
    defaultValues: myDefaultValues(),
  });
  const onSubmit: SubmitHandler<ComplexFormValues> = async (data) => {
    try {
      console.info('je try', data);
    } catch (error) {
      console.info('je error', error);
    } finally {
      console.info('je finally');
    }
  };

  const onError = (errors: FieldErrors<ComplexFormValues>) => {
    console.error('onError', errors);
  };

  const AuthenticationFormProvider = (
    <FormProvider {...form}>
      <form className={`authentication_wrapper`} id="hook-form" onSubmit={form.handleSubmit(onSubmit, onError)}>
        <AuthForm />
      </form>
    </FormProvider>
  );
  return <>{AuthenticationFormProvider}</>;
};

export default AuthenticationPage;
