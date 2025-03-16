import { Routes } from '@angular/router';
import { BrowseComponent } from './components/browse/browse.component';
import { EditComponent } from './components/edit/edit.component';

export const routes: Routes = [
  { path: '', component: BrowseComponent },
  { path: 'new', component: EditComponent },
  { path: 'edit/:id', component: EditComponent }
];
