
const initialState=[];
const manageUsers=(state=initialState, actions)=>{

    if(actions.type=="addUsers"){
        return [...state, actions.payload];
    }else{
        return state;
    }
}

export default manageUsers;