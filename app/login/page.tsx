'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth-context';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 bg-background py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-card border border-border rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
            <p className="text-center text-foreground/70 mb-8">Sign in to your Laundrica account</p>

            {error && (
              <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg mb-6 flex items-center gap-2">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-foreground/50" size={20} />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-foreground/50" size={20} />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="text-sm">
                <Link href="#" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-center text-foreground/70 mb-4">
                Don't have an account?{' '}
                <Link href="/register" className="text-primary font-semibold hover:underline">
                  Create one
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-sm">
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <p className="text-foreground/70">Email: admin@laundrica.com</p>
              <p className="text-foreground/70">Password: (any password)</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
