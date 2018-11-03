const initManufacturers = () =>{
    getAllManufacturers();
}

const getAllManufacturers = () =>{
    $.get({ url:'/manufacturers',
            success:(manufacturers) => createManufacturersTable(manufacturers),
            error:(error) => console.log(error)});
}

const createManufacturersTable = (manufacturers) =>{
    let manufacturerTable = $('#manufacturer_table');
    manufacturerTable.empty();

    let tableHeader = $(document.createElement('div'));
    tableHeader.addClass('table_header');

    let name = $(document.createElement('div')).append('name').addClass('table_cell table_header_cell');
    let country = $(document.createElement('div')).append('country').addClass('table_cell table_header_cell');
    let founded = $(document.createElement('div')).append('founded').addClass('table_cell table_header_cell');

    tableHeader.append(name,country,founded);

    manufacturerTable.append(tableHeader);
    createManufacturersTableRow(manufacturers, manufacturerTable);
}

const createManufacturersTableRow = (items,table) =>{
    items.forEach(item =>{
        let row = $(document.createElement('div')).addClass('table_row');
        let name = $(document.createElement('div')).append(item.name).addClass('table_cell');
        let country = $(document.createElement('div')).append(item.country).addClass('table_cell');
        let founded = $(document.createElement('div')).append(item.founded).addClass('table_cell');
        row.append(name,country,founded);
        table.append(row);
    });
}

const addNewManufacturer = () => {
    let manufacturerForm = $('#manufacturerForm');
    let dataArray = manufacturerForm.serializeArray();
    let dataObj = {};
    let errorMessages = [];
    let isValid = true;
    
    dataArray.forEach(data => {
        let errorMsgContainer = $('#'+ data.name + '_error').hide();
        if(data.value.trim() == ''){
            isValid = false;
            errorMessages.push(data.name);
            return;
        }

        if(data.name === 'founded'){
            let date = new Date(data.value);
            data.value = date.toLocaleDateString('en-us', {year:'numeric', month:'long',day:'numeric'});
        }

        dataObj[data.name] = data.value
    });

    if(errorMessages.length > 0){
        errorMessages.forEach(msg => {
        let inputField =$('#' + msg)
        let errorMsgContainer = $('#' + msg +'_error').text(`${msg} field should be filled!`).show().addClass('errorMsgContainer');
        inputField.after(errorMsgContainer);
        } );
    }
    
    if(isValid){
        $.post({url:'/addManufacturers',
                data:dataObj,
                statusCode:{409:showModal('There is already a manufacturer named like that!', messageKeys.WARNING)},
                success:(reponse) => createManufacturersTable(reponse),
                error:(error) => console.log(error)});
    }
}