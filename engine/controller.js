export default class Controller{
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.calledOver = false;
        this.calledWon = false;
        view.addListener(this);


    }
    getView(){
        return this.view;
    }

    updateView(state){
        for (let i=0; i< state.board.length; i++){
            let cell = document.getElementById(i)
            let val = state.board[i];
            if(val!==0){
                cell.innerHTML = val;
                switch(val){
                    case 2:
                        cell.style.backgroundColor = 'white';
                        break;

                    case 4:
                        cell.style.backgroundColor = 'lemonchiffon';
                        break;
                    case 8:
                        cell.style.backgroundColor = 'tan';
                        break;
                    case 16:
                        cell.style.backgroundColor = 'hotpink';
                        break;
                    case 32:
                        cell.style.backgroundColor = 'lightsalmon';
                        break;
                    case 64:
                        cell.style.backgroundColor = 'lightcoral';
                        break;
                    case 128:
                        cell.style.backgroundColor = 'orange';
                        break;
                    case 256:
                        cell.style.backgroundColor = 'indianred';
                        break;
                    case 512:
                        cell.style.backgroundColor = 'deeppink';
                        break;
                    case 1024:
                        cell.style.backgroundColor = 'red';
                        break;
                    case 2048:
                        cell.style.backgroundColor = 'green';
                        break;
                }

            } else{
                cell.innerHTML = '';
                cell.style.backgroundColor = 'white';
            }
        }
        document.getElementById('score').innerHTML = state.score;
        if(state.won && !this.calledWon){
            $('#win').remove();
            this.calledWon = true;
            let winDiv = document.createElement('div');
            winDiv.id = 'win';
            winDiv.innerHTML = "YOU WON :)";
            winDiv.style.fontSize = 'large';
            winDiv.style.fontFamily = 'monospace';
            winDiv.style.fontSize = '100px';
            winDiv.style.color = 'green';

            $('#game').append(winDiv);        
        }
        if(state.over && !this.calledOver){
            $('#lose').remove();

            this.calledOver=true;
            let loseDiv = document.createElement('div');
            loseDiv.innerHTML = "YOU LOST :(";
            loseDiv.id='lose';
            loseDiv.style.color = 'red';
            loseDiv.style.fontSize = '100px';
            loseDiv.style.fontFamily = 'monospace';


            $('#game').append(loseDiv);      
        }
        
    }

    updateModel(action){
        if(action === 'startOver'){
            this.model.setupNewGame();
            this.calledOver=false;
            this.calledWon=false;

        } else if (!this.model.state.over && !this.model.state.won){
            this.model.move(action);
        }
        this.updateView(this.model.state);
        // if(this.model.getGameState().lose){
        //     this.view.loseView();
        // }
    }

}