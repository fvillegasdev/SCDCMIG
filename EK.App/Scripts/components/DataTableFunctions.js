
function __dataTableInit(
    element, 
    columns,
    data,
    selectedItem,
    selectedItems,
    multiSelect,
    searchInputId,
    rowSelectedFn,
    rowDoubleClickFn,
    rowRightClick,
    buttonContainer,
    scrollX) {

    var table = $(element);
    var columnDef = [];
    var orderDef = [];
    if (columns && columns.length > 0) {
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].render) {
                columnDef[columnDef.length] = {
                    "render": columns[i].render,
                    "targets": i
                };
            }

            if (columns[i].order && typeof columns[i].order === "string") {
                var order = String(columns[i].order).toLowerCase();
                if (order === "asc" || order === "desc") {
                    orderDef.push([i, order]);
                }
            }
        }
    }

    if (orderDef.length === 0) {
        orderDef.push([0, "asc"]);
    }

    var fixedHeaderOffset = 0;
    if (App.getViewPort().width < App.getResponsiveBreakpoint('md')) {
        if ($('.page-header').hasClass('page-header-fixed-mobile')) {
            fixedHeaderOffset = $('.page-header').outerHeight(true);
        }
    } else if ($('.page-header').hasClass('navbar-fixed-top')) {
        fixedHeaderOffset = $('.page-header').outerHeight(true) + $(".page-title-row").outerHeight(true) + 10;
    } else if ($('body').hasClass('page-header-fixed')) {
        fixedHeaderOffset = 64; // admin 5 fixed height
    }

    var responsive = { details: {} };

    if (scrollX === undefined || scrollX === null) {
        scrollX = false;
    }

    if (scrollX === true) {
        responsive = undefined;
    }

    table.dataTable({
        "language": {
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "emptyTable": "...",
            "info": "Mostrando registros de _START_ al _END_ de _TOTAL_ ",
            "infoEmpty": "No se encontraron registros",
            "infoFiltered": "(de un total de _MAX_ registros)",
            "lengthMenu": "_MENU_ registros",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron registros"
        },
        fixedHeader: {
            header: false,
            headerOffset: fixedHeaderOffset
        },
        searching: true,
        bFilter: false,
        "scrollX": scrollX,
        "bLengthChange": false,
        "columnDefs": columnDef,
        "columns": columns,
        "colReorder": true,
        "data": data,
        buttons: [
            { extend: 'print', text: '', className: 'btn btn-icon-only ek-light icon-printer fix-portlet-buttons' },
            { extend: 'pdf', text: '', className: 'btn btn-icon-only ek-light fa fa-file-pdf-o fix-portlet-buttons' },
            { extend: 'csv', text: '', className: 'btn btn-icon-only ek-light fa fa-file-excel-o fix-portlet-buttons' }
        ],
        tableTools: {
            "sRowSelect": "single"
        },
        responsive: responsive,
        order: orderDef,
        keys: true,
        "lengthMenu": [
            [5, 10, 15, 25, -1],
            [5, 10, 15, 25, "Todos"] // change per page values here
        ],
        /*
        "colReorder": {
            fixedColumnsLeft: 1,
            order: [1, 3, 2, 0, 4]
        }
        */
        // set the initial value
        "pageLength": 25,
        "initComplete": function (settings, json) {
            if (table.data("page-loaded")) {
                table.data("page-loaded", 1);
            };
        },
        "fnDrawCallback": function (oSettings) {
            console.log('DataTables has redrawn the table');
        }
    });

    var formatSelectedFn = function (tr) {
        if (!$(tr).hasClass('selected')) {
            table.$('tr.selected').removeClass('selected');
            table.$('td.dt-td-selected').removeClass('dt-td-selected');

            $(tr).find('td').addClass('dt-td-selected');
            $(tr).addClass('selected');

            if (rowSelectedFn) {
                rowSelectedFn(table.DataTable().row(tr).data());
            }
        }
    };

    var raiseMultiSelectRowsFn = function () {
        if (rowSelectedFn) {
            var rows = [];
            table.$('tr.selected').each(function () {
                rows[rows.length] = table.DataTable().row(this).data();
            });

            rowSelectedFn(rows);
        };
    };

    var formatMultiSelectedFn = function (tr) {
        if ($(tr).hasClass('selected')) {
            $(tr).removeClass('selected');
            $(tr).find('td').removeClass('dt-td-selected');
        } else {
            $(tr).find('td').addClass('dt-td-selected');
            $(tr).addClass('selected');
        };
    };

    var selectFn = function () {
        if (multiSelect === true) {
            formatMultiSelectedFn(this);
            raiseMultiSelectRowsFn();
        } else {
            formatSelectedFn(this);
        };
    };

    if (multiSelect === true) {
        if (selectedItems && selectedItems.length > 0) {
            table.find("tbody tr").each(function (index, tr) {
                var item = table.DataTable().row(tr).data();

                for (var i = 0; i < selectedItems.length; i++) {
                    if (item && item.ID === selectedItems[i].ID) {
                        formatMultiSelectedFn(tr);
                    };
                };
            });
            raiseMultiSelectRowsFn();
        };
    } else {
        if (selectedItem && selectedItem.data) {
            table.find("tbody tr").each(function (index, tr) {
                var item = table.DataTable().row(tr).data();

                if (item && item.ID === selectedItem.data.ID) {
                    formatSelectedFn(tr);
                }
            });
        };
    };

    table.find("th").css("font-size", "11px");
    $('tbody', table).on('click', 'tr', selectFn);
    $('tbody', table).on('mousedown', 'tr', function (event) {
        //event.stopPropagation();
        if (event.which === 1) {
            if (multiSelect === true) {
                formatMultiSelectedFn(this);
                raiseMultiSelectRowsFn();
            } else {
                formatSelectedFn(this);
            };
        }
        else if (event.which === 3){
            formatSelectedFn(this);
            if (rowRightClick) {
                rowRightClick(table.DataTable().row(this).data());
            };
        }
    });

    //var eventAdded = $('tbody', table).data("eventsAdded");
    //if (eventAdded !== true) {
    //    $('tbody', table).data("eventsAdded", true);
    //};

    //$('tbody', table).find("tr").each(function (i, tr) {
    //    $(tr).on("dblclick", function () {
    //        if (rowDoubleClickFn) {
    //            rowDoubleClickFn(table.DataTable().row(this).data());
    //        }
    //    });
    //});

    $('tbody', table).on('dblclick', 'tr', function () {
        if (rowDoubleClickFn) {
            rowDoubleClickFn(table.DataTable().row(this).data());
        }
    });

    table.on('page', function () {
        var info = table.page.info();

        console.log(info);
    });

    table
        .on('key', function (e, datatable, key, cell, originalEvent) {
            //console.log('<div>Key press: ' + key + ' for cell <i>' + cell.data() + '</i></div>');
        })
        .on('key-focus', function (e, datatable, cell) {
            var tr = $(e.target).find("tbody tr:eq(" + cell.index().row + ")")[0];
            formatSelectedFn(tr);
        });

    table.DataTable().cell(":eq(0)").focus();

    if (buttonContainer) {
        table.DataTable().buttons().container().appendTo($('#' + buttonContainer));
    }
}

function __dataTableDestroy(id) {
    var table = $('#' + id).DataTable();

    $("#" + id).find("tbody").off();
    $("#" + id).off();

    table.destroy();
}

$(document).on('init.dt', function (e, settings) {
    var api = new $.fn.dataTable.Api(settings);

    //if (api.init().pageResize ||
    //     $.fn.dataTable.defaults.pageResize) {
    //    new PageResize(api);
    //}

    var buttons = settings._buttons;
    if (buttons && buttons.length > 0) {
        buttons = buttons[0].inst.s.buttons;

        if (buttons && buttons.length > 0) {
            for (var i = 0; i < buttons.length; i++) {
                var cName = buttons[i].node.className;

                cName = cName.replace('dt-button', '');

                buttons[i].node.className = cName;
            }
        }
    }        
});