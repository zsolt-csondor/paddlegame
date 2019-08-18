export function detectCollision(ball, gameObject) {

    /**Ball and gameObject positions */
    let bottomOfBall = ball.position.y + ball.radius;
    let topOfBall = ball.position.y - ball.radius;

    let topOfObject = gameObject.position.y;
    let bottomOfObject = gameObject.position.y + gameObject.height;
    let leftSideOfObject = gameObject.position.x;
    let rightSideOfObject = gameObject.position.x + gameObject.width;

    //Detecting collision
    if((bottomOfBall > topOfObject && topOfBall < bottomOfObject) && ((ball.position.x - ball.radius) < rightSideOfObject
        && (ball.position.x + ball.radius) > leftSideOfObject)) {

        return true;
    }
    else {
        return false;
    }
}
