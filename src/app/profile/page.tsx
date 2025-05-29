'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [dfbnetUsername, setDfbnetUsername] = useState('');
  const [dfbnetPassword, setDfbnetPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // TODO: Implement API endpoint to save credentials
      // For now, just show a success message
      setMessage('Credentials saved successfully!');
    } catch (error: unknown) {
      console.error('Error saving credentials:', error);
      setMessage('Error saving credentials. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="dfbnetUsername" className="text-sm font-medium">
                DFBnet Username
              </label>
              <Input
                id="dfbnetUsername"
                value={dfbnetUsername}
                onChange={(e) => setDfbnetUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dfbnetPassword" className="text-sm font-medium">
                DFBnet Password
              </label>
              <Input
                id="dfbnetPassword"
                type="password"
                value={dfbnetPassword}
                onChange={(e) => setDfbnetPassword(e.target.value)}
                required
              />
            </div>

            {message && (
              <div className={`p-3 rounded-md ${message.includes('Error') ? 'bg-destructive/15 text-destructive' : 'bg-green-50 text-green-700'}`}>
                {message}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Saving...' : 'Save Credentials'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 