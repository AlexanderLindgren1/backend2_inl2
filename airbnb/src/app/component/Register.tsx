import { register } from "@/utlis/api"
// from my user type
import { useState } from "react"
export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(email, password, isAdmin)
        register(email, password, isAdmin)
    }
    return (
        <div>
            <h1>Register</h1>
            <form action="">
                <label htmlFor="name">name</label>
                <input type="text" id="name" />
                <label htmlFor="email">email</label>
                <input type="text" onChange={(e)=> setEmail(e.target.value)} id="email" />
                <label htmlFor="password">password</label>
                <input type="text" onChange={(e)=> setPassword(e.target.value)} id="password" />
                <label htmlFor="isAdmin">isAdmin</label>
                <input type="checkbox"  id="isAdmin" onChange={(e)=> setIsAdmin(e.target.checked)} />
                <button type="submit" onClick={handleSubmit}>Register</button>
            </form>
        </div>
    )
}

