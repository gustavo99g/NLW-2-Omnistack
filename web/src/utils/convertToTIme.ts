 const converTotime =(time:string)=>{

    let newTime = +time /60
    let parsedTIme

    if(newTime < 10){
        parsedTIme = `0${newTime}:00`
    }else{
        parsedTIme =`${newTime}:00`
    }

    return parsedTIme
}



export default converTotime