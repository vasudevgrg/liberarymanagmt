
const initialState="123";
const manageID=(state=initialState, actions)=>{
    if(actions.type==="updateID"){
        return actions.payload;
    }else{
        return state;
    }
}

export default manageID;