import { FormProvider, useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { useSearchParams, json, useNavigate } from 'react-router-dom';
import { LoginFormValues } from '../../shared/types/forms.type';
import AuthForm from './components/auth-form';
import './styles.scss';
import { useSignInMutation } from '../../hooks/UseSignIn';
import { ApolloError } from '@apollo/client';

type GraphQLOriginalError = {
  message?: string | string[];
};

const AuthenticationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const myDefaultValues = (): LoginFormValues => ({
    email: '',
    password: '',
  });
  const { signIn } = useSignInMutation();
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
      } else if (mode === 'login') {
        console.info('AAA je try', data);

        const response = await signIn({
          variables: {
            input: data,
          },
        });

        console.log('AAA response', response);

        const accessToken = response.data?.signIn?.accessToken;
        const user = response.data?.signIn?.user;
        console.log('AAA accessToken', accessToken);
        console.log('AAA user', user);

        if (!accessToken || !user) {
          throw new Error('Invalid credentials');
        }

        // 💾 Stocke le token
        localStorage.setItem('token', accessToken);

        // 🕒 Tu peux activer cette partie plus tard pour gérer la durée du token
        // const expiration = new Date();
        // expiration.setHours(expiration.getHours() + 1);
        // localStorage.setItem('expiration', expiration.toISOString());
        // localStorage.setItem('token', 'E6FItRREDFXdwMqYaO8GefV6KurWH4CwljAoGhItB5ruLk5FTzXHxsJft1cV0XDL');
      }

      navigate('/');
    } catch (error) {
      console.error('Erreur de connexion :', error);
      if (error instanceof ApolloError) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          const firstError = error.graphQLErrors[0];
          console.log('AAA firstError', firstError);
          const message = firstError.message;

          // Si l’erreur vient du backend avec un message clair
          if (message === 'Password does not match') {
            alert('Mot de passe incorrect.');
            return;
          }

          const originalError = firstError.extensions?.originalError as GraphQLOriginalError;

          if (Array.isArray(originalError.message)) {
            alert(originalError.message.join('\n'));
            return;
          }

          alert(message);
          return;
        }

        // ✅ Erreur réseau ou inconnue
        alert('Une erreur est survenue. Merci de réessayer.');
      } else if (error instanceof Error) {
        // Gestion générique d'erreur JS
      } else {
        // Cas très exceptionnel
      }
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
