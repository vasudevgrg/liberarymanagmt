import { combineReducers } from "redux";
import manageBooks from "./manageBooks";
import manageID from "./manageID";
import manageUsers from "./manageUsers";

const rootreducer= combineReducers({
    manageBooks, manageID, manageUsers
});

export default rootreducer;