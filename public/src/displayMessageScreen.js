export default function displayMessageScreen(msg, context) {
    context.rect(0,0, context.width, context.height);
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fill();
    context.font = "30px Arial";
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.fillText(msg, context.width / 2, context.height / 2);
}