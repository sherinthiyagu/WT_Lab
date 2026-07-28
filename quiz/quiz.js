const quiz = [

{
category:"HTML",
question:"Which HTML element is used to define navigation links?",
options:["<header>","<nav>","<section>","<aside>"],
answer:1
},

{
category:"HTML",
question:"Which attribute specifies alternative text for an image?",
options:["src","alt","title","href"],
answer:1
},

{
category:"HTML",
question:"Which HTML5 element is used to embed audio content?",
options:["<media>","<music>","<audio>","<sound>"],
answer:2
},

{
category:"HTML",
question:"Which tag is used to create a numbered list?",
options:["<ul>","<ol>","<dl>","<li>"],
answer:1
},

{
category:"HTML",
question:"Which input type hides the entered characters?",
options:["text","password","email","hidden"],
answer:1
},

{
category:"CSS",
question:"Which property is used to create a Flexbox container?",
options:["display:flex","display:grid","position:flex","float:flex"],
answer:0
},

{
category:"CSS",
question:"Which CSS property controls the space outside an element?",
options:["padding","margin","border","spacing"],
answer:1
},

{
category:"CSS",
question:"Which property changes the text color?",
options:["font-color","text-color","color","foreground"],
answer:2
},

{
category:"CSS",
question:"Which value of position places an element relative to the browser window?",
options:["relative","absolute","fixed","static"],
answer:2
},

{
category:"CSS",
question:"Which property creates rounded corners?",
options:["corner-radius","radius","border-radius","round"],
answer:2
},

{
category:"JavaScript",
question:"Which keyword is used to declare a block-scoped variable?",
options:["var","const","let","both let and const"],
answer:3
},

{
category:"JavaScript",
question:"Which function displays a message box?",
options:["print()","alert()","display()","message()"],
answer:1
},

{
category:"JavaScript",
question:"Which method writes content to the browser console?",
options:["console.write()","console.print()","console.log()","log.console()"],
answer:2
},

{
category:"JavaScript",
question:"Which operator checks both value and data type?",
options:["=","==","===","!="],
answer:2
},

{
category:"JavaScript",
question:"Which event occurs when a button is clicked?",
options:["onchange","onmouseover","onclick","onload"],
answer:2
},

{
category:"Basics",
question:"What does HTTP stand for?",
options:[
"Hyper Text Transfer Protocol",
"High Transfer Text Process",
"Hyper Transfer Text Program",
"Home Text Transfer Protocol"
],
answer:0
},

{
category:"Basics",
question:"Which protocol provides secure communication over the web?",
options:["FTP","SMTP","HTTPS","POP3"],
answer:2
},

{
category:"Basics",
question:"Which software interprets HTML and displays web pages?",
options:["Compiler","Browser","Editor","Server"],
answer:1
},

{
category:"Basics",
question:"Which device connects a local network to the Internet?",
options:["Switch","Hub","Router","Repeater"],
answer:2
},

{
category:"Basics",
question:"Which language is primarily responsible for the structure of a web page?",
options:["CSS","JavaScript","HTML","PHP"],
answer:2
}

];

let currentQuestion = 0;

let userAnswers = new Array(quiz.length).fill(null);

let score = 0;
const homePage = document.getElementById("homePage");
const quizPage = document.getElementById("quizPage");
const resultPage = document.getElementById("resultPage");

