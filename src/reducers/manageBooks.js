let initialState=[];

const manageBooks=(state=initialState, action)=>{

    if(action.type==="addBooks"){
        return [...state, action.payload];
    }else if(action.type==="deleteBook"){
        return state.filter(e=>e._id=== action.payload);
    }else if(action.type== "editBooks"){
        return [action.payload];
    }
    else{
        return state;
    }
};

export default manageBooks;