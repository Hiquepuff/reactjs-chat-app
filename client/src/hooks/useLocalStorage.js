import { useEffect, useState } from 'react'

const PREFIX = 'chat-app-'

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key

    const [value, setValue] = useState(() => {
        // Get the user id from the localStorage
        const jsonValue = localStorage.getItem(prefixedKey)

        // Convert the json string to real json
        if (jsonValue != null) return JSON.parse(jsonValue)
        
        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}