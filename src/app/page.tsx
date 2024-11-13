'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Home() {
  const [url, setUrl] = useState('')
  const [shortLink, setShortLink] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setShortLink('')

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error('Failed to create short link')
      }

      const data = await response.json()
      setShortLink(`${window.location.origin}/${data.shortLink.slug}`)
    } catch (err: unknown) {
      console.error('Error creating short link:', err);
      setError('An error occurred while creating the short link. Please try again.');
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create Short Link</CardTitle>
          <CardDescription>Enter a URL to create a short link.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Shorten'}
            </Button>
          </form>
        </CardContent>
        {shortLink && (
          <CardFooter>
            <div className="w-full text-center">
              <p className="mb-2">Your short link:</p>
              <a href={shortLink} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                {shortLink}
              </a>
            </div>
          </CardFooter>
        )}
        {error && (
          <CardFooter>
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}