
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

