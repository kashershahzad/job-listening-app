import * as React from 'react';
import { Layout } from '@/app/components/auth/layout';
import { SignInForm } from '@/app/components/auth/signin-form';

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <SignInForm />
    </Layout>
  );
}
