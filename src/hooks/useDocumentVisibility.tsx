import useSafeState from "./useSafeState";
import useEventListener from "./useEventListener";
import {isBrowser} from '../utils';

type VisibilityProps = DocumentVisibilityState | undefined;

const getVisibility = () => {
    if(!isBrowser) {
        return 'visible'
    }

    return document.visibilityState;
}


const useDocumentVisibility = (): VisibilityProps => {

    const [visibility, setVisibility] = useSafeState(() => getVisibility())

    useEventListener('visibilitychange', () => {
        setVisibility(getVisibility());
    }, document)

    return visibility;
}

export default useDocumentVisibility;