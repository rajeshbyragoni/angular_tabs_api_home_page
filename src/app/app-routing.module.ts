import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HotelsComponent} from './hotels/hotels.component';
import {UserRegisterComponent} from './user/user-register/user-register.component';
import {UserLoginComponent} from './user/user-login/user-login.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthGuard} from './_guards/auth.guard';
import {B2bdashboardComponent} from './b2bdashboard/b2bdashboard.component';
import {B2bprofileComponent} from './b2bdashboard/b2bprofile/b2bprofile.component';
import {SubagentComponent} from './b2bdashboard/subagent/subagent.component';
import {EditsubagentComponent} from './b2bdashboard/editsubagent/editsubagent.component';
import {SubagentdepositComponent} from './b2bdashboard/subagentdeposit/subagentdeposit.component';
import {B2bDepositManagementComponent} from './b2bdashboard/b2b-deposit-management/b2b-deposit-management.component';
import {AccountsledgerComponent} from './b2bdashboard/accountsledger/accountsledger.component';
import {FinancilreportingComponent} from './b2bdashboard/financilreporting/financilreporting.component';
import {MarkupComponent} from './b2bdashboard/markup/markup.component';
import {BookinghistoryComponent} from './b2bdashboard/bookinghistory/bookinghistory.component';
import {PasswordsettingsComponent} from './b2bdashboard/passwordsettings/passwordsettings.component';
import {SupportticketComponent} from './b2bdashboard/supportticket/supportticket.component';
import {NewsletterComponent} from './b2bdashboard/newsletter/newsletter.component';
import {GenericmarkupComponent} from './b2bdashboard/genericmarkup/genericmarkup.component';
import {CountrymarkupComponent} from './b2bdashboard/countrymarkup/countrymarkup.component';
import {SpecificmarkupComponent} from './b2bdashboard/specificmarkup/specificmarkup.component';
import {HoteldetailsComponent} from './hoteldetails/hoteldetails.component';
import {HotelreviewComponent} from './hotelreview/hotelreview.component';
import {HoteltravellerComponent} from './hoteltraveller/hoteltraveller.component';
import {SuccesspaymentComponent} from './successpayment/successpayment.component';
import {VoucherComponent} from './voucher/voucher.component';
import {FlightsComponent} from './flights/flights.component';
import {TourComponent} from './tour/tour.component';
import {TourDetailsComponent} from './tour-details/tour-details.component';
import {PackagesComponent} from './packages/packages.component';
import {PackageDetailsComponent} from './package-details/package-details.component';


const routes: Routes = [
    {path: '', component: UserLoginComponent, canLoad: [AuthGuard]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
    {path: 'hotels', component: HotelsComponent, canActivate: [AuthGuard]},
    {path: 'user-register', component: UserRegisterComponent},
    {path: 'b2bdashboard', component: B2bdashboardComponent, canActivate: [AuthGuard]},
    {path: 'b2b-profile', component: B2bprofileComponent, canActivate: [AuthGuard]},
    {path: 'subagent', component: SubagentComponent, canActivate: [AuthGuard]},
    {path: 'editsubagent', component: EditsubagentComponent, canActivate: [AuthGuard]},
    {path: 'subagentdeposit', component: SubagentdepositComponent, canActivate: [AuthGuard]},
    {path: 'b2b-deposit-management', component: B2bDepositManagementComponent, canActivate: [AuthGuard]},
    {path: 'accountsledger', component: AccountsledgerComponent, canActivate: [AuthGuard]},
    {path: 'financilreporting', component: FinancilreportingComponent, canActivate: [AuthGuard]},
    {path: 'markup', component: MarkupComponent, canActivate: [AuthGuard]},
    {path: 'bookinghistory', component: BookinghistoryComponent, canActivate: [AuthGuard]},
    {path: 'passwordsettings', component: PasswordsettingsComponent, canActivate: [AuthGuard]},
    {path: 'supportticket', component: SupportticketComponent, canActivate: [AuthGuard]},
    {path: 'newsletter', component: NewsletterComponent, canActivate: [AuthGuard]},
    {path: 'genericmarkup', component: GenericmarkupComponent, canActivate: [AuthGuard]},
    {path: 'countrymarkup', component: CountrymarkupComponent, canActivate: [AuthGuard]},
    {path: 'specificmarkup', component: SpecificmarkupComponent, canActivate: [AuthGuard]},
    {path: 'hotels', component: HotelsComponent, canActivate: [AuthGuard]},
    {path: 'flights', component: FlightsComponent, canActivate: [AuthGuard]},
    {path: 'hoteldetails', component: HoteldetailsComponent, canActivate: [AuthGuard]},
    {path: 'booking', component: HotelreviewComponent, canActivate: [AuthGuard]},
    {path: 'bookingraveller', component: HoteltravellerComponent, canActivate: [AuthGuard]},
    {path: 'successpayment', component: SuccesspaymentComponent, canActivate: [AuthGuard]},
    {path: 'voucher', component: VoucherComponent, canActivate: [AuthGuard]},
    {path: 'tours', component: TourComponent, canActivate: [AuthGuard]},
    {path: 'tourdetails', component: TourDetailsComponent, canActivate: [AuthGuard]},
    {path: 'packages', component: PackagesComponent, canActivate: [AuthGuard]},
    {path: 'packagedetails', component: PackageDetailsComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class AppRoutingModule {
}
