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
          restart_quiz.innerHTML='<a id="1" href="certi.php">get certificate</a>';
          
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

    window.location.href = "book.html";  
}

function home(){

  window.location.href = "quiz.php";  
}







let questions = [[
  
    {
    numb: 1,
    question: "The term HTTP stands for?",
    answer: "Hypertext transfer protocol",
    options: [
        "Hyper terminal tracing program",
        "Hypertext tracing protocol",
        "Hypertext transfer protocol",
        "Hypertext transfer program"
    ]
  },
    {
    numb: 2,
    question: "Which type of topology is best suited for large businesses which must carefully control and coordinate the operation of distributed branch outlets?",
    answer: "Star",
    options: [
      "Ring",
      "Local area",
      "Hierarchical",
      "Star"
     ]
  },
    {
    numb: 3,
    question: " Which of the following transmission directions listed is not a legitimate channel?",
    answer:"Double Duplex",
    options: [
      " Simplex",
       "Half Duplex",
       "Full Duplex",
       "Double Duplex"

    ]
  },
  {
    numb: 4,
    question: "Parity bits are used for which of the following purposes?" ,
    answer: "To detect errors",
    options: [
         "Encryption of data",
         "To transmit faster",
         "To detect errors",
        " To identify the user"
        ]
  },
  {
    numb: 5,
    question: " A collection of hyperlinked documents on the internet forms the ?",
    answer: "World Wide Web (WWW)",
    options: [
        "World Wide Web (WWW)",
        "E-mail system",
         "Mailing list",
         "Hypertext markup language"
    ]
  },
  {
    numb: 6,
    question:  "Which software prevents the external access to a system?",
    answer: "Firewall",
    options: [
       "Firewall",
        "Gateway",
        "Router",
        "Virus checker"
      ]
  },
  {
    numb: 7,
    question: " Which one of the following is the most common internet protocol?",
    answer: "TCP/IP",
    options: [
        "HTML",
        "NetBEUI",
        "TCP/IP",
        "IPX/SPX"
    ]
  },
  {
    numb: 8,
    question: "The term FTP stands for?",
    answer: "File transfer protocol",
    options: [
        "File transfer program",
        "File transmission protocol",
        "File transfer protocol",
        "File transfer protection"
        ]
  },
  
  {
    numb: 9,
    question: "The length of an IPv6 address is?",
    answer: "128 bits",
    options: [
        "32 bits",
        "64 bits",
        "128 bits",
        "256 bits"
    ]
  },
  {
    numb: 10,
    question: "Which of the following address belongs class A?",
    answer: "121.12.12.248",
    options: [
       "121.12.12.248",
       "130.12.12.248",
       "128.12.12.248",
       "129.12.12.248"
    ]
  }

  ],
  /*medium questions*/
  [
    
  {
  numb: 1,
  question: "What kind of transmission medium is most appropriate to carry data in a computer network that is exposed to electrical interferences?",
  answer: "Optical fiber",
  options: [
       "Unshielded twisted pair",
       "Optical fiber",
       "Coaxial cable",
       "Microwave"

  ]
  },
  {
  numb: 2,
  question: " A proxy server is used as the computer?",
  answer: "with external access",
  options: [
    "with external access",
    "acting as a backup",
    "performing file handling",
    "accessing user permissions"
  ]
  },
  {
  numb: 3,
  question: "Which of the following best describes uploading information?",
  answer: "Sending information to a host computer",
  options: [
    "Sorting data on a disk drive",
    "Sending information to a host computer",
    "Receiving information from a host computer",
    "Sorting data on a hard drive"
  ]
  },
  {
  numb: 4,
  question: " At what speed does tele-computed refer?",
  answer: "Baud rate",
  options: [
    "Interface speed",
    "Cycles per second",
    "Baud rate",
    "Megabyte load"
  ]
  },
  {
  numb: 5,
  question: "When the mail server sends mail to other mail servers it becomes ___ ?" ,
  answer: "SMTP client",
  options: [
    "SMTP client",
    "SMTP server",
    "Peer",
    "Master"
  ]
  },
  {
  numb: 6,
  question: " The maximum length (in bytes) of an IPv4 datagram is?",
  answer: "65535",
  options: [
    "32",
    "1024",
    "65535",
    "512"
  ]
  },
  
  {
  numb: 7,
  question: "How many versions available of IP?",
  answer: "2 version",
  options: [
    "4 version",
    "6 version",
    "2 version",
    "1 version"
  ]
  },
  {
  numb: 8,
  question: "Which layer of the TCP / IP stack corresponds to the OSI model transport layer?",
  answer:"Host to host",
  options: [
    "Host to host",
    "Application",
    "Internet",
    "Internet"
  ]
  },
  {
  numb: 9,
  question: "On a simplex data link, which of the following is a possible error recovery technique?",
  answer: "The use of hamming codes",
  options: [
    "Backward error correction (BEC)",
    "The use of hamming codes",
    "Automatic Repeat Request (ARQ)",
    "Downward error correction (DEC)"
  ]
  },
  {
  numb: 10,
  question: "The term IPv4 stands for?",
  answer: "Internet Protocol Version 4",
  options: [
    "Internet Protocol Version 4",
    "Internet Programming Version 4",
    "International Programming Version 4",
    "None of these"
  ]
  }
  
  ],
  
/* hard */
[
  
{
numb: 1,
question: "Which of the through is share the data of two computer? ",
answer: "Network",
options: [
    "Library",
    "Network",
    "Grouping",
    "Integrated system"
]
},
{
numb: 2,
question: "In specific, if the systems use separate protocols, which one of the following devices is used to link two systems?",
answer: "Gateway",
options: [
    "Repeater",
    "Bridge",
    "Gateway",
    "Hub"
]
},
{
numb: 3,
question: "Which of the following methods is used to broadcast two packets on the medium at a time? ",
answer: "Collision",
options: [
    "Collision",
    "Synchronous",
    "Asynchronous",
    "None of the above"
]
},
{
numb: 4,
question: " The private key in asymmetric key cryptography is kept by?",
answer: "Receiver",
options: [
    "Sender",
    "Receiver",
    "Sender and Receiver",
    "None of the these"
]
},
{
numb: 5,
question: "What is the maximum efficiency of slotted aloha at G = 1?",
answer: "36.8",
options: [
    "35.8",
    "35.5",
    "37.8",
    "36.8"
]
},
{
numb: 6,
question: "Which of the following servers allows LAN users to share data?",
answer: "File server",
options: [
    "Data server",
    "Point server",
    "File server",
    "Communication server"
]},

{
  numb: 7,
  question: "How many fields are in the SMDS packet?",
  answer: "Three",
  options: [
      "Two",
      "Three",
      "Four",
      "Five"
  ]
},
{
  numb: 8,
  question: "Which of the following protocols is the bit-oriented protocol?",
  answer: "HDLC",
  options: [
      "SSL",
      "http",
      "HDLC",
      "All of the these"
  ]
},
{
  numb: 9,
  question: " Which of the following layers does the HTTP protocol work on?",
  answer: "Application layer",
  options: [
      "Application layer",
      "Physical layer",
      "Data-link layer",
      "None of the these"
  ]
},
{
  numb: 10,
  question: "How many layers does the SONET contain?",
  answer: "4 layers",
  options: [
      "2 layers",
      "4 layers",
      "3 layers",
      "5 layers"
  ]
}

 ]];

  
