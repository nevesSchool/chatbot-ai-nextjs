'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChat } from "ai/react";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  return (
    <Card className="w-[440px]">
      <CardHeader>
        <CardTitle>Chat AI</CardTitle>
        <CardDescription>Using Vercel SDK to create a chat bot.</CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[600px] w-full pr-4">
          { messages.map(msg => {
            return (
              <div key={msg.id} className="flex gap-3 text-slate-600 text-sm mb-4">
                {msg.role === 'user' && (
                  <Avatar>
                    <AvatarFallback>MN</AvatarFallback>
                    <AvatarImage src="https://github.com/nevesSchool.png" />
                  </Avatar>
                )}

                {msg.role === 'assistant' && (
                  <Avatar>
                    <AvatarFallback>AI</AvatarFallback>
                    <AvatarImage src="https://github.com/vercel.png" />
                  </Avatar>
                )}

                <p className="leading-relaxed">
                  <span className="block font-bold text-slate-700">
                    {msg.role === 'user' ? 'User' : 'AI'}:
                  </span>
                  {msg.content}
                </p>
              </div>
            )
          }) }
        </ScrollArea>
      </CardContent>

      <CardFooter>
        <form className="w-full flex gap-2" onSubmit={handleSubmit}>
          <Input placeholder="How can I help you?" value={input} onChange={handleInputChange} />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}