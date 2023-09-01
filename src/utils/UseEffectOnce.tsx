import {EffectCallback, useEffect} from 'react'

function useEffectOnce(effect: EffectCallback): void {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, [])
}

export default useEffectOnce