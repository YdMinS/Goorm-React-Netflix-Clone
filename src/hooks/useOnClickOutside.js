import React, { useEffect } from 'react';

const useOnClickOutsied = (ref, handler) => {
    useEffect(()=>{

        const listner = (event) => {
            if(!ref.current || ref.current.contains(event.target)){
                return;
            }
            handler();
        };
        document.addEventListener("mousedown", listner);
        document.addEventListener("touchstart", listner);
        return ()=>{
            document.addEventListener("mousedown", listner);
            document.addEventListener("touchstart", listner);
        }
    }, [])

}

export default useOnClickOutsied;