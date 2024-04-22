import { legacy_createStore as createStore} from 'redux'
import rootreducer from "./reducers";

const store= createStore(rootreducer);

export default store;