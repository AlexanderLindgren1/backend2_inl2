

import { login } from "@/utlis/api"
import { useState } from "react"


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(email, password)
        login(email, password)
    }

    return (
        <div>
            <h1>Login</h1>
            

            <form action="">
                <label htmlFor="email">email</label>
                <input type="text" onChange={(e)=> setEmail(e.target.value)} id="email" />
                <label htmlFor="password">password</label>
                <input type="text" onChange={(e)=> setPassword(e.target.value)} id="password" />
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}