import { useEffect, useState } from 'react'

const useDebounce = <T extends unknown>(input: T, delay = 250) => {
  const [value, setValue] = useState<T>()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(input)
    }, delay)

    return () => clearTimeout(timeout)
  }, [input, delay])

  return value
}
export default useDebounce
