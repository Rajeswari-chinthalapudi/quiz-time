

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
        userScore=0;
        
        if(level<=2){
        restart_quiz.innerHTML="next level";
          
      }
        else{
          restart_quiz.innerHTML='<a id="1" href="certi_os.php">get certificate</a>';
          
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

    window.location.href = "book_p.html";  
}

function home(){

  window.location.href = "quiz.php";  
}



/*operating system easy*/
let questions= [[
  {
  numb: 1,
  question: "Which of the following is not an operating system?",
  answer: "Oracle",
  options: [
      "Windows",
      "Linux",
      "Oracle",
      "DOS"
  ]
},
{
  numb: 2,
  question: "What is the maximum length of the filename in DOS?",
  answer: "8",
  options: [
      "4",
      "5",
      "12",
      "8"
  ]
},
{
  numb: 3,
  question: "When was the first operating system developed?",
  answer: "1950",
  options: [
      "1950",
      "1948",
      "1949",
      "1951"
  ]
},
{
  numb: 4,
  question: "When were MS windows operating systems proposed?",
  answer: "1985",
  options: [
      "1994",
      "1990",
      "1985",
      "1992"
  ]
},
{
  numb: 5,
  question: "Which of the following is the extension of Notepad?",
  answer: ".txt",
  options: [
      ".xls",
      ".txt",
      ".ppt",
      ".ppt"
  ]
},
{
  numb: 6,
  question: "What else is a command interpreter called?",
  answer: "shell",
  options: [
      "prompt",
      "kernel",
      "command",
      "shell"
  ]
},
{
  numb: 7,
  question: "What is the full name of FAT?",
  answer: "File allocation table",
  options: [
      "File allocation table",
      "File attribute table",
      "Font attribute table",
      "Format allocation table"
  ]
},
{
  numb: 8,
  question: "BIOS is used?",
  answer: "By operating system",
  options: [
      "By compiler",
      "By operating system",
      "By interpreter",
      "By application software"
  ]
},
{
  numb: 9,
  question: "What is the mean of the Booting in the operating system?",
  answer: "Restarting computer",
  options: [
      "Install the program",
      "Restarting computer",
      "To scan",
      "To turn off"
  ]
},
{
  numb: 10,
  question: "When does page fault occur?",
  answer: "The page does not present in memory.",
  options: [
      "The page does not present in memory.",
      "The page is present in memory.",
      "The deadlock occurs.",
      "The buffering occurs."
  ]
}
],
[
  {
  numb: 1,
  question: "Banker's algorithm is used?",
  answer: "To prevent deadlock",
  options: [
      "To deadlock recovery",
      "To solve the deadlock",
      "None of these",
      "To prevent deadlock"
  ]
},
{
  numb: 2,
  question: "When you delete a file in your computer, where does it go?",
  answer: "Recycle bin",
  options: [
      "Hard disk",
      "Taskbar",
      "Magnetic disk",
      "Recycle bin"
  ]
},
{
  numb: 3,
  question: "Which is the Linux operating system?",
  answer: "Open-source operating system",
  options: [
      "Private operating system",
      "Windows operating system",
      "Open-source operating system",
      "None of these"
  ]
},
{
  numb: 4,
  question: "What is the full name of the DSM?",
  answer: "Distributed shared memory",
  options: [
      "Direct system module",
      "Direct system memory",
      "Distributed shared memory",
      "Demoralized system memory"
  ]
},
{
  numb: 5,
  question: "What is the full name of the IDL?",
  answer: "Interface definition language",
  options: [
      "Interface direct language",
      "Interface data library",
      "Interface definition language",
      "None of these"
  ]
},
{
  numb: 6,
  question: "What is bootstrapping called?",
  answer: "Cold boot",
  options: [
      "Cold hot boot",
      "Cold boot",
      "Cold hot strap",
      "Hot boot"
  ]
},
{
  numb: 7,
  question: "What is the fence register used for?",
  answer: "To memory protection",
  options: [
      "To memory protection",
      "To disk protection",
      "To CPU protection",
      "None of these"
  ]
},
{
  numb: 8,
  question: "If the page size increases, the internal fragmentation is also?..?",
  answer: "Increases",
  options: [
      "Increases",
      "Decreases",
      "Remains constant",
      "None of these"
  ]
},
{
  numb: 9,
  question: "Which of the following is a single-user operating system?",
  answer: "Ms-Dos",
  options: [
      "Windows",
      "Ms-Dos",
      "MAC",
      "None of these"
  ]
},
{
  numb: 10,
  question: "The size of virtual memory is based on which of the following?",
  answer: "Address bus",
  options: [
      "CPU",
      "RAM",
      "Data bus",
      "Address bus"
  ]
}
],
[
  {
  numb: 1,
  question: "If a page number is not found in the translation lookaside buffer, then it is known as a?",
  answer: "Translation Lookaside Buffer miss",
  options: [
      "Buffer miss",
      "Translation Lookaside Buffer miss",
      "Translation Lookaside Buffer hit",
      "All of the mentioned"
  ]
},
{
  numb: 2,
  question: "Which of the following is not application software?",
  answer: "Windows 7",
  options: [
      "Windows 7",
      "WordPad",
      "Photoshop",
      "MS-excel"
  ]
},
{
  numb: 3,
  question: "Which of the following supports Windows 64 bit?",
  answer: "Window XP",
  options: [
      "Window XP",
      "Window 2000",
      "Window 1998",
      "None of these"
  ]
},
{
  numb: 4,
  question: "Which of the following windows does not have a start button?",
  answer: "Windows 8",
  options: [
      "Windows 8",
      "Windows 7",
      "Windows XP",
      "None of these"
  ]
},
{
  numb: 5,
  question: "Which of the following operating systems does not support more than one program at a time?",
  answer: "DOS",
  options: [
      "Linux",
      "Windows",
      "MAC",
      "DOS"
  ]
},
{
  numb: 6,
  question: "Who provides the interface to access the services of the operating system?",
  answer: "System call",
  options: [
      "API",
      "Library",
      "System call",
      "Assembly instruction"
  ]
},
{
  numb: 7,
  question: "Where are placed the list of processes that are prepared to be executed and waiting?",
  answer: "Ready queue",
  options: [
      "Ready queue",
      "Job queue",
      "Execution queue",
      "Process queue"
  ]
},
{
  numb: 8,
  question: "Which of the following does not interrupt the running process?",
  answer: "Scheduler process",
  options: [
      "Timer interrupt",
      "Device",
      "Scheduler process",
      "Power failure"
  ]
},
{
  numb: 9,
  question: "What is Microsoft window?",
  answer: "Operating system",
  options: [
      "Operating system",
      "Graphics program",
      "Word Processing",
      "Database program"
  ]
},
{
  numb: 10,
  question: "Which of the following is group of programs?",
  answer: "Accessories",
  options: [
      "Paint",
      "Word",
      "Accessories",
      "All of above"
  ]
}
]];
