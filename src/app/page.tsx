"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function Home() {

  const { data: session } = authClient.useSession() 

  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password,
    }, {
      onError: () => {
        window.alert("Something went wrong, please try again later.");
      },
      onSuccess: () => {
        window.alert("Success")
      }
    });
  }

  const onLogin = () => {
    authClient.signIn.email({
      email,
      password,
    }, {
      onError: () => {
        window.alert("Something went wrong, please try again later.");
      },
      onSuccess: () => {
        window.alert("Success")
      }
    });
  }

  if (session) {
    return (
      <div className="p-4 flex flex-col gap-y-4">
        <h1 className="text-2xl">Welcome, {session.user.name}</h1>
        <Button onClick={() => authClient.signOut()}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div>
    <div className="p-4 flex flex-col gap-y-4">
      <Input 
        placeholder="name" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
      />
      
      <Input 
        placeholder="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input 
        placeholder="passsword" 
        type="password" 
        value={password} 
        onChange={(e) => 
        setPassword(e.target.value)}
        />

        <Button onClick={onSubmit}>
          Create User
        </Button>

    </div>
    <div className="p-4 flex flex-col gap-y-4">
      
      <Input 
        placeholder="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input 
        placeholder="passsword" 
        type="password" 
        value={password} 
        onChange={(e) => 
        setPassword(e.target.value)}
        />

        <Button onClick={onLogin}>
          Login
        </Button>

    </div>
    </div>
  ) 
}
