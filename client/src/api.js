const getIdbyCode = code => {
    let id = code;
    return id;
};

export async function getTimerById(id){
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(
            {
                name: id,
                time: 65,
                subs: 999,
            }
        ), 2000)
    });

    let result = await promise;

    return result    
};

export async function getTimerByCode(code){
    let id = getIdbyCode(code);
    return await getTimerById(id);
};