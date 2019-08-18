import Brick from "./brick.js";


//IDEA: Different numbers could denote different types of bricks,
//e.g. 2 could mean a brick that is harder to break, etc.
// export const level1 = [
//     [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ];

const level1 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const level2 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0]
];

export const levels = [level1, level2];

export function buildLevel(game, levelDesc) {

    if(typeof levelDesc === "undefined" || levelDesc === null) {
        console.error("levelDesc null or undefined in buildLevel");
        return;
    }

    let bricks = [];
    let dummyBrick = new Brick(game, {x:-1,y:-1}); //dummy object for information access
    //Looping over the array of arrays - the outer loop is the rows
    for(let row = 0; row < levelDesc.length; row++) {
        //Accessing the elements of each row
        for(let currBrick = 0; currBrick < levelDesc[row].length; currBrick++) {
            if(levelDesc[row][currBrick] === 1) {
                let position = {
                    x: currBrick * dummyBrick.width,
                    y: 50 + row * dummyBrick.height,
                };

                bricks.push(new Brick(game, position));
            }
        }
    }
    return bricks;
}
