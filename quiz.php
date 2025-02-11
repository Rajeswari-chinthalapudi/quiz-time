<?php
    include_once 'database.php';
    session_start();
    if(!(isset($_SESSION['email'])))
    {
        header("location:login.php");
    }
    else
    {
        $name = $_SESSION['name'];
        $email = $_SESSION['email'];
        include_once 'database.php';
    }
?>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Audiowide|Sofia|Trirong"> 
<link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
    <!-- Google Font -->
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
      rel="stylesheet"
    />      
<link rel="stylesheet" href="quiz.css">
</head>
<body>

    <div class="topnav" id="navbar">
        <a class="active" onclick="logo()" id="image">
            <img src="image/logoo.jpeg" height="50px" width="50px" id="logo"/>
          </a>
        <a href="#home">Home</a>
        <a href="#crs">Courses</a>
        <a href="#au">Contact Us</a>
        <a href="login.php" style="float:right"><span id="logout">Log Out</span></a>
        <a class="icon" onclick="myFunction()">
            <i class="fa fa-bars"></i>
        </a>
    </div>
    <div id="fullimageview">
        <img id="fullimage"/>
        <span id="closebutton" onclick="closefullview()">&times;</span>
    </div>
    <a name="home"></a>
    <div class="banner">
        <div class="ban1">
            <h3 class="a1">Don't waste Time</h3>   
            <!--<h3 class="a2">Let's</h3>--> 
            <h1 class="a3"><b>TAKE A QUIZ</b></h1>
            <h3 class="a6">-Attempt more, learn more 🙃️</h3>
         
            
        </div>
        


    </div>
  
  <a name="crs"></a>
    <div class="cour">
      <div class="row1">
        <h1 class="section-heading">Available Courses</h1>
      </div>
      <div class="row1">
        
        <div class="column1">
          <div class="card1">
            <div class="icon-wrapper">
              <img class="lang" src="img/cn.jpeg"/>
            </div>
            <h3 class="hd">Computer Networks</h3>
            <p class="hp">
              Computer networking refers to interconnected computing devices that can exchange data and share resources with each other                           
            </p> 
            <a href="cn.html"><button class="bt"> play </button></a>
          
          </div>
          
        </div>
     
        <div class="column1">
          <div class="card1">
            <div class="icon-wrapper1">
              <img class="lang" src="img/os.png"/>
            </div>
            <h3 class="hd">Operating System</h3>
            <p class="hp">
           An Operating System (OS) is a collection of software that manages computer hardware resources and provides common services for computer programs.      
            </p>
            <a href="os.html"><button class="bt"> play </button></a>
          </div>
          
        </div>
        
        <div class="column1">
          <div class="card1">
            <div class="icon-wrapper1">
              <img class="lang" src="img/se.jpeg"/>
            </div>
            <h3 class="hd">Software Engineering</h3>
            <p class="hp">
            Software engineering is the branch of computer science that deals with the design, development, testing, and maintenance of software applications.
            </p>
            <a href="se.html"><button class="bt"> play </button></a>
          </div>
          
        </div>
        <div class="column1">
          <div class="card1">
            <div class="icon-wrapper1">
              <img class="lang" src="img/dm.jpeg"/>
            </div>
            <h3 class="hd">Data Mining</h3>
            <p class="hp">
             Data mining is the process of sorting through large data sets to identify patterns and relationships that can help solve business problems through data analysis.                     
            </p>
            <a href="dm.html" ><button class="bt"> play </button></a>
          </div>
        </div>
       
      </div>
    </div>

   
<a name="au"></a>

<div>
 <div class="about-section">
 

 
<div class="tm">
  <div class="responsive-container-block container">
  <p class="text-blk team-head-text">
    Our Team 
  </p>
<div class="team">
  
    <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
      <div class="card">
        <div class="team-image-wrapper">
          <img src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert1.png"
            class="team-member-image" />
        </div>
        <p class="text-blk name">A
        </p>
        <p class="text-blk position">MANAGER
        </p>
        <p class="text-blk feature-text" id="contact"><a href="mailto:O190491@rguktong.ac.in"><button class="button">Contact</button></a>
        </p>
      </div>
    </div>


    <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
        <div class="card">
          <div class="team-image-wrapper">
            <img src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert1.png"
              class="team-member-image" />
          </div>
          <p class="text-blk name">B
          </p>
          <p class="text-blk position">CODING
          </p>
          <p class="text-blk feature-text" id="contact"><a href="mailto:O190672@rguktong.ac.in"><button class="button">Contact</button></a>
          </p>
        </div>
      </div>
    
      <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
        <div class="card">
          <div class="team-image-wrapper">
            <img src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert1.png"
              class="team-member-image" />
          </div>
          <p class="text-blk name">C
          </p>
          <p class="text-blk position">CODING
          </p>
          <p class="text-blk feature-text" id="contact"><a href="mailto:O190136@rguktong.ac.in"><button class="button">Contact</button></a>
          </p>
        </div>
      </div>

      <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
        <div class="card">
          <div class="team-image-wrapper">
            <img src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert1.png"
              class="team-member-image" />
          </div>
          <p class="text-blk name">D
          </p>
          <p class="text-blk position">CODING
          </p>
          <p class="text-blk feature-text" id="contact"><a href="mailto:O190146@rguktong.ac.in"><button class="button">Contact</button></a>
          </p>
        </div>
      </div>

      </div>

      </div>


   

    
    
  </div>
</div>

  </div>

  
    <footer>
        <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-c-circle" viewBox="0 0 16 16">
        <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512Z"/>
        </svg>
        Created BY <a href="#">LEKSHAYANI</a>
      </span>
    </footer>
    <script src="quiz.js"></script>
</body>
</html>
