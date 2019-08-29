import {Component, OnInit} from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {first} from 'rxjs/operators';
import {AutocompleteService} from '../service/autocomplete.service';
import {TourService} from '../service/tour.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CommonService} from '../service/common.service';
import {HttpClient} from '@angular/common/http';
import {FlightService} from '../service/flight.service';
import {PackageService} from '../service/package.service';

declare var $: any;

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.css'],
})

export class BannerComponent implements OnInit {
    model: NgbDateStruct;
    date: { year: number, month: number };
    cities: any = [];
    suggestedCities: any = [];
    suggestedTourCities: any = [];
    flightFSuggsion: any = [];
    flightTSuggsion: any = [];
    packAgeSuggsion: any = [];
    packageTypeArray: any = [];
    values = '';
    selectedCity: any = [];
    selectedTour: any = [];
    selectedFCity: any = [];
    selectedTCity: any = [];
    selectedPackCity: any = [];
    hotelSearchForm: FormGroup;
    countryArry: any = [];

    constructor(private fb: FormBuilder, private calendar: NgbCalendar, private _AutocompleteService: AutocompleteService, private _TourService: TourService,
                private router: Router, private datePipe: DatePipe, private _CommonService: CommonService, private http: HttpClient, private _flightService: FlightService,
                private _PackageService: PackageService) {
        this.createForm();
    }