const startBtn = document.getElementById("startBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const questionCount = document.getElementById("questionCount");
const categoryName = document.getElementById("categoryName");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const progressBar = document.getElementById("progressBar");

startBtn.addEventListener("click",function(){

    shuffleQuestions();

    homePage.style.display="none";

    quizPage.style.display="flex";

    loadQuestion();

});

function shuffleQuestions(){

    for(let i=quiz.length-1;i>0;i--){

        let j=Math.floor(Math.random()*(i+1));

        [quiz[i],quiz[j]]=[quiz[j],quiz[i]];

    }

}
function loadQuestion(){

    questionCount.innerHTML="Question "+(currentQuestion+1)+" / "+quiz.length;

    categoryName.innerHTML=quiz[currentQuestion].category;

    questionText.innerHTML=quiz[currentQuestion].question;

    progressBar.style.width=((currentQuestion+1)/quiz.length)*100+"%";

    optionsContainer.innerHTML="";

    quiz[currentQuestion].options.forEach(function(option,index){

        const label=document.createElement("label");

        label.className="option";

        const radio=document.createElement("input");

        radio.type="radio";

        radio.name="answer";

        radio.value=index;

        if(userAnswers[currentQuestion]===index){

            radio.checked=true;

            label.classList.add("selected");

        }

        radio.addEventListener("change",function(){

            userAnswers[currentQuestion]=index;

            document.querySelectorAll(".option").forEach(function(item){

                item.classList.remove("selected");

            });

            label.classList.add("selected");

        });

        label.appendChild(radio);
        const span = document.createElement("span");
        span.textContent = option;
        label.appendChild(span);

        optionsContainer.appendChild(label);

    });

    previousBtn.disabled=currentQuestion===0;

    if(currentQuestion===quiz.length-1){

        nextBtn.innerHTML="Submit";

    }

    else{

        nextBtn.innerHTML="Next";

    }

}

previousBtn.addEventListener("click",function(){

    if(currentQuestion>0){

        currentQuestion--;

        loadQuestion();

    }

});

nextBtn.addEventListener("click",function(){

    if(userAnswers[currentQuestion]===null){

        alert("Please select an answer.");

        return;

    }

    if(currentQuestion<quiz.length-1){

        currentQuestion++;

        loadQuestion();

    }

    else{

        calculateResult();

    }

});

const finalScore=document.getElementById("finalScore");
const percentage=document.getElementById("percentage");
const grade=document.getElementById("grade");
const reviewContainer=document.getElementById("reviewContainer");

function calculateResult(){

    score=0;

    quiz.forEach(function(q,index){

        if(userAnswers[index]===q.answer){

            score++;

        }

    });

    quizPage.style.display="none";

    resultPage.style.display="flex";

    finalScore.innerHTML=score+" / "+quiz.length;

    let percent=Math.round((score/quiz.length)*100);

    percentage.innerHTML=percent+"%";

    if(percent>=90){

        grade.innerHTML="Grade : A+";

    }

    else if(percent>=80){

        grade.innerHTML="Grade : A";

    }

    else if(percent>=70){

        grade.innerHTML="Grade : B";

    }

    else if(percent>=60){

        grade.innerHTML="Grade : C";

    }

    else{

        grade.innerHTML="Grade : Fail";

    }

    createPieChart();

    showAnalysis();

    showReview();

}

function createPieChart(){

    let html=0;
    let css=0;
    let js=0;
    let basics=0;

    quiz.forEach(function(q,index){

        if(userAnswers[index]===q.answer){

            if(q.category==="HTML") html++;

            else if(q.category==="CSS") css++;

            else if(q.category==="JavaScript") js++;

            else basics++;

        }

    });

    let oldChart=Chart.getChart("pieChart");

    if(oldChart){

        oldChart.destroy();

    }

    new Chart(document.getElementById("pieChart"),{

        type:"pie",

        data:{

            labels:["HTML","CSS","JavaScript","Basics"],

            datasets:[{

                data:[html,css,js,basics],

                backgroundColor:[
                    "#1565C0",
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726"
                ]

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    position:"bottom"

                }

            }

        }

    });

}

function showAnalysis(){

    let html=0;
    let css=0;
    let js=0;
    let basics=0;

    quiz.forEach(function(q,index){

        if(userAnswers[index]===q.answer){

            if(q.category==="HTML") html++;

            else if(q.category==="CSS") css++;

            else if(q.category==="JavaScript") js++;

            else basics++;

        }

    });

    document.getElementById("analysisContent").innerHTML=`

    <div class="analysis-card">
        <h3>HTML</h3>
        <p>${html} / 5 Correct</p>
    </div>

    <div class="analysis-card">
        <h3>CSS</h3>
        <p>${css} / 5 Correct</p>
    </div>

    <div class="analysis-card">
        <h3>JavaScript</h3>
        <p>${js} / 5 Correct</p>
    </div>

    <div class="analysis-card">
        <h3>Web Basics</h3>
        <p>${basics} / 5 Correct</p>
    </div>

    `;

}

function escapeHTML(text){

    return text
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;");

}

function showReview(){

    let html="";

    quiz.forEach(function(q,index){

        html+=`
        <div class="review-question">

            <h3>Q${index+1}. ${q.question}</h3>
        `;

        q.options.forEach(function(option,optionIndex){

            let className="review-option";

            if(optionIndex===q.answer){

                className+=" correct";

            }

            if(userAnswers[index]===optionIndex && optionIndex!==q.answer){

                className+=" wrong";

            }

            html+=`
            <div class="${className}">
                     ${escapeHTML(option)}
                     </div>
                     `;

        });

        html+=`</div>`;

    });

    reviewContainer.innerHTML=html;

}

retryBtn.addEventListener("click",function(){

    currentQuestion=0;

    score=0;

    shuffleQuestions();

    userAnswers=new Array(quiz.length).fill(null);

    resultPage.style.display="none";

    homePage.style.display="flex";

});