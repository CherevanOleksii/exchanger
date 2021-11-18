import { useState } from "react"
import { useEffect } from "react"

const MarkTable = ({
    onCountChange = () => {}
}) => {

    const [count, setCount] = useState(0)

    useEffect(() => {
        onCountChange(count)
    }, [count])
    
    const handleIncrement = event => {
       setCount(count+1)
    }

    return (
        <>
            <p>{count}</p>
            <button  onClick={handleIncrement}>Increment</button>
        </>
    )
}

export default MarkTable