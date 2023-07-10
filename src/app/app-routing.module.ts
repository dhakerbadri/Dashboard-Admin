import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MyChartComponent } from './my-chart/my-chart.component';

const routes: Routes = [
  { path: 'Home', component: AppComponent },
  { path: 'Charts', component: MyChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
