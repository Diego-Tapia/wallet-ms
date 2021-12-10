import { LibrarieTypes } from "../librarie.types";
import * as Axios from 'axios'

export const AxiosProvider =  {
    provide: LibrarieTypes.AXIOS,
    useValue: Axios
}