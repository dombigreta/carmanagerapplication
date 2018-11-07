
var container;
var carsBtn;
var manufacturersBtn;
var mainBtn;
var modal;

const messageKeys = {
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    SUCCESS: 'SUCCESS'
}

Object.freeze(messageKeys);

$(document).ready(function(){

    carsBtn =  $('#carsBtn');
    manufacturersBtn = $('#manufacturersBtn');
    mainBtn = $('#mainBtn');
    container = $('#container');
    modal =  $('#infoModal');

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

    window.addEventListener('click', function(e){
        if(e.target == modal[0]){
            closeModal();
        }
    });
});

const loadContent = (content) =>{
    container.load(content);
}

const removeError = (resourceKey) =>{
    $('#' + resourceKey).hide();
}

const showModal = (message, messageType) =>{
     modal.fadeIn(100);
     
     if($('#modalHeader')[0].classList.length > 1){
        $('#modalHeader').removeClass($('#modalHeader')[0].classList[1]);
     }
     switch(messageType){
         case messageKeys.WARNING:  {$('#modalTitle').text('attention');
                                    $('#modalHeader').addClass('attention')};
         break;
         case messageKeys.ERROR:    {$('#modalTitle').text('error');
                                    $('#modalHeader').addClass('error')};
         break;
         case messageKeys.SUCCESS:  {$('#modalTitle').text('info')
                                    $('#modalHeader').addClass('success')};
         break;
     }

     $('#modalBody').empty();

     if(Array.isArray(message))
        {
            let list = $(document.createElement('ul'));
            message.forEach(message => {

                let listItem = $(document.createElement('li'));

                if(typeof message === 'object'){
                    listItem.append(message['name']);
                }
                else{
                    listItem.append(message);
                }
                list.append(listItem);
            });
            $('#modalBody').append(list);  
        }
        else{
            $('#modalBody').text(message);
        }
     

}

const closeModal = () =>{
    modal.fadeOut(100);
}