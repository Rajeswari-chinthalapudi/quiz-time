<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Certificate Generator</title>
        <style>
            
            body{
                  width: 100%;
                      background-image: linear-gradient(to right,#FED8B1, rgb(51, 139, 147));
                  background-position: center center;
                  background-repeat: no-repeat;
                  background-attachment: fixed;
                  background-size: cover;
                }
                form{
                 text-align:center;
                 margin:150px;
                 }
          
            button{
            
    text-decoration: none;
    color:white;
    padding: 10px 20px;
    font-size: 20px;
    background: teal;
    border-radius: 8px;
}
button:hover{
    background:transparent;
    border:1px solid teal;}
    
            input{
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
label{
 text-align:left;
 font-weight:bold;
 color:teal;
 font-size:30px;
 }
        </style>
    </head>
    <body>
        <div class="raj">
        <form action="gc_dm.php" method="post">
            <label for="name"> Enter Name</label><br>
            <input type="text" name="name" ><br>
            <label for="date">Date</label><br>
           
            <input type="date" name="date"><br><br>
            <button type="submit" name="button">Generate</button>
</div>
</form>
</body>
</html>
