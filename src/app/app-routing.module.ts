import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FairBillingComponent } from './components/fair-billing/fair-billing.component'

const routes: Routes = [
  { path: 'FairBilling', component: FairBillingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
