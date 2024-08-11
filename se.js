//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    
}

let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let level=0;
let score1=0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");





// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;

    
    showQuetions(que_count); //calling showQestions function

 
if(level==1)
{
  b.innerHTML="MEDIUM";
}
else
{
  b.innerHTML="HARD";
}

    
    queCounter(que_numb); //passing que_numb value to queCounter
     
    
    
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions[level].length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
   
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[level][index].numb + ". " + questions[level][index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[level][index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[level][index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[level][index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[level][index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}








// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[level][que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore >= questions[level].length-5){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions[level].length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
        level=level+1;
        score1=userScore;
        if(level<=2){
        restart_quiz.innerHTML="next level";}
        else{
            restart_quiz.innerHTML='<a id="1" href="certi_se.php">get certificate</a>';
        }
       
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>You got <p>'+ userScore +'</p> out of <p>'+ questions[level].length +'</p></span>';
        scoreText.innerHTML = scoreTag;
        restart_quiz.innerHTML="prev level";
       


    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions[level].length+'</p></span>';
        scoreText.innerHTML = scoreTag;
        restart_quiz.innerHTML="prev level";
       
        
    }
}




function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions[level].length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}



function books(){

    window.location.href = "book_se.html";  
}






/* easy level*/

let questions = [[
    {
    numb: 1,
    question: " What is the first step in the software development lifecycle?",
    answer: "Preliminary Investigation and Analysis",
    options: [
        "System Design",
        "Coding",
        "Preliminary Investigation and Analysis",
        "System Testing"
    ]
  },
  {
    numb: 2,
    question: "What does the study of an existing system refer to?",
    answer: "System Analysis",
    options: [
        "System Analysis",
        "Details of DFD",
        "Feasibility Study",
        "System Planning"
  
       
    ]
  },
   {
    numb: 3,
    question: " Which of the following is involved in the system planning and designing phase of the Software Development Life Cycle (SDLC)?",
    answer: "All of the above",
    options: [
        "Sizing",
        "Parallel run",
        "Specification freeze",
        "All of the above"
    ]
  },
   {
    numb: 4,
    question: "What does RAD stand for?",
    answer: "Rapid Application Development",
    options: [
        "Rapid Application Document",
        "Rapid Application Development",
        "Relative Application Development",
        "None of the above"
    ]
  },
   {
    numb: 5,
    question: " What is the major drawback of the Spiral Model?",
    answer: "Doesn't work well for smaller projects",
    options: [
        "Higher amount of risk analysis",
        "Additional functionalities are added later on",
        "Strong approval and documentation control",
        "Doesn't work well for smaller projects"
    ]
  },
   {
    numb: 6,
    question: "Which of the following models doesn't necessitate defining requirements at the earliest in the lifecycle?",
    answer: "Spiral & Prototyping",
    options: [
        "Spiral & Prototyping",
        "RAD & Waterfall",
        "Prototyping & Waterfall",
        "Spiral & RAD"
    ]
  },
   {
    numb: 7,
    question: "Which of the following is an example of Black Box and Functional Processing?",
    answer: "Fourth Generation Language",
    options: [
        "First Generation Language",
        "Second Generation Language",
        "Third Generation Language",
        "Fourth Generation Language"
    ]
  },
   {
    numb: 8,
    question: "Which of the following activities of the generic process framework delivers a feedback report?",
    answer: "Deployment",
    options: [
        "Deployment",
        "Planning",
        "Modeling",
        "Construction"
    ]
  },
   {
    numb: 9,
    question: "Which of the following refers to internal software equality?",
    answer: "Reusability",
    options: [
        "Scalability",
        "Reusability",
        "Reliability",
        "Usability"
    ]
  },
  {
    numb: 10,
    question: "Which one of the following activities is not recommended for software processes in software engineering?",
    answer: "Software Verification",
    options: [
        "Software Evolution",
        "Software Testing & Validation",
        "Software designing",
        "Software Verification"
        ]}
 
  ],


  /*medium level*/
  [
    {
    numb: 1,
    question: "The agile software development model is built based on __________.",
    answer: "Both Incremental and Iterative Development",
    options: [
        "Linear Development",
        "Incremental Development",
        "Iterative Development",
        "Both Incremental and Iterative Development"
    ]
  },
   {
    numb: 2,
    question: "Which of the following activities is not applicable to agile software development?",
    answer: "Abolishing the project planning and testing.",
    options: [
        "Producing only the essential work products.",
        "Utilizing the strategy of incremental product delivery.",
        "Abolishing the project planning and testing.",
        "All of the above"
    ]
  },
   {
    numb: 3,
    question: " Which of the following framework activities are carried out in Adaptive Software Development (ASD)?",
    answer: "Assumption, Association, Learning",
    options: [
        "The investigation, Strategy, Coding",
        "Requirements gathering, Adaptive cycle planning, Iterative development",
        "Assumption, Association, Learning",
        "All of the above"
    ]
  },
   {
    numb: 4,
    question: "The __________ model helps in representing the system's dynamic behavior.",
    answer: "Behavioral Model",
    options: [
        "Behavioral Model",
        "Object Model",
        "Context Model",
        "Data Model"
    ]
  },
   {
    numb: 5,
    question: "The __________ and __________ are the two major dimensions encompassed in the Spiral model.",
    answer: "Radial, Angular",
    options: [
        "Diagonal, Perpendicular",
        "Perpendicular, Radial",
        "Angular, diagonal",
        "Radial, Angular"
    ]
  },
   {
    numb: 6,
    question: "Which of the following technique is involved in certifying the sustained development of legacy systems?",
    answer:"Reverse engineering and Reengineering",
    options: [
        "Reverse engineering and Reengineering",
        "Reengineering",
        "Forward engineering",
        "Reverse engineering"
    ]
  },
   {
    numb: 7,
    question: "An erroneous system state that results in an unexpected system behavior is acknowledged as?",
    answer: "System error",
    options: [
        "System failure",
        "Human error or mistake",
        "System error",
        "System fault"
    ]
  },
   {
    numb: 8,
    question: " What is the name of the approach that follows step-by-step instructions for solving a problem?",
    answer: "An Algorithm",
    options: [
        "An Algorithm",
        "A Plan",
        "A List",
        "Sequential Structure"
    ]
  },
   {
    numb: 9,
    question: "Which of the following word correctly summarized the importance of software design?",
    answer: "Quality",
    options: [
        "Complexity",
        "Quality",
        "Efficiency",
        "Accuracy"
    ]
  },
   {
    numb: 10,
    question: "What does a directed arc or line signify?",
    answer: "Data Flow",
    options: [
        "Data Flow",
        "Data Process",
        "Data Stores",
        "None of the above"
    ]
  }
   
  
  ],
  /* hard level*/
  [
    {
    numb: 1,
    question: "__________ is not a direct measure of SE process.",
    answer: "Efficiency",
    options: [
        "Effort",
        "Cost",
        "Efficiency",
        "All of the Above"
    ]
  },
   {
    numb: 2,
    question: "What is the main task of project indicators?",
    answer: "To evaluate the ongoing project's status and track possible risks.",
    options: [
        "To evaluate the ongoing project's status and track possible risks.",
        "To evaluate the ongoing project's status.",
        "To track potential risks.",
        "None of the Above"
    ]
  },
   {
    numb: 3,
    question: "Name the graphical practice that depicts the meaningful changes that occurred in metrics data.",
    answer: "Control Chart",
    options: [
        "Function point analysis",
        "Control Chart",
        "DRE (Defect Removal Efficiency)",
        "None of the above"
    ]
  },
   {
    numb: 4,
    question: "Which parameters are essentially used while computing the software development cost?",
    answer: "All of the above",
    options: [
        "Hardware and Software Costs",
        "Effort Costs",
        "Travel and Training Costs",
        "All of the above"
    ]
  },
   {
    numb: 5,
    question: "Which of the following is an incorrect activity for the configuration management of a software system?",
    answer: "Internship management",
    options: [
        "Change management",
        "System management",
        "Internship management",
        "Version management"
    ]
  },
   {
    numb: 6,
    question: "Which of the following is not included in the total effort cost?",
    answer: "Costs of lunch time food",
    options: [
        "Costs of lunch time food",
        "Costs of support staff",
        "Costs of networking and communications",
        "Costs of air conditioning and lighting in the office space"
    ]
  },
   {
    numb: 7,
    question: "What is developed by utilizing the historical cost function?",
    answer: "Algorithmic cost modeling",
    options: [
        "Parkinson's Law",
        "Expert judgment",
        "Algorithmic cost modeling",
        "Estimation by analogy"
    ]
  },
   {
    numb: 8,
    question: "Which of the following model has a misconception that systems are built by utilizing reusable components, scripts, and database programs?",
    answer: "An application-composition model",
    options: [
        "The reuse model",
        "An early designed model",
        "An application-composition model",
        "A post architecture model"
    ]
  },
   {
    numb: 9,
    question: "Which of the following is used to predict the effort as a function of LOC or FP?",
    answer: "Both COCOMO and FP-based estimation",
    options: [
        "COCOMO",
        "FP-based estimation",
        "Both COCOMO and FP-based estimation",
        "Process-based estimation"
    ]
  },
   {
    numb: 10,
    question: "Which of the following threatens the quality and timeliness of the produced software?",
    answer: "Technical risks",
    options: [
        "Business risks",
        "Potential risks",
        "Known risks",
        "Technical risks"
    ]
  }
  
  ]];
  
