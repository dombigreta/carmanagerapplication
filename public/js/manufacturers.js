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