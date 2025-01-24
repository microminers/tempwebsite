document.addEventListener("DOMContentLoaded", function () {
     
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;  
    let dd = today.getDate();
    
  
    if (mm < 10) mm = "0" + mm;
    if (dd < 10) dd = "0" + dd;
    
     
    const formattedDate = yyyy + "-" + mm + "-" + dd;
  
     
    document.getElementById("call-date").setAttribute("min", formattedDate);
  
    
    const hours = today.getHours();
    const minutes = today.getMinutes();
    
    
    const formattedTime = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;
    
    
    document.getElementById("call-time").setAttribute("min", formattedTime);
  });
  
  
  
// Email.js
(function () {
    emailjs.init("5wSiMJWOrew4NyuJQ"); 
  })();
  
  
  const scheduleForm = document.getElementById("schedule-form");
  const responseMessage = document.getElementById("response-message");
  
  scheduleForm.addEventListener("submit", function (event) {
    event.preventDefault(); 
  
    
    const time24 = document.getElementById("call-time").value; 
  
    
    const time12 = convertTo12HourFormat(time24);
  
    
    const formData = {
      name: document.getElementById("schedule-name").value,  
      email: document.getElementById("schedule-email").value,
      call_date: document.getElementById("call-date").value, 
      call_time: time12,  
    };
  
    
    emailjs
      .send("service_148rtdp", "template_w5zsruh", formData)
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
  
          
          responseMessage.textContent = "Your schedule request has been sent!";
          responseMessage.style.color = "green"; 
          responseMessage.style.visibility = "visible";  
  
        
          setTimeout(() => {
            responseMessage.style.visibility = "hidden";  
          }, 5000);
  
         
          scheduleForm.reset();
        },
        function (error) {
          console.error("FAILED...", error);
  
          
          responseMessage.textContent = "Failed to send your schedule. Please try again.";
          responseMessage.style.color = "red"; 
          responseMessage.style.visibility = "visible";  
  
         
          setTimeout(() => {
            responseMessage.style.visibility = "hidden"; 
          }, 5000);
  
          
          scheduleForm.reset();
        }
      );
  });
  
  
  function convertTo12HourFormat(time24) {
    const [hours, minutes] = time24.split(":"); 
    let period = "AM"; 
    let hours12 = parseInt(hours); 
  
    if (hours12 >= 12) {
      period = "PM"; 
      if (hours12 > 12) hours12 -= 12; 
    }
    if (hours12 === 0) hours12 = 12;  
  
    return `${hours12}:${minutes} ${period}`;  
  }
  