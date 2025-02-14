import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignBedComponent } from './assign-bed.component'; 
import { AssignBedDetailComponent } from './assign-bed-detail/assign-bed-detail.component';

const routes: Routes = [
  { path: '', component: AssignBedComponent },
  { path: 'detalle/:id', component: AssignBedDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignBedRoutingModule {}
