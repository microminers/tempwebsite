 
let menuicon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');  
let navLinks = document.querySelectorAll('header nav a');

 
menuicon.onclick = () => {
    menuicon.classList.toggle('bx-x');  
    navbar.classList.toggle('active');  
};

 
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        
        navLinks.forEach(link => link.classList.remove('active'));
        
         
        this.classList.add('active');
        
        
        navbar.classList.remove('active');   
        menuicon.classList.remove('bx-x');   
    });
});

