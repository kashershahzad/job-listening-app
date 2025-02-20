// components/Navigation.tsx
'use client'

import Link from 'next/link';
import { useUser } from '@/context/UserContext';

export default function Navigation() {
  const { user } = useUser();

  return (
    <nav>
      <Link href="/">Home</Link>
      {user?.role === 'admin' && (
        <Link href="/create-job">Create Job</Link>
      )}
      <Link href="/jobs">Jobs</Link>
      {user ? (
        <Link href="/profile">Profile</Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
}
