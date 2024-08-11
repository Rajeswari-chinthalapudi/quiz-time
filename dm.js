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
          restart_quiz.innerHTML='<a id="1" href="certi_dm.php">get certificate</a>';
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

    window.location.href = "book_dm.html";  
}





/*data mining  easy level*/

let questions=[ [
    {
    numb: 1,
    question: "In data mining, how many categories of functions are included?",
    answer: "2",
    options: [
        "5",
        "4",
        "2",
        "3"
    ]
  },
  {
    numb: 2,
    question: "For what purpose, the analysis tools pre-compute the summaries of the huge amount of data?",
    answer: "To obtain the queries response",
    options: [
        "In order to maintain consistency",
        "For authentication",
        "For data access",
        "To obtain the queries response"
  
       
    ]
  },
  {
    numb: 3,
    question: "What are the functions of Data Mining?",
    answer: "All of the above",
    options: [
        "Association and correctional analysis classification",
        "Prediction and characterization",
        "Cluster analysis and Evolution analysis",
        "All of the above"
      
    ]
  },
  {
    numb: 4,
    question: "Which of the following is an essential process in which the intelligent methods are applied to extract data patterns?",
    answer: "Data Mining",
    options: [
        "Warehousing",
        "Data Mining",
        "Text Mining",
        "Data Selection"
    ]
  },
  {
    numb: 5,
    question: "What is KDD in data mining?",
    answer: "Knowledge Discovery Database",
    options: [
        "Knowledge Discovery Database",
        "Knowledge Discovery Data",
        "Knowledge Data definition",
        "Knowledge data house"
    ]
  },
  {
    numb: 6,
    question: "For what purpose, the analysis tools pre-compute the summaries of the huge amount of data?",
    answer: "To obtain the queries response",
    options: [
        "In order to maintain consistency",
        "For authentication",
        "For data access",
        "To obtain the queries response"
    ]
  },
  {
    numb: 7,
    question: "What are the functions of Data Mining?",
    answer: "All of the above",
    options: [
        "Association and correctional analysis classification",
        "Prediction and characterization",
        "Cluster analysis and Evolution analysis",
        "All of the above"
    ]
  },
  {
    numb: 8,
    question: "Which one of the clustering technique needs the merging approach?",
    answer: "Hierarchical",
    options: [
        "Partitioned",
        "Naïve Bayes",
        "Hierarchical",
        "Both A and C"
        
    ]
  },
  {
    numb: 9,
    question: "The self-organizing maps can also be considered as the instance of _________ type of learning.",
    answer: "Unsupervised learning",
    options: [
        "Supervised learning",
        "Unsupervised learning",
        "Missing data imputation",
        "Both A & C"
    ]
  },
  {
    numb: 10,
    question: "In the example predicting the number of newborns, the final number of total newborns can be considered as the _________",
    answer: "Outcome",
    options: [
        "Features",
        "Outcome",
        "Attribute",
        "Observation"
    ]
  }
  
  ],
  /* data mining medium level*/
  [
    {
    numb: 1,
    question: "Which of the following can be considered as the classification or mapping of a set or class with some predefined group or classes?",
    answer: "Data Discrimination",
    options: [
        "Data Discrimination",
        "Data set",
        "Data Characterization",
        "Data Sub Structure"
    ]
  },
  {
    numb: 2,
    question: "The analysis performed to uncover the interesting statistical correlation between associated -attributes value pairs are known as the _______.?",
    answer: "Mining of correlation",
    options: [
        "Mining of association",
        "Mining of correlation",
        "Mining of clusters",
        "All of the above"
    ]
  },
  {
    numb: 3,
    question: " Which one of the following can be defined as the data object which does not comply with the general behavior (or the model of available data)?",
    answer: "Outliner Analysis",
    options: [
        "Evaluation Analysis",
        "Outliner Analysis",
        "Classification",
        "Prediction"
    ]
  },
  {
    numb: 4,
    question: "Which one of the following statements is not correct about the data cleaning?",
    answer: "All of the above",
    options: [
        "It refers to the process of data cleaning",
        "It refers to the transformation of wrong data into correct data",
        "It refers to correcting inconsistent data",
        "All of the above"
    ]
  },
  {
    numb: 5,
    question: "The classification of the data mining system involves:?",
    answer: "All of the above",
    options: [
        "Database technology",
        "Information Science",
        "Machine learning",
        "All of the above"
    ]
  },
  {
    numb: 6,
    question: "In order to integrate heterogeneous databases, how many types of approaches are there in the data warehousing?",
    answer: "2",
    options: [
        "3",
        "4",
        "5",
        "2"
    ]
  },
  {
    numb: 7,
    question: "The issues like efficiency, scalability of data mining algorithms comes under_______",
    answer: "Performance issues",
    options: [
        "Performance issues",
        "Diverse data type issues",
        "Mining methodology and user interaction",
        "All of the above"
    ]
  },
  {
    numb: 8,
    question: "Which of the following is the correct advantage of the Update-Driven Approach?",
    answer: "Both A and B",
    options: [
        "This approach provides high performance.",
        "The data can be copied, processed, integrated, annotated, summarized and restructured in the semantic data store in advance.",
        "Both A and B",
        "None of the above"
    ]
  },
  {
    numb: 9,
    question: "Which of the following statements about the query tools is correct?",
    answer: "Tools developed to query the database",
    options: [
        "Tools developed to query the database",
        "Attributes of a database table that can take only numerical values",
        "Both and B",
        "None of the above"
    ]
  },
  {
    numb: 10,
    question: " Which one of the following refers to the model regularities or to the objects that trends or not consistent with the change in time?",
    answer: "Evolution analysis",
    options: [
        "Prediction",
        "Evolution analysis",
        "Classification",
        "Both A and B"
    ]
  }
  ],
  /*data mining hard level*/
   [
    {
    numb: 1,
    question: "The issues like 'handling the rational and complex types of data' comes under which of the following category?",
    answer: "Diverse Data Type",
    options: [
        "Diverse Data Type",
        "Mining methodology and user interaction Issues",
        "Performance issues",
        "All of the above"
    ]
  },
  {
    numb: 2,
    question: " Which of the following also used as the first step in the knowledge discovery process?",
     
    answer: "Data cleaning",
    options: [
        "Data selection",
        "Data cleaning",
        "Data transformation",
        "Data integration"
    ]
  },
  {
    numb: 3,
    question: "Which of the following refers to the steps of the knowledge discovery process, in which the several data sources are combined?",
    answer: "Data integration",
    options: [
        "Data selection",
        "Data cleaning",
        "Data transformation",
        "Data integration"
    ]
  },
  {
    numb: 4,
    question: " Which of the following is generally used by the E-R model to represent the weak entities?",
    answer: "Doubly outlined rectangle",
    options: [
        "Diamond",
        "Doubly outlined rectangle",
        "Dotted rectangle",
        "Both B & C"
    ]
  },
  {
    numb: 5,
    question: "Which one of the following issues must be considered before investing in data mining?",
    answer: "All of the above",
    options: [
        "Compatibility",
        "Functionality",
        "Vendor consideration",
        "All of the above"
    ]
  },
  {
    numb: 6,
    question: "The term 'DMQL' stands for _____",
    answer: "Data Mining Query Language",
    options: [
        "Data Marts Query Language",
        "DBMiner Query Language",
        "Data Mining Query Language",
        "None of the above"
    ]
  },
  {
    numb: 7,
    question: "In certain cases, it is not clear what kind of pattern need to find, data mining should_________:",
    answer: "It may allow interaction with the user so that he can guide the mining process",
    options: [
        "Try to perform all possible tasks",
        "Perform both predictive and descriptive task",
        "It may allow interaction with the user so that he can guide the mining process",
        "All of the above"
    ]
  },
  {
    numb: 8,
    question: " Which of the following refers to the problem of finding abstracted patterns (or structures) in the unlabeled data?",
    answer: "Unsupervised learning",
    options: [
        "Supervised learning",
        "Unsupervised learning",
        "Hybrid learning",
        "Reinforcement learning"
    ]
  },
  {
    numb: 9,
    question: "Which one of the following refers to querying the unstructured textual data?",
    
    answer: "Information retrieval",
    options: [
        "Information access",
        "Information update",
        "Information retrieval",
        "Information manipulation"
    ]
  },
  {
    numb: 10,
    question: "What is KDD in data mining?",
    answer: "Knowledge Discovery Database",
    options: [
        "Knowledge Discovery Database",
        "Knowledge Discovery Data",
        "Knowledge Data definition",
        "Knowledge data house"
    ]
  }
  ]];
  
