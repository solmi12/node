const db = require("../models/index"); 
const Reunion = db.reunion
let games = [];

const criarJogo = (data, id) =>{
    const gameStatus = {
        nomeSala: data.nomeSala,
        idSala: data.idSala,
        tipoCarta: data.tipoCarta,
        espectador: data.espectador,
        players: [{player: data.nomeUsuario, carta: 0, status: '', travarCarta: data.espectador, playerId: id}],
    }
    games.push(gameStatus);
    return  gameStatus;
}

const inserirPlayer = (data, id) =>{
    for (let i = 0; i < games.length; i++) {
        if(games[i].idSala == data.idSala){
            games[i].players.push({player: data.nomeUsuario, carta: 0, status: '', travarCarta: data.travarCarta, playerId: id})
            return  games[i];
        }
    }
}

const inserirVoto = (data) =>{
    for (let i = 0; i < games.length; i++) {
        if(games[i].idSala == data.idSala){
            for (let k = 0; k < games[i].players.length; k++) {
                if(games[i].players[k].player == data.player){
                    games[i].players[k].carta = data.voto;
                    games[i].players[k].status = 'voting';
                    return games[i];
                }
            }
            games[i].players.push({player: data.player, carta: data.voto,  status: 'voting'})
            return games[i];  
        }
    }
}

const removerPlayer = (id) => {
    for (let k = 0; k < games.length; k++) {
        for (let i = 0; i < games[k].players.length; i++) {
            if(games[k].players[i].playerId == id){
                debugger
                games[k].players.splice(i)
            }
        }
        return games[k]   
    }
}

const reiniciarGame = (data) =>{
    for (let i = 0; i < games.length; i++) {
        if(games[i].idSala == data){
            for (let k = 0; k < games[i].players.length; k++){
                games[i].players[k].carta = 0;
                games[i].players[k].status = '';
            }
            return games[i];
        }    
    }
}


module.exports = {
    criarJogo,
    inserirPlayer,
    inserirVoto,
    reiniciarGame,
    removerPlayer
}