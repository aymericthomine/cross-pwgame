import { readFileSync, writeFile } from 'fs';

function scoreBoardToJSON(scoreBoard:Object,  start:Date, end: Date, game:string ){
    let dataToAppend = datasToJSONFormat(scoreBoard,start,end,game) 
    let file = readFileSync('games.json')
    let actualData
    if(file.length === 0){   
        actualData = {[game] : [dataToAppend]}
    }
    else{
        actualData = JSON.parse(readFileSync('games.json').toString())  
        if(!actualData[`${game}`]){                                     
            actualData[`${game}`] = [dataToAppend]
        }
        else{                                                               
            actualData[`${game}`][actualData[`${game}`].length] = dataToAppend
        }
    }   

    writeFile('games.json',JSON.stringify(actualData,null,4),(err) => {
        if(err) throw err
        console.log("Game has been saved to games.json")
    })

}


function datasToJSONFormat(scoreBoard:Object,  start:Date, end: Date, game:string ):string{
    let chaine = `
        {
            "beg":"${start}",
            "end":"${end}",
            "players":[
                ${Object.entries(scoreBoard).map((key)=> {
                    return `{"name": "${key[0]}", "points":${key[1]}}`
                })}
            ]
}`
    return JSON.parse(chaine)
}

export default scoreBoardToJSON