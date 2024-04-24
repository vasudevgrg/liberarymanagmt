
export const addBooks=(payload)=>{
return{
    type: "addBooks",
    payload:payload
}
};

export const editBooks=(payload)=>{
    return {
        type: "editBooks",
        pyload: payload
    }
}

export const deleteBook=(payload)=>{
    return {
        type: "deleteBook",
        payload:payload
    }
}

export const updateID=(payload)=>{
    return {
        type:"updateID",
        payload:payload
    }
}

export const addUsers= (e)=>{
    return {
        type: "addUsers",
        payload: e
    }
}

