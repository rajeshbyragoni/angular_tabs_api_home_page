import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BannerComponent} from './banner/banner.component';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DealsComponent} from './deals/deals.component';
import {FlightsComponent} from './flights/flights.component';
import {HotelsComponent} from './hotels/hotels.component';
import {FilterComponent} from './hotels/filter/filter.component';
import {ResultComponent} from './hotels/result/result.component';
import {Ng5SliderModule} from 'ng5-slider';
import {GlobalService} from './service/global.service';
import {DatePipe} from '@angular/common';
import {MessageService} from './service/message.service';
import {UserRegisterComponent} from './user/user-register/user-register.component';
import {UserLoginComponent} from './user/user-login/user-login.component';
import {LogoutComponent} from './logout/logout.component';
import {B2bdashboardComponent} from './b2bdashboard/b2bdashboard.component';
import {B2bsidebarComponent} from './b2bdashboard/b2bsidebar/b2bsidebar.component';
import {B2bcontentComponent} from './b2bdashboard/b2bcontent/b2bcontent.component';
import {B2bprofileComponent} from './b2bdashboard/b2bprofile/b2bprofile.component';
import {B2bDepositManagementComponent} from './b2bdashboard/b2b-deposit-management/b2b-deposit-management.component';
import {AccountsledgerComponent} from './b2bdashboard/accountsledger/accountsledger.component';
import {BookinghistoryComponent} from './b2bdashboard/bookinghistory/bookinghistory.component';
import {PasswordsettingsComponent} from './b2bdashboard/passwordsettings/passwordsettings.component';
import {SupportticketComponent} from './b2bdashboard/supportticket/supportticket.component';
import {NewsletterComponent} from './b2bdashboard/newsletter/newsletter.component';
import {SubagentComponent} from './b2bdashboard/subagent/subagent.component';
import {SubagentdepositComponent} from './b2bdashboard/subagentdeposit/subagentdeposit.component';
import {FinancilreportingComponent} from './b2bdashboard/financilreporting/financilreporting.component';
import {MarkupComponent} from './b2bdashboard/markup/markup.component';
import {EditsubagentComponent} from './b2bdashboard/editsubagent/editsubagent.component';
import {GenericmarkupComponent} from './b2bdashboard/genericmarkup/genericmarkup.component';
import {CountrymarkupComponent} from './b2bdashboard/countrymarkup/countrymarkup.component';
import {SpecificmarkupComponent} from './b2bdashboard/specificmarkup/specificmarkup.component';
import {RangeOnePipe, RangePipe, TextPipe, DateSuffix, DemoNumber, GrdFilterPipe, numPipe, mathRound} from './pipes/text.pipe';
import {HoteldetailsComponent} from './hoteldetails/hoteldetails.component';
import {HotelreviewComponent} from './hotelreview/hotelreview.component';
import {HoteltravellerComponent} from './hoteltraveller/hoteltraveller.component';
import {SuccesspaymentComponent} from './successpayment/successpayment.component';
import {VoucherComponent} from './voucher/voucher.component';
import { TourComponent } from './tour/tour.component';
import { TourDetailsComponent } from './tour-details/tour-details.component';
import { PackagesComponent } from './packages/packages.component';
import { PackageDetailsComponent } from './package-details/package-details.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        BannerComponent,
        HomeComponent,
        DealsComponent,
        FlightsComponent,
        HotelsComponent,
        FilterComponent,
        ResultComponent,
        UserRegisterComponent,
        UserLoginComponent,
        LogoutComponent,
        B2bdashboardComponent,
        B2bsidebarComponent,
        B2bcontentComponent,
        B2bprofileComponent,
        B2bDepositManagementComponent,
        AccountsledgerComponent,
        BookinghistoryComponent,
        PasswordsettingsComponent,
        SupportticketComponent,
        NewsletterComponent,
        SubagentComponent,
        SubagentdepositComponent,
        FinancilreportingComponent,
        MarkupComponent,
        EditsubagentComponent,
        GenericmarkupComponent,
        CountrymarkupComponent,
        SpecificmarkupComponent,
        TextPipe, RangePipe, RangeOnePipe, DateSuffix, DemoNumber, GrdFilterPipe,numPipe, mathRound,
        HotelsComponent,
        FilterComponent,
        ResultComponent,
        HoteldetailsComponent,
        HotelreviewComponent,
        HoteltravellerComponent,
        SuccesspaymentComponent,
        VoucherComponent,
        TourComponent,
        TourDetailsComponent,
        PackagesComponent,
        PackageDetailsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        Ng5SliderModule
    ],
    providers: [
        GlobalService,
        DatePipe,
        MessageService,
        TextPipe, RangePipe, RangeOnePipe, DateSuffix, DemoNumber, GrdFilterPipe,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
