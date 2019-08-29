import {Component, OnInit} from '@angular/core';
import {CommonService} from '../service/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PackageService} from '../service/package.service';
import * as myGlobals from '../global';

declare var $: any;

@Component({
    selector: 'app-package-details',
    templateUrl: './package-details.component.html',
    styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {

    packageDetail: any;
    loading = false;
    images: any;
    otherImage: any = [];
    package_days: any = [];
    hotelID: string;
    apiID: any;
    countryArry: any = [];
    request_data: any;

    constructor(private _PackageService: PackageService, private _CommonService: CommonService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.hotelID = params['id'];
            this.apiID = params['api_id'];
            this.hotelData(params['package_id'], params['id'], params['request_data'], params['api_id'], params['session_id']);
        });
        this.countries();
        this.hotelRoom();
    }

    hotelData(package_id, id, request_data, api_id, session_id) {
        this.loading = true;
        this._PackageService.packageAPIdetails(package_id, id, request_data, api_id, session_id).subscribe(
            dataReady => {
                if (dataReady.status) {
                    this.loading = false;
                    this.hotelDataReady();
                    this.packageDetail = dataReady.package_det;
                    this.otherImage = dataReady.package_other;
                    this.package_days = dataReady.package_days;
                    this.request_data = dataReady.request_data;
                } else {
                    this.loading = false;
                }
            }, error => {
                console.log(error.toString());
            }
        );
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

    parsingJson(jsonVal) {
        const variabl = jsonVal.replace(/\\/g, '').split(',');
        const data = JSON.parse(jsonVal);
        return this.images = data;
    }

    hotelRoom() {

    }

    hotelDataReady() {
        $(document).on('change', '.hotel_name_select', function () {
            const hotel_id = $('option:selected',this).val();
            const packageID = $('#package_id').val();
            const hotelCheckIn = $('#package_id').val();
            const city = $('#city').val();
            const nationality = $('#nationality option:selected').val();
            const hotIid = $(this).attr('data');
            console.log(hotIid);
            const hotel_checkin = $('#checkin' + hotIid).val();
            const hotel_checkout = $('#checkout' + hotIid).val();
            const token = localStorage.getItem('token');
            const url = myGlobals.ExternalURL + 'packages/get_room_select_event/?' +'token=' + token;
            console.log(hotel_checkin);
            console.log(hotel_checkout);
            $.ajax({
                url: url,
                dataType: 'json',
                data: { city: city, adult_count: 1, child_count: 0, infant_count: 0, hotel_checkin: hotel_checkin, hotel_checkout: hotel_checkout, hotel_code: hotel_id, nationality:nationality},
                success: function (sucsfunc) {
                   console.log(sucsfunc);
                }
            });
        });
        
        $(document).on('change', '.adult_count', function () {
            const adult_count = $('.adult_count option:selected').val();
            const child_count = $('.child_count option:selected').val() || 0;
            const infant_count = $('.infant_count option:selected').val() || 0;
            const nationality = $('#nationality option:selected').val();
            const city = $('#package_id').val();
            const room_pric = new Array();
            console.log(adult_count);
            console.log(child_count);
            console.log(infant_count);
            console.log(nationality);
            console.log(city);
            $('.calc_room_price').each(function () {
                const room_pri = $('option:selected', this).attr('data-sec');
                room_pric.push(room_pri);
            });
            // console.log(room_pric);
            // $.ajax({
            //     type: 'POST',
            //     url: 'http://192.168.1.6/app/amada/packages/calculate_total/',
            //     data: {
            //         package_id: city,
            //         adult_count: adult_count,
            //         child_count: child_count,
            //         infant_count: infant_count,
            //         nationality: nationality,
            //         room_pric: room_pric
            //     },
            // }).done(function (data) {
            //     $('.total_price').html(data);
            // });
        });
        $('body').on('change','.ad_count_room,.cd_count_room',function (e) {
            const did = $(this).attr('did');
            const dd = $(this).attr('dd');
            const bkl = $('option:selected', this).val();
            const room_count = $('#n_rooms' + did + ' option:selected').val();
            const adult_count = $('#adult_c' + dd + ' option:selected').val() || 0;
            const child_count = $('#child_c' + dd + ' option:selected').val() || 0;

            const hotel_code = $('#hotel_code' + did + ' option:selected').val();
            const nationality = $('#nationality option:selected').val();
            const hotel_checkin = $('#checkin' + did).val();
            const city = $('#city' + did).val();
            const hotel_checkout = $('#checkout' + did).val();
            console.log(hotel_code);
            console.log(nationality);
            console.log(hotel_checkin);
            console.log(hotel_checkin);
            console.log(city);
            console.log(hotel_checkout);
            $.ajax({
                type : 'POST',
                url  : "<?php echo  WEB_URL.'packages/get_room_select/'; ?>",
                data : {city : city,adult_count: adult_count,room_count:room_count,child_count: child_count,hotel_checkin:hotel_checkin,hotel_checkout:hotel_checkout,hotel_code:hotel_code,nationality:nationality,did:did,dd:dd},
            }).done(function(data) {
                const spl=dd.split('');
                let sel : any;
                if(spl[1]==0){ let sel = '<div class="marginbotom10 mty"><span class="formlabel"><?php echo $this->adavegas["package"]["hotel_room"]; ?></span><div class="selectedwrap" ><select required name="hotel_room_code['+did+'][]" did="'+did+'" class="form-control calc_room_price mySelectBoxClass flyinputsnor valid h_r_c_'+did+'" aria-required="true" aria-invalid="false">'+data+'</select></div></div>'; }else{
                    let sel = '<div class="marginbotom10 mty"><span class="formlabel"></span><div class="selectedwrap" ><select required name="hotel_room_code['+did+'][]" did="'+did+'" class="form-control calc_room_price mySelectBoxClass flyinputsnor valid h_r_c_'+did+'" aria-required="true" aria-invalid="false">'+data+'</select></div></div>';
                }
                $('.hotel_room_menu'+dd).html(sel);
            });
        })
    }

}
