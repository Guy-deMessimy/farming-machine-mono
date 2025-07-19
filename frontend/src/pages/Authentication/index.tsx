import { FormProvider, useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { useSearchParams, json, useNavigate } from 'react-router-dom';
import { ApolloError } from '@apollo/client';
// Components
import AuthForm from './components/auth-form';
// Store and redux
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from '../../store/slices/auth/auth-slice';
import { useAuthBootstrap } from '../../hooks/useAuthBootstrap';
// Bff
import { useSignInMutation } from '../../hooks/UseSignIn';
import { useSignUpMutation } from '../../hooks/UseSignUp';
import { LoginFormValues } from '../../shared/types/forms.type';

import './styles.scss';
import { useEffect, useState } from 'react';

type GraphQLOriginalError = {
  message?: string | string[];
};

type AuthMode = 'signin' | 'signup';

const AuthenticationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const [loading, setLoading] = useState(false);

  // Hooks GraphQL Apollo pour signIn et signUp
  const { signIn, loadingSignIn } = useSignInMutation();
  const { signUp, loadingSignUp } = useSignUpMutation();

  // État local pour déterminer le mode (connexion ou inscription)
  const [authMode, setAuthMode] = useState<AuthMode>('signin');

  // Checker si le user qui s'authentifie est deja connecte
  const { bootstrapped } = useAuthBootstrap({ redirectIfAuthenticated: true });

  const isLogin = authMode === 'signin';

  // État de chargement combiné (vrai si l'une des mutations est en cours)
  // const loading = loadingSignIn || loadingSignUp;

  useEffect(() => {
    const mode = searchParams.get('mode');
    setAuthMode(mode === 'signup' ? 'signup' : 'signin');
  }, [searchParams]);

  const myDefaultValues = (): LoginFormValues => ({
    email: '',
    password: '',
    ...(!isLogin && { confirmPassword: '' }),
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
    try {
      if (authMode !== 'signin' && authMode !== 'signup') {
        throw json({ message: 'Unsupported mode.' }, { status: 422 });
      }
      if (authMode === 'signup') {
        const { confirmPassword, ...safeInput } = data;
        const response = await signUp({
          variables: {
            input: safeInput,
          },
        });
        if (response.data?.signUp) {
          alert('Votre compte a bien été créé. Vous pouvez maintenant vous connecter.');
          navigate('/auth?mode=signin');
        }
      } else if (authMode === 'signin') {
        const response = await signIn({
          variables: {
            input: data,
          },
        });

        const { user } = response.data?.signIn ?? {};
        if (!user) throw new Error('Invalid credentials');
        dispatch(setCredentials({ user }));
        navigate('/');
      }
    } catch (error) {
      console.error('Erreur de connexion :', error);
      if (error instanceof ApolloError) {
        // Gestion des erreurs Apollo
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          const firstError = error.graphQLErrors[0];
          console.log('AAA~ constonSubmit:SubmitHandler<LoginFormValues>= ~ firstError:', firstError);
          const message = firstError.message;
          console.log('AAA ~ constonSubmit:SubmitHandler<LoginFormValues>= ~ message:', message);
          const code = firstError.extensions?.code;
          console.log('AAA ~ constonSubmit:SubmitHandler<LoginFormValues>= ~ code:', code);

          if (message === 'Password does not match') {
            console.log('AAA ~ JE PASSE LA 1 onstonSubmit:SubmitHandler<LoginFormValues>= ~ message:', message);
            alert('Mot de passe incorrect.');
            return;
          }

          if (message === 'User with this email already exists') {
            console.log('AAA  ~ JE PASSE LA 2 ~ code:', code);
            alert('Un utilisateur avec cette adresse e-mail existe déjà.');

            return;
          }
          const originalError = firstError.extensions?.originalError as GraphQLOriginalError;
          console.log('🚀 ~ constonSubmit:SubmitHandler<LoginFormValues>= ~ originalError:', originalError);

          if (originalError && Array.isArray(originalError.message)) {
            alert(originalError.message.join('\n'));
            return;
          }

          alert(message);
          return;
        }

        alert('Une erreur est survenue. Merci de réessayer.');
      } else if (error instanceof Error) {
        // Gestion générique d'erreur JS
      } else {
        // Cas très exceptionnel
      }
    } finally {
      console.info('je finally');
    }
    console.log('🚀 ~ constonSubmit:SubmitHandler<LoginFormValues>= ~ ApolloError:', ApolloError);
  };

  const onError = (errors: FieldErrors<LoginFormValues>) => {
    console.error('AAA onError', errors);
  };

  const AuthenticationFormProvider = (
    <FormProvider {...form}>
      <form className={`authentication_wrapper`} id="hook-form" onSubmit={form.handleSubmit(onSubmit, onError)}>
        <AuthForm authMode={authMode} />
      </form>
    </FormProvider>
  );
  return <>{AuthenticationFormProvider}</>;
};

export default AuthenticationPage;
