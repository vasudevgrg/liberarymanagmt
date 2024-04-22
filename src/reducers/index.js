import { combineReducers } from "redux";
import manageBooks from "./manageBooks";
import manageID from "./manageID";

const rootreducer= combineReducers({
    manageBooks, manageID
});

export default rootreducer;