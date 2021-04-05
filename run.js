import Game from "./engine/game.js";
import GameView from "./engine/view.js";
import Controller from "./engine/controller.js";


window.addEventListener('load', ()=>{
    let model = new Game(4);
    let view = new GameView(model);
    let controller = new Controller(model, view);


    model.onMove(controller.updateView);
    model.onLose(controller.updateView);
    model.onWin(controller.updateView);
 

    let body = document.querySelector('body');
    body.append(view.div);




    
})