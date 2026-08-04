
let display = document.getElementById("display");


let expression = "";


let buttons = document.querySelectorAll("button");


buttons.forEach(function(button){

    button.onclick = function(){

        let value = button.innerText;

        
        if(value == "×"){
            value = "*";
        }

        if(value == "÷"){
            value = "/";
        }

        if(value == "="){

            try{
                expression = eval(expression).toString();
                display.value = expression;
            }
            catch{
                display.value = "Error";
                expression = "";
            }

        }

        else if(value == "C"){

            expression = "";
            display.value = "";

        }

        
        else if(value == "CE"){

            expression = "";
            display.value = "";

        }

       
        else if(value == "⌫"){

            expression = expression.slice(0,-1);
            display.value = expression;

        }

       
        else if(value == "x²"){

            expression = (Number(expression) * Number(expression)).toString();
            display.value = expression;

        }

       
        else if(value == "√"){

            expression = Math.sqrt(Number(expression)).toString();
            display.value = expression;

        }

       
        else if(value == "1/x"){

            expression = (1 / Number(expression)).toString();
            display.value = expression;

        }

       
        else if(value == "%"){

            expression = (Number(expression) / 100).toString();
            display.value = expression;

        }

      
        else if(value == "±"){

            expression = (-Number(expression)).toString();
            display.value = expression;

        }

        
        else{

            expression += value;
            display.value = expression;

        }

    };

});