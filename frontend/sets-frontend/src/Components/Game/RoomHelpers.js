import * as Colyseus from 'colyseus.js';

const names = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',];


export const joinRoom = async (roomId,userId='none') => {

    let client = new Colyseus.Client('ws://localhost:5000');

    try {
        const room = await client.joinById(roomId, {user: userId});
        return room;
    } 
    catch (e) {
        console.error("join error", e);
        return false;
    }
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export function getRandName(){

    const randIndex = getRandomIntInclusive(0,names.length-1);
    return names[randIndex];
}