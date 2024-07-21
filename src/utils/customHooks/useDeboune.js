import {useState,useEffect} from 'react'

export function useDebounce(value,delay){
   
    const [delayValue,setDelayValue]=useState();
    useEffect(() => {
        let timer = setTimeout(() => { 
            setDelayValue(value)//a,ab,abc
        }, delay);//500
      return () => {
       clearTimeout(timer)
      }
    }, [delay, value]) // since value changes within delay[ms] so the setTimeout never 
    // gets executed and when we leave the value unchanged for more than delay[ms] setDelay value executes 
    console.log("debounced value",delayValue,value)
    return delayValue;
}