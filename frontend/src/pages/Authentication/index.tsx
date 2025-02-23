import { FormProvider, useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { useSearchParams, json, useNavigate } from 'react-router-dom';
import { LoginFormValues } from '../../shared/types/forms.type';
import AuthForm from './components/auth-form';
import './styles.scss';

const AuthenticationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const myDefaultValues = (): LoginFormValues => ({
    email: '',
    password: '',
  });
  const form = useForm<LoginFormValues>({
    shouldUnregister: true,
    mode: 'onChange',
    criteriaMode: 'all',
    shouldUseNativeValidation: false,
    defaultValues: myDefaultValues(),
    // use joi shema
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const mode = searchParams.get('mode') || 'login';
    console.log('AAA mode', mode);
    try {
      if (mode !== 'login' && mode !== 'signup') {
        throw json({ message: 'Unsupported mode.' }, { status: 422 });
      }
      if (mode === 'signup') {
        navigate('/FGFGFG');
        localStorage.removeItem('token');
      }
      //   const response = await myGraphqlPost(mode);
      //   if (response.status === 422 || response.status === 401) {
      //     return response;
      //   }
      //   const resData = response.json();
      //   const token = resData.token;
      //   localStorage.setItem('token', token);
      else localStorage.setItem('token', 'E6FItRREDFXdwMqYaO8GefV6KurWH4CwljAoGhItB5ruLk5FTzXHxsJft1cV0XDL');
      console.info('je try', data);

      navigate('/');
    } catch (error) {
      console.info('je error', error);
      throw json({ message: 'Could not authenticate user mode.' }, { status: 500 });
    } finally {
      console.info('je finally');
    }
  };

  const onError = (errors: FieldErrors<LoginFormValues>) => {
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