    createForm() {
        this.hotelSearchForm = this.fb.group({
            location: ['', Validators.required],
            checkin: ['', Validators.required],
            checkout: ['', Validators.required],
            rooms: ['', Validators.required],
            guests: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.datePicker();
        this.roomOpen();
        this.roomClone();
        this.countries();
        this.nights();
        this.roundTripPax();
        this.tourUI();
        this.packageUI()
    }

    nights() {
        $(document).ready(function () {
            $(document).on('change', '#departing_1, #departing_2', function () {
                const formDate = formatDate($('#departing_1').val());
                const toDate = formatDate($('#departing_2').val());

                function formatDate(date) {
                    const datearray = date.split('-');
                    const newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
                    return newdate;
                }

                if (formDate.length === 10 && toDate.length === 10 && formDate < toDate) {
                    const date1 = new Date(formDate);
                    const date2 = new Date(toDate);
                    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
                    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    $('#nights').val(diffDays);
                }
            });
        });
    }

    countries() {
        this._CommonService.getCountries().subscribe(
            results => {
                this.countryArry = results.countries;
            },
            error => {
                console.log(error.toString());
            }
        );
    }

    roomOpen() {
        $('.option-heading').click(function () {
            $(this).next('.option-content').stop().slideToggle(500);
            $(this).find('.fa-angle-up, .fa-angle-down').toggle();
        });
    }

    roomClone() {
        $(document).ready(function () {
            const roomCunt = $('#noOfRoomsSel');
            $(roomCunt).on('change', function () {
                $('#room_cnt').text($(this).val());
                $('#pax_cnt').text($(this).val());
                const roomCuntVal = roomCunt.val();
                const roomPicker = $('.roomsWidget').find('._htlroomcontainer');
                for (let i = roomPicker.length; i < roomCuntVal; i++) {
                    const clone = $('._htlroomcontainer:first').clone().appendTo('#rowCreate');
                    clone.find('._roomCount').text(i + 1);
                    clone.find('.childSelected').attr('id', 'child-' + (i + 1));
                    clone.find('.childApent').attr('id', 'age-' + (i + 1));
                    clone.find('.childApent').hide();
                }
                const totalRooms = $('._htlroomcontainer');
                for (let i = roomCuntVal; i < roomPicker.length; i++) {
                    $(totalRooms[i]).remove();
                }
            });

            $(document).on('change', '.childSelected', function () {
                const childCuntVal = $(this).val();
                const childID = $(this).attr('id');
                const child = 'child-' + childID.slice(-1);
                const childPicker = $('.roomsWidget').find('#' + child);
                const child_D = 'child_' + childID.slice(-1) + '_Age[]';
                const ddd = $('#age-' + childID.slice(-1)).find('.chdm' + childID.slice(-1));
                const apentid = ('#age-' + childID.slice(-1));

                for (let i = ddd.length; i < childCuntVal; i++) {
                    $(apentid).show();
                    $('.childApent').show();
                    const htmlSelect = '<div class="col-md-3"><label>Child Age&nbsp;</label>\n' +
                        '<select name="child_' + childID.slice(-1) + '_Age[]" class="form-control ' + 'chdm' + childID.slice(-1) + '">\n' +
                        '<option selected="selected" value="0">0</option>\n' +
                        '<option value="1">1</option>\n' +
                        '<option value="2">2</option>\n' +
                        '<option value="3">3</option>\n' +
                        '<option value="4">4</option>\n' +
                        '<option value="5">5</option>\n' +
                        '<option value="6">6</option>\n' +
                        '<option value="7">7</option>\n' +
                        '<option value="8">8</option>\n' +
                        '<option value="9">9</option>\n' +
                        '<option value="10">10</option>\n' +
                        '<option value="11">11</option>\n' +
                        '<option value="12">12</option>\n' +
                        '</select></div>';
                    $(apentid).append(htmlSelect);
                }
                const totalChilds = $(apentid);
                for (let i = childCuntVal; i < childPicker.length; i++) {
                    $(totalChilds[i]).remove();
                }

            });

            // child count start here
            $(document).on('click', '.constatnt', function () {
                let roomCunt = 0;
                $('.adultSelected').each(function () {
                    const ddd = roomCunt + parseInt($(this).val(), 0);
                    roomCunt = ddd;
                });
                $('.childSelected').each(function () {
                    const ddd = roomCunt + parseInt($(this).val(), 0);
                    roomCunt = ddd;
                });
                $('#pax_cnt').text(roomCunt);
            });
        });
    }

    selectToday() {
        this.model = this.calendar.getToday();
    }

    onKey(event: any) {
        this.values = event.target.value;
        if (this.values !== '' && this.values.length > 2) {
            this.cities = this._AutocompleteService.getHotelCities(this.values).pipe(first())
                .subscribe(
                    suggestedCities => {
                        this.suggestedCities = suggestedCities;
                    });
        } else {
            this.suggestedCities = [];
        }

    }

    onSelectCity(city: any): void {
        this.selectedCity = city;
        this.suggestedCities = [];
    }

    searchHotel(location, checkin, checkout) {
        const checkinVal = $('input[name$=\'checkin_date\']').val();
        const checkoutVal = $('input[name$=\'checkout_date\']').val();
        const rooms = $('.noOfRoomsSel').val();
        const mailForm = $('#mainSearchForm').serialize();
        const nationality = $('#countrySelect option:selected').val();
        if (location !== '' && checkinVal.length > 0 && checkoutVal.length > 0 && rooms !== '' && nationality.length > 0) {
            this.router.navigate(['/hotels/'], {
                queryParams: {
                    data: mailForm
                }
            });
        } else {
            console.log('ddddd');
        }
    }

    transformDate(date) {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
    }

    datePicker() {
        $(document).ready(function () {
            $('#departing_1').datepicker({
                dateFormat: 'dd-mm-yy',
                minDate: 0,
                numberOfMonths: 1
            });
            let debounce;
            $(window).resize(function () {
                clearTimeout(debounce);
                if ($(window).width() < 768) {
                    debounce = setTimeout(function () {
                        debounceDatepicker(12);
                    }, 250);
                } else {
                    debounce = setTimeout(function () {
                        debounceDatepicker(1);
                    }, 250);
                }
            }).trigger('resize');

            function debounceDatepicker(no) {
                $('#departing_1').datepicker({
                    dateFormat: 'dd-mm-yy'
                }, 'option', 'numberOfMonths', no);
            }
        });

        $(document).ready(function () {
            $('#departing_2').datepicker({
                dateFormat: 'dd-mm-yy',
                minDate: 0,
                numberOfMonths: 1
            });
            let debounce;
            $(window).resize(function () {
                clearTimeout(debounce);
                if ($(window).width() < 768) {
                    debounce = setTimeout(function () {
                        debounceDatepicker(12);
                    }, 250);
                } else {
                    debounce = setTimeout(function () {
                        debounceDatepicker(1);
                    }, 250);
                }
            }).trigger('resize');

            function debounceDatepicker(no) {
                $('#departing_2').datepicker('option', 'numberOfMonths', no);
            }
        });

        $(document).ready(function () {
            $('#departing_3').datepicker({
                dateFormat: 'dd-mm-yy',
                minDate: 0,
                numberOfMonths: 1,
                onSelect: function (date) {
                    $('#departing_4').val(date);
                }
            });
            let debounce;
            $(window).resize(function () {
                clearTimeout(debounce);
                if ($(window).width() < 768) {
                    debounce = setTimeout(function () {
                        debounceDatepicker(12);
                    }, 250);
                } else {
                    debounce = setTimeout(function () {
                        debounceDatepicker(1);
                    }, 250);
                }
            }).trigger('resize');

            function debounceDatepicker(no) {
                $('#departing_3').datepicker('option', 'numberOfMonths', no);
            }
        });

        $(document).ready(function () {
            const date = new Date();
            $('#departing_4').datepicker({
                dateFormat: 'dd-mm-yy',
                minDate: $('#departing_3').val(),
                numberOfMonths: 1
            });
            let debounce;
            $(window).resize(function () {
                clearTimeout(debounce);
                if ($(window).width() < 768) {
                    debounce = setTimeout(function () {
                        debounceDatepicker(12);
                    }, 250);
                } else {
                    debounce = setTimeout(function () {
                        debounceDatepicker(1);
                    }, 250);
                }
            }).trigger('resize');

            function debounceDatepicker(no) {
                $('#departing_4').datepicker('option', 'numberOfMonths', no);
            }
        });

        $(document).ready(function () {
            $('#departure_date').datepicker({
                dateFormat: 'dd-mm-yy',
                minDate: 0,
                numberOfMonths: 1
            });
            let debounce;
            $(window).resize(function () {
                clearTimeout(debounce);
                if ($(window).width() < 768) {
                    debounce = setTimeout(function () {
                        debounceDatepicker(12);
                    }, 250);
                } else {
                    debounce = setTimeout(function () {
                        debounceDatepicker(1);
                    }, 250);
                }
            }).trigger('resize');

            function debounceDatepicker(no) {
                $('#departure_date').datepicker({
                    dateFormat: 'dd-mm-yy'
                }, 'option', 'numberOfMonths', no);
            }
        });

        $(document).ready(function () {
            const date = new Date();
            $('#arrival_date').datepicker({
                dateFormat: 'dd-mm-yy',
                minDate: $('#departure_date').val(),
                numberOfMonths: 1
            });
            let debounce;
            $(window).resize(function () {
                clearTimeout(debounce);
                if ($(window).width() < 768) {
                    debounce = setTimeout(function () {
                        debounceDatepicker(12);
                    }, 250);
                } else {
                    debounce = setTimeout(function () {
                        debounceDatepicker(1);
                    }, 250);
                }
            }).trigger('resize');

            function debounceDatepicker(no) {
                $('#arrival_date').datepicker('option', 'numberOfMonths', no);
            }
        });

        $(document).ready(function () {
            const date = new Date();
            $('#trip_date').datepicker({
                dateFormat: 'dd-mm-yy',
                minDate: 0,
                numberOfMonths: 1
            });
        });
    }

    flightFAutoComplete($event) {
        const value = $event.target.value;
        if (value !== '' && value.length > 2) {
            this._flightService.autoFlightSuggestions(value).subscribe(results => {
                this.flightFSuggsion = results;
            });
        }
    }

    flightTAutoComplete($event) {
        const value = $event.target.value;
        if (value !== '' && value.length > 2) {
            this._flightService.autoFlightSuggestions(value).subscribe(results => {
                this.flightTSuggsion = results;
            });
        }
    }

    packageLocSearch(event: KeyboardEvent){
        const value = (<HTMLInputElement>event.target).value;
        if (value !== '' && value.length > 2) {
            this._PackageService.getPackLocatAPI(value).subscribe(results => {
                this.packAgeSuggsion = results;
            }, error1 => {
                console.log(error1.toString());
            });
        }
    }

    onFSelectCity(fcities: any): void {
        this.selectedFCity = fcities.value;
        this.flightFSuggsion = [];
    }

    onTSelectCity(tcities: any): void {
        this.selectedTCity = tcities.label;
        this.flightTSuggsion = [];
    }

    onPackageSelect(location: any): void {
        this.selectedPackCity = location.label;
        this.packAgeSuggsion = [];
    }

    roundTripPax() {
        $(document).on('change', '#adult_i, #child_1, #infant_1', function () {
            const adult = parseInt($('#adult_i ').val(), 10);
            const child = parseInt($('#child_1 ').val(), 10);
            const infant = parseInt($('#infant_1 ').val(), 10);
            const total = adult + child + infant;
            if (total <= 9) {
                $('#error_msg').text('');
                if (adult >= infant) {
                    $('#traveller_1').text(total);
                } else {
                    $('#error_msg').text('Number of infants cannot be more than adults.\n');
                }
            } else {
                $('#error_msg').text('Total Pax cannot be more than 9.\n');
            }
        });

        $(document).on('change', 'input[type=radio][name=flightType]', function () {
            const flightType = $('input[name=\'flightType\']:checked').val();
            if (flightType === '1') {
                $('.rtns').hide();
            } else {
                $('.rtns').show();
            }
        });
    }

    searchFlight() {
        const formData = $('#flightSearchForm').serialize();
        const flightType = $('input[name=\'flightType\']:checked').val();
        const departureCode = $('input[name=\'departureCode\']').val();
        const arrivalCode = $('input[name=\'arrivalCode\']').val();
        const start = $('input[name=\'start\']').val();
        const end = $('input[name=\'end\']').val();
        if (flightType === '1') {
            if (flightType !== '' && flightType.length > 0 && departureCode.length > 0 && departureCode !== '' && departureCode.length > 0) {
                this.router.navigate(['/flights/'], {
                    queryParams: {
                        flightType: flightType, departureCode: departureCode, arrivalCode: arrivalCode, start: start,
                    }
                });
            } else {
                console.log('ddddd');
            }
        } else {
            if (flightType !== '' && flightType.length > 0 && departureCode.length > 0 && departureCode !== '' && departureCode.length > 0) {
                this.router.navigate(['/flights/'], {
                    queryParams: {
                        flightType: flightType, departureCode: departureCode, arrivalCode: arrivalCode, start: start, end: end
                    }
                });
            } else {
                console.log('ddddd');
            }
        }
    }

    // Tour Search
    tourUI() {
        $(document).on('change', '.TadultCount, .TchildCount, .TinfantCount', function () {
            const adult = parseInt($('.TadultCount').val(), 10);
            const child = parseInt($('.TchildCount').val(), 10);
            const infant = parseInt($('.TinfantCount').val(), 10);
            const total = adult + child + infant;
            $('#_tourStr').text(total);
            $("#_tourStr").attr("placeholder", total + " traveller");
        });
         $(document).on('change', '.TinfantCount', function () {
             const infant = $('.TinfantCount').val();
             if (infant > 0) {
                 $('#chair').show();
            } else {
                $('#chair').hide();
            }
         });

        $(document).ready(function () {
            $('.tvlr').click(function () {
                $('.boxt').toggle();
            });
            $('.tvlr2').click(function () {
                $('.boxt2').toggle();
            });
        });
    }

    getTourLocation($event) {
        const valueKey = $event.target.value;
        if (valueKey !== '' && valueKey.length > 2) {
            this._TourService.geTourLocation(valueKey).pipe(first())
                .subscribe(
                    resulst => {
                        this.suggestedTourCities = resulst;
                    });
        } else {
            this.suggestedTourCities = [];
        }
    }

    onSelectTourCity(tourCity: any): void {
        $('#tourCountryCode').val(tourCity.id);
        this.selectedTour = tourCity;
        this.suggestedTourCities = [];
    }

    searcTour() {
        // console.log($('#tourForm').serialize());
        // const checkinVal = $('input[name$=\'checkin_date\']').val();
        // const checkoutVal = $('input[name$=\'checkout_date\']').val();
        // const rooms = $('.noOfRoomsSel').val();
        const tourForm = $('#tourForm').serialize();
        // const nationality = $('#countrySelect option:selected').val();
        // if (location !== '' && checkinVal.length > 0 && checkoutVal.length > 0 && rooms !== '' && nationality.length > 0) {
            this.router.navigate(['/tours/'], {
                queryParams: {
                    data: tourForm
                }
            });
        // } else {
            // console.log('ddddd');
        // } 
    }


    //package search

    packageUI() {
        this._PackageService.packageTypeDataAPI().subscribe(results => {
            this.packageTypeArray = results.package;
        }, error1 => {
            console.log(error1.toString());
        });
    }

    searchPackage(){
        const city = $('#packageCity').val();
        const trip_date = $('#trip_date').val();
        const holiday_type = $('#holiday_type').val();
        if (city !== '' && holiday_type.length > 0 && trip_date.length > 0) {
            this.router.navigate(['/packages/'], {
                queryParams: {
                    trip_date: trip_date, holiday_type: holiday_type, city: city,
                }
            });
        }
    }
}

