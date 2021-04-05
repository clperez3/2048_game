export default class GameView{
    constructor(model){
        this.model = model;
        this.div = document.createElement('div');
        this.listeners = [];

        let header = document.createElement('h1');
        header.innerHTML = "Play 2048!";
        header.style.fontFamily = 'monospace';
        header.style.fontSize = '40px';

        this.div.append(header);

        let description = document.createElement('div');
        description.innerHTML= "Move the tiles using your arrow keys to combine same numbers. <em>Reach 2048 to win the game.</em>"

        description.style.fontFamily = 'monospace';
        description.style.fontSize = 'medium';
        this.div.append(description);

        let game = document.createElement('div');
        this.div.append(game);
        game.id="game";


        let gameGrid = document.createElement('table');
        gameGrid.className='.table';
        for(let i=0; i<4; i++){
            let row = document.createElement('tr');
            for(let j=0; j<4; j++){

                let cell = document.createElement('td');
                cell.id=j+i*4
                let val = model.state.board[j+i*4]
                if(val!==0){
                    cell.innerHTML = val;
                }
                cell.style.fontFamily = 'monospace';
                cell.style.fontSize = '30px';
                cell.style.border = 'solid';
                cell.style.width = '90px';
                cell.style.height = '75px';
                cell.style.textAlign = 'center';
                row.append(cell);
            }
            gameGrid.append(row);
        }
        gameGrid.style.margin = 'auto';
        gameGrid.style.width = '50%';
        gameGrid.style.padding = '10px';
        game.append(gameGrid);

        let scoreDiv = document.createElement('div');
        scoreDiv.innerHTML = "SCORE: <span id='score'>0</span>";
        scoreDiv.style.fontSize = 'medium';
        scoreDiv.style.fontFamily = 'monospace';
        scoreDiv.style.fontSize = '40px';

        
        this.div.append(scoreDiv);
        gameGrid.style.fontSize = 'large';

        let resetButton = document.createElement('button');
        resetButton.type = 'button';
        resetButton.innerHTML = "Reset Game";
        resetButton.style.fontFamily = 'monospace';
        resetButton.style.backgroundColor = "white";
        resetButton.style.fontSize = "15px";


        this.div.append(resetButton);

        resetButton.addEventListener('click', (e)=>{
            let action = 'startOver';
            this.updateListeners(action);

            $('#win').remove();
            $('#lose').remove();


        })

        document.addEventListener('keydown', (e)=>{

            let action = 'keydown';
            switch(e.which){
                case 37: 
                    action = 'left';
                    break;
                case 38: 
                    action = 'up';
                    break;
                case 39: 
                    action = 'right';
                    break;
                case 40: 
                    action = 'down';
                    break;
            }
            this.updateListeners(action);
        })
        
    }

    overView(){
        let loseDiv = document.createElement('div');
        loseDiv.innerHTML = "Sorry, you lost :(";
        this.div.append(loseDiv);
    }

    wonView(){
        let winDiv = document.createElement('div');
        winDiv.innerHTML = "Good job! You won the game.";
        this.div.append(winDiv);
    }

    addListener(l){
        this.listeners.push(l);
    }

    updateListeners(e) {
        this.listeners.forEach(l =>{
            l.updateModel(e);
        })
    }

    getDiv(){
        return this.div;
    }

}