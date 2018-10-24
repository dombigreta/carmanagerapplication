

var container;
var carsBtn;
var manufacturersBtn;
var mainBtn;

$(document).ready(function(){

    carsBtn =  $('#carsBtn');
    manufacturersBtn = $('#manufacturersBtn');
    mainBtn = $('#mainBtn');
    container = $('#container');

    loadContent('../pages/mainpage.html')

    carsBtn.on('click', function(){
        loadContent('../pages/carpage.html');
        initCars();
    });

    manufacturersBtn.on('click',function(){
        loadContent('../pages/manufacturer.html');
        initManufacturers();
    });

    mainBtn.on('click',function(){
        loadContent('../pages/mainpage.html');
    });
});

const loadContent = (content) =>{
    container.load(content);
}

