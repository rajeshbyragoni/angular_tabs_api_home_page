import {Component, OnInit} from '@angular/core';
import {CommonService} from '../service/common.service';
import {ActivatedRoute, Router} from '@angular/router';
declare var $: any;

@Component({
    selector: 'app-hoteldetails',
    templateUrl: './hoteldetails.component.html',
    styleUrls: ['./hoteldetails.component.css']
})
export class HoteldetailsComponent implements OnInit {

    hotelDetail: any;
    relatedHotels: any;
    loading = false;
    roomLoading = false;
    disabledBtn = false;
    roomAPIData: any;
    images: any;
    roomIndex: any;
    hotelID: string;
    apiID: any;
    lat: any;
    lon: any;

    constructor(private _CommonService: CommonService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.hotelID = params['id'];
            this.apiID = params['api_id'];
            this.hotelData(params['id'], params['hotel_code'], params['request_data'], params['api_id']);
            this.roomData(params['hotel_code'], params['request_data'], params['api_id']);
        });
    }

    hotelData(id, hotel_code, request_data, api_id) {
        this.loading = true;
        this._CommonService.getHotelDetails(id, hotel_code, request_data, api_id).subscribe(
            dataReady => {
                if (dataReady.status) {
                    this.loading = false;
                    this.hotelDetail = dataReady.hotel_det;
                    this.lat = dataReady.hotel_det.lat;
                    this.lon = dataReady.hotel_det.lon;
                    this.relatedHotels = dataReady.related_hotels;
                } else {
                    this.loading = false;
                }
            }, error => {
                console.log(error.toString());
            }
        );
    }

    roomData(hotel_code, request, api_id) {
        this.roomLoading = true;
        this._CommonService.getRoomDetails(hotel_code, request, api_id).subscribe(
            results => {
                if (results.status) {
                    this.roomLoading = false;
                    this.roomAPIData = results.hotel_search_result.hotel_details.Hotel.RoomCategory;
                    this.roomIndex = results.hotel_search_result.room_index;
                } else {
                    this.roomLoading = false;
                }
            }, error => {
                console.log(error.toString());
            }
        );
    }

    bookRomm(id) {
        this.disabledBtn = true;
        this._CommonService.bookRoomApi(id, parseInt(this.hotelID, 10), parseInt(this.apiID, 10), parseFloat(this.lat),
            parseFloat(this.lon))
            .subscribe(results => {
                if (results.status) {
                    const sucs = '#' + 'sucsID-' + id;
                    $(sucs).addClass('showing');
                    setTimeout(() => {
                        this.disabledBtn = false;
                        this.router.navigate(['/booking/'], {
                            queryParams: {
                                id: results.session_id,
                            }
                        });
                    }, 3000);
                } else {
                    console.log('failure');
                }
            }, error => {
                console.log(error.toString());
            });
    }

    parsingJson(jsonVal) {
        const variabl = jsonVal.replace(/\\/g, '').split(',');
        const data = JSON.parse(jsonVal);
        return this.images = data;
    }
}
