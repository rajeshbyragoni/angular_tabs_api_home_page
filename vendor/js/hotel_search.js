$(".sorta").click(function () {

    var val = $(this).attr('val');
    $(".sorta").each(function () {

        if ($(this).attr('class').match(/active|des/)) {
            $(this).removeClass("active");
        }
        if ($(this).attr('class').match(/active|ase/)) {
            $(this).removeClass("active");
        }

    });
    //$(this).addClass('active des');
    if (val === 'desc') {
        $(this).addClass('active');
        // $(this).attr('val' ,'asc');
    } else {
        $(this).addClass('active');
        // $(this).attr('val',"desc");
    }
    filters();

});

$(".sort_filter").on("change", function () {
    filters();
});

$(document).on("click", ".check_star", function () {
    filters();
});
$(document).on("click", ".filter_accommodation", function () {
    filters();
});

$(document).on("click", ".filter_offer", function () {
    filters();
});

$('.star_rating').on('ifChecked', function (event) {
    filters();

});

$('.star_rating').on('ifUnchecked', function (event) {
    filters();

});


$(document).ready(function(){
    dataCountForRoom;
});
function dataCountForRoom() {
    $('#rooms').on('change',function(){
        $('#room_cnt').text($(this).val());
    });

    $('.paxcnt').on('change',function(){
        var pcnt = parseInt(parseFloat(0));
        paxcnt(pcnt);
    });


    function paxcnt(pcnt){
        $(".paxcnt").each(function() {
            var AdtCnt = (parseInt(pcnt) + parseInt($(this).val()));//alert(parseInt(AdtCnt));
            pcnt =  (parseInt(AdtCnt));
        });
        $('#pax_cnt').text(pcnt);
    }

    $('#rooms').on('change',function(){
        $('#room_cnt').text($(this).val());
    });

    $('.pax').on('change',function(){
        var Id = $(this).attr("data-id");
        var adtCnt = $('#adult_'+Id).val();
        var chdCnt = $('#child_'+Id).val();
        var infCnt = $('#infant_'+Id).val();
        var total = parseInt(parseInt(adtCnt) + parseInt(chdCnt) + parseInt(infCnt));
        $('#paxcnt_'+Id).text(total);
        if(infCnt > adtCnt){
            $('#error_'+Id).text("Number of infants cannot be more than adults.");
            $('#search_flights_submit_'+Id).addClass('LoadBtn');
            $("#search_flights_submit_"+Id).attr("disabled", true);
            return false;
        }

        if(total > 9){
            $('#error_'+Id).text("Total Pax cannot be more than 9.");
            $('#search_flights_submit_'+Id).addClass('LoadBtn');
            $("#search_flights_submit_"+Id).attr("disabled", true);
            return false;
        }
        else{
            $('#error_'+Id).text('');
            $('#search_flights_submit_'+Id).removeClass('LoadBtn');
            $("#search_flights_submit_"+Id).attr("disabled", false);
            return true;
        }
    });
}


function filters() {
    var sorting_type;
    var sorting_value;

    $(".sorta").each(function () {
        if ($(this).attr('class').match(/active|des/)) {
            sorting_type = $(this).attr('type');
            sorting_value = $(this).attr('val');
        }
    });


    var data = {};
    var sort = {};
    var facilities = [];
    var star = [];
    var offer = [];
    var session_id = $("#session_id").val();
    var requeststring = $("#request_string").val();
    var api_id = $("#api_id").val();

    data['amount'] = $("#amount").val();
    data['hotel_name'] = $("#hotel_namefilter").val();
    sort['column'] = sorting_type;
    sort['value'] = sorting_value;
    data['sort'] = sort;

    var matches = [];
    $(".filter_accommodation:checked").each(function () {
        matches.push(this.value);
    });
    data['accommodation'] = matches;

    // data['facility'] = facilities;

    /*   $(".check_star:checked").each(function() {
            star.push(this.value);
        });*/

    $('.star_rating').each(function () {
        if (this.checked) {
            star.push(this.value);
        }
    });

    data['starrate'] = star;

    $(".filter_offer:checked").each(function () {
        offer.push(this.value);
    });

    data['offers'] = offer;

    $.ajax({
        type: 'POST',
        url: WEB_URL + 'hotel/ajaxPaginationData/' + session_id + '/' + requeststring + '/' + api_id,
        data: {filter: JSON.stringify(data)},
        beforeSend: function (XMLHttpRequest) {
            $('.carttoloadr').fadeIn();
        },
        success: function (response) {
            $('#hotel_result').html(response);
            $('.carttoloadr').fadeOut();
        }
    });
}



initHotelRoomWidget();

