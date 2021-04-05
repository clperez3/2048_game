/*
Add your code for Game here
 */
export default class Game {
    constructor(h){
        this.winCalls= [];
        this.loseCalls= [];
        this.moveCalls= [];

        let sboard = [];
        for(let i = 0; i < h; i++){
            for(let j = 0; j<h; j++){
                sboard[i+h*j] = 0;
            }
        }
        this.state = {};
        this.state.board = sboard;
        this.state.score = 0;
        this.state.won = false;
        this.state.over = false;

        //init board with 2 tiles.
        this.addTile();
        this.addTile();

    }
    
    addTile(){
        let p = Math.random();
        //90 vs 10 percent chance 
        let tile = 0;
        if (p<.9){
            tile = 2;
        } else {
            tile = 4;   
        }
        let h = this.state.board.length;
        let i = Math.floor(Math.random()*h);
        let j = Math.floor(Math.random()*h);

        while(this.state.board[i+h*j]!==0){
            i = Math.floor(Math.random()*h);
            j = Math.floor(Math.random()*h);
        }
        this.state.board[i+h*j] = tile;
    }


    setupNewGame(){
        for (let i=0; i<this.state.board.length; i++){
            this.state.board[i]=0;
        }
        this.state.score =0;
        this.state.won = false;
        this.state.over = false;
        
        this.addTile();
        this.addTile();

    }

    loadGame(gameState){
        this.state = gameState;
    }

    move(direction){
        
        let hasMoved = false;
        let h = Math.sqrt(this.state.board.length);
        let board = this.state.board;

        if (direction === "left"){
            
            for (let j=0; j<h; j++){
                for(let i=0; i<h-1; i++){
                    //collapse all
                    let finder = i+1;
                    while(board[finder+j*h]===0 && finder<h-1){
                        finder++;
                    }
                    if(board[finder+j*h] === board[i+j*h] && board[i+j*h] !== 0){
                        board[i+h*j] += board[i+h*j];
                        this.state.score += board[i+h*j];
                        board[finder+h*j] = 0;
                        hasMoved = true;
                        if (board[i+h*j] === 2048){
                        this.won();
                        }                        
                    }
                    
                }
                //slide - if it isn't zero, bubble it down
                for (let i=1; i<h; i++){
                    if(board[i+h*j] !== 0){
                        let push = i-1;
                        while (board[push+h*j]===0 && push>=0){
                            board[push+h*j] = board[push+1+h*j];
                            board[push+1+h*j]=0
                            push--;
                            hasMoved = true;

                        }
                    } 
                 }
                 
            }
            
        } else if (direction === "up"){
            for (let i=0; i<h; i++){
                for(let j=0; j<h-1; j++){
                    //collapse all
                    let finder = j+1;

                    while(board[i+finder*h]===0 && finder<h-1){
                        finder++;
                    }
                    if(board[i+finder*h] === board[i+j*h] && board[i+j*h] !== 0){
                        board[i+h*j] += board[i+h*j];
                        this.state.score += board[i+h*j];
                        board[i+h*finder] = 0;
                        hasMoved = true;
                        if (board[i+h*j] === 2048){                            
                            this.won();
                        }
                    }
                    
                }
                //slide - if it isn't zero, bubble it down
                for (let j=1; j<h; j++){
                    if(board[i+h*j] !== 0){
                        let push = j-1;
                        while (board[i+h*push]===0 && push>=0){
                            board[i+h*push] = board[i+h*(push+1)];
                            board[i+h*(push+1)]=0
                            push--;
                            hasMoved = true;                       

                        } 
                    } 
                 }
            }

        } else if (direction === "right"){
            for (let j=0; j<h; j++){
                for(let i=h-1; i>0; i--){
                    //collapse all       
                        let finder = i-1;
                        while(board[finder+j*h]===0 && finder>0){
                            finder--;
                        }
                        if(board[finder+j*h] === board[i+j*h] && board[i+j*h]!=0){
                            board[i+h*j] += board[i+h*j];
                            this.state.score += board[i+h*j];
                            board[finder+h*j] = 0;
                            hasMoved = true;
                            if (board[i+h*j] === 2048){
                                this.won();
                            }
                        }
                    }
                
                //slide - if it isn't zero, bubble it down
                for (let i=h-2; i>=0; i--){
                    if(board[i+h*j] !== 0){
                        let push = i+1;
                        while (board[push+h*j]===0 && push<h){
                            board[push+h*j] = board[(push-1)+h*j];
                            board[(push-1)+h*j]=0
                            push++;
                            hasMoved = true;                       
                        } 
                    } 
                }
            }
        } else if (direction === "down"){
            for (let i=0; i<h; i++){
                for(let j=h-1; j>0; j--){
                    //collapse all
                    let finder = j-1;

                    while(board[i+finder*h]===0 && finder>0){
                        finder--;
                    }
                    if(board[i+finder*h] === board[i+j*h] && board[i+j*h]!==0){
                        board[i+h*j] += board[i+h*j];
                        this.state.score += board[i+h*j];
                        board[i+h*finder] = 0;
                        hasMoved = true;
                        if (board[i+h*j] === 2048){
                            this.won();
                        }
                    }
                }
                
                //slide - if it isn't zero, bubble it down
                for (let j=h-2; j>=0; j--){
                    if(board[i+h*j] !== 0){
                        let push = j+1;
                        while (board[i+h*push]===0 && push<h){
                            board[i+h*push] = board[i+h*(push-1)];
                            board[i+h*(push-1)]=0
                            push++;
                            hasMoved = true;                       
                        } 
                    } 
                 }
            }
            
        }
        
        if(hasMoved){
            this.addTile();
            for(let i =0; i<this.moveCalls.length; i++){
                this.moveCalls[i](this.state);
            }
            
        }
        let anyZero = false;
        for (let i=0; i<this.state.board.length; i++){
            if(this.state.board[i]===0){
                anyZero=true;
            }            
        }
        if (!anyZero ){
            let movesAvailable = false;
            for(let i=0; i<h-1; i++){
                for(let j=0;j<h;j++){
                    if(board[i+j*h]===board[i+1+j*h]){
                        movesAvailable=true;
                    }
                }
            }
            for(let j=0; j<h-1; j++){
                for(let i=0;i<h;i++){
                    if(board[i+j*h]===board[i+(j+1)*h]){
                        movesAvailable=true;
                    }
                }
            }
            if(!movesAvailable){
                this.over();
            }     
        }
    }

    toString(){
        let h = Math.sqrt(this.state.board.length);
        let toReturn = "";
        for (let j=0; j< h; j++){
            for(let i=0; i< h; i++){
                toReturn += ("[" + this.state.board[i + h*j] + "] ");
                //toReturn += (String.fromCharCode(91) + this.state.board[i+j*h] + String.fromCharCode(93) + String.fromCharCode(32));
            }
            toReturn += String.fromCharCode(10);
        }
        return toReturn;
        
    }

    onMove(callback){
        this.moveCalls.push(callback);
        
        
    }
    onWin(callback){
        this.winCalls.push(callback);       
    }
    onLose(callback){
        this.loseCalls.push(callback);
    }

    getGameState(){
        return this.state;
    }

    won(){
        this.state.won = true;
        for(let i =0; i<this.winCalls.length; i++){
            this.winCalls[i](this.state);
        }
        
        
    }

    over(){
        this.state.over = true;

        for(let i =0; i<this.loseCalls.length; i++){
            this.loseCalls[i](this.getGameState());
        } 
        
    }

    getCell(row, col){
        return i+j*4;
    }
}