function initHotelRoomWidget() {
    /* on click of no of rooms */
    $("body").on("change", ".noOfRoomsSel._sub", function () {
        var roomPicker = $('.roomsWidget');
        var count = parseInt($(this).val());
        var totalRooms = calculateRooms();
        // adding rooms
        var i = totalRooms;
        for (var i = totalRooms; i < count; i++) {
            console.log('111111');
            var clone = roomPicker.find('._htlroomcontainer:first').clone(true);
            clone.find('._roomCount').text(i + 1);
            clone.find('.CalAgeSelected').val(i);
            clone.find('.specifyChild').hide();
            roomPicker.find('._htlroomcontainer').last().after(clone);
        }
        //remove rooms
        var d = roomPicker.find('._htlroomcontainer');
        if (count < totalRooms) {
            for (var i = count; i < totalRooms; i++) {
                $(d[i]).remove();
            }
        }
        calculatePax();
        //$(this).parents('.modifySearchDiv').find(' .modify-nav').show();
        //$(this).parents('.modifySearchDiv').find('.expand').addClass('active');
        paxcnt(0);
        $('.modify-nav li a').show().addClass('active');
        $('#changesearch-options').show();
        roomPicker.find('._htlroomcontainer').show();
    });
//end
//calculatePax
    function paxcnt(pcnt) {
        $('.paxcnt').each(function () {
            const AdtCnt = parseInt((pcnt), 0) + parseInt(($(this).val()), 0);
            pcnt =  ((AdtCnt));
        });
        $('#pax_cnt').text(pcnt);
    }

    function calculateRooms() {
        var roomPicker = $('.roomsWidget').find('._htlroomcontainer');
        return roomPicker.length;
    }

    function calculatePax() {
        var $adult = $('._htlroomcontainer .adult');
        var $child = $('._htlroomcontainer .child');
        var $childAge = $('._htlroomcontainer .specifyChild ');
        var aCount = [];
        var cCount = [];
        var caCount = [];
        var temp = [];
        var guestCnt = 0;
        $adult.each(function (k, v) {
            aCount.push(parseInt($(v).find('select').val()));
            guestCnt = guestCnt + parseInt($(v).find('select').val());
        });
        $child.each(function (k, v) {
            cCount.push(parseInt($(v).find('select').val()));
            guestCnt = guestCnt + parseInt($(v).find('select').val());
        });
        $childAge.each(function (k, v) {  //console.log(k);
            temp = [];
            var e = $(v).find('.custom-select-v3');
            e.each(function (key, val) {

                //console.log($(e).closest( ".CalAgeSelected" ).val());
                $(val).find('select').attr('name', 'child_' + k + '_Age[]')
                if ($(val).is(':visible')) {
                    temp.push($(val).find('select').val());
                } else {
                    temp.push(0);
                }
            });
            caCount.push(temp);
        });
        if (guestCnt > 9) {
            // growl_alert(("errMorePax"));
        }
        $('#hotelRooms').val($adult.length);
        $('#hiddena').val(aCount.toString());
        $('#hiddenc').val(cCount.toString());
        $('#hiddenca').val(caCount.join('|'));
        $('#hotelRooms').attr('data-val', $adult.length);
        $('#hiddena').attr('data-val', aCount.toString());
        $('#hiddenc').attr('data-val', cCount.toString());
        $('#hiddenca').attr('data-val', caCount.join('|'));
        $('#hkeyTotalGHiddenAlter').val(guestCnt);
        $('#display_guest').val(generateRoomWidgetString($('#rooms').val(), guestCnt));
    }

//calcuylatepax end

    $('body').on('change', '._htlroomcontainer .adultSelected, ._htlroomcontainer .specifyChildrenAges select', function () {
        calculatePax();
    });

    /**
     * This code is for populating child ages
     */
    $('body').on('change', '._htlroomcontainer .childSelected', function () {

        var target = $(this).parents('._htlroomcontainer');
        if ($(this).val() === 0) {
            target.find('.specifyChild').hide();
        } else {
            calculateAgeElm(target, $(this).val());
            target.find('.specifyChild').show();
        }
        calculatePax();

    });
//end
//calculateAgeElm
    function calculateAgeElm(elm, count) {
        var target = elm.find('.specifyChild .custom-select-v3');
        // var cnt = parseInt(($('#rooms').val()-1));
        target.hide();
        for (var i = 0; i < parseInt(count); i++) {
            //  $(this).attr('name','child_'+(i+1)+'_Age[]');
            //$(target[i]).find('select option').eq(0).prop('selected', true)
            $(target[i]).show();
            //$(target[i]).find('select').attr('name','child_'+(cnt)+'_Age[]');
        }

    }

//calculateAgeElm end

    /**
     * This is for generate Room Widget String
     */
    function generateRoomWidgetString(noRooms, noGuests) {
        var roomStr = "";
        var guestStr = "";


        if (noRooms > 1) {
            roomStr = noRooms + " " + ("Rooms")
        } else {
            roomStr = noRooms + " " + ("Room")
        }

        if (noGuests > 1) {
            guestStr = noGuests + " " + ("Guests")
        } else {
            guestStr = noGuests + " " + ("Guest")
        }

        var str = roomStr + ', ' + guestStr;
        return str;
    }

//end @p
    $('body').on('change', '#fdphoT,#fdphoF', function () {
        if ($('#fdphoF').val() != "" && $('#fdphoT').val() != "") {
            var dateFirst = $('#fdphoF').val().split('/');
            var dateSecond = $('#fdphoT').val().split('/');
            var month1 = dateFirst[1] - 1;
            var month2 = dateSecond[1] - 1;
            var firstDate = new Date(dateFirst[2], month1, dateFirst[0]);
            var secondDate = new Date(dateSecond[2], month2, dateSecond[0]);
            var timeDiff = Math.abs(secondDate.getTime() - firstDate.getTime());
            var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            $('.nights-count').val(daysDiff);
        }
    });
//to count no of days in hotel @p
//to hide the room widget when the date pciker's tab are open.
    $('.fdphoF').on('focus', function () { //checkin homepage.
        $('#changesearch-options').hide();
        $('.selectRoomsOptions').removeClass('active');
    });
    $('.fdphoT').on('focus', function () { //checkout homepage.
        $('#changesearch-options').hide();
        $('.selectRoomsOptions').removeClass('active');
    });
    /**
     * This code is for populating rooms dynamically for popup
     */
    $('body').on('change', '.noOfRoomsSel._subPOP', function () {
        var roomPicker = $('.roomsWidgetPOP');
        var count = parseInt($(this).val());
        var totalRooms = calculateRoomsPOP();
        // adding rooms
        for (var i = totalRooms; i < count; i++) {
            console.log(totalRooms);
            var clone = roomPicker.find('._htlroomcontainerPOP:first').clone(true);
            clone.find('._roomCount').text(i + 1);
            clone.find('.specifyChild').hide();
            roomPicker.find('._htlroomcontainerPOP').last().after(clone);
        }
        //remove rooms
        var d = roomPicker.find('._htlroomcontainerPOP');
        if (count < totalRooms) {
            for (var i = count; i < totalRooms; i++) {
                $(d[i]).remove();
            }
        }
        calculatePaxPOP();
        //$(this).parents('.modifySearchDiv').find(' .modify-nav').show();
        //$(this).parents('.modifySearchDiv').find('.expand').addClass('active');
        $('.modify-nav li a').show().addClass('active');
        $('#changesearch-optionsPOP').show();
        roomPicker.find('._htlroomcontainerPOP').show();

    });


//end
    function calculateRoomsPOP() {
        var roomPicker = $('.roomsWidgetPOP').find('._htlroomcontainerPOP');
        return roomPicker.length;
    }

    /**
     * calculatePaxPOP() function updates the POPUP input hidden values.
     */
    function calculatePaxPOP() {
        var $adult = $('._htlroomcontainerPOP .adult');
        var $child = $('._htlroomcontainerPOP .child');
        var $childAge = $('._htlroomcontainerPOP .specifyChild ');
        var aCount = [];
        var cCount = [];
        var caCount = [];
        var temp = [];
        var guestCnt = 0;
        $adult.each(function (k, v) {
            if ($(v).find('select').val() != undefined) {
                aCount.push(parseInt($(v).find('select').val()));
                guestCnt = guestCnt + parseInt($(v).find('select').val());
            }
        });
        $child.each(function (k, v) {
            if ($(v).find('select').val() != undefined) {
                cCount.push(parseInt($(v).find('select').val()));
                guestCnt = guestCnt + parseInt($(v).find('select').val());
            }
        });
        $childAge.each(function (k, v) {
            temp = [];
            var e = $(v).find('.custom-select-v3');
            e.each(function (key, val) {
                if ($(val).is(':visible')) {
                    temp.push($(val).find('select').val());
                } else {
                    temp.push(0);
                }
            });
            caCount.push(temp);
        });
        if (guestCnt > 9) {
            growl_alert(("errMorePax"));
        }
        $('#hotelRoomsPOP').val(aCount.length);
        $('#hiddenaPOP').val(aCount.toString());
        $('#hiddencPOP').val(cCount.toString());
        $('#hiddencaPOP').val(caCount.join('|'));
        $('#hkeyTotalGHiddenAlterPOP').val(guestCnt);

        $('#_rmWidStrPOP').val(generateRoomWidgetString($('#hotelRoomsPOP').val(), $('#hkeyTotalGHiddenAlterPOP').val()));
    }
    /**
     *  This is for updating the input hidden values on changing the adults and chind ages
     */
    $('body').on('change', '._htlroomcontainerPOP .adultSelected, ._htlroomcontainerPOP .specifyChildrenAges select', function () {
        calculatePaxPOP();
    });

    /**
     * This code is for populating child ages in POPUP
     */
    $('body').on('change', '._htlroomcontainerPOP .childSelected', function () {
        var target = $(this).parents('._htlroomcontainerPOP');
        if ($(this).val() == 0) {
            target.find('.specifyChild').hide();

        } else {
            calculateAgeElm(target, $(this).val());
            target.find('.specifyChild').show();
        }
        calculatePaxPOP();
    });

//end @p
}
