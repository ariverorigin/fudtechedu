import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'bookmarks',
    loadChildren: () =>
      import('./pages/bookmarks/bookmarks.module').then(
        (m) => m.BookmarksPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'details',
    loadChildren: () =>
      import('./pages/details/details.module').then((m) => m.DetailsPageModule),
  },
  {
    path: 'lessons',
    loadChildren: () =>
      import('./pages/lessons/lessons.module').then((m) => m.LessonsPageModule),
  },
  {
    path: 'references',
    loadChildren: () => import('./pages/references/references.module').then( m => m.ReferencesPageModule)
  },
  {
    path: 'references-modal',
    loadChildren: () => import('./pages/references-modal/references-modal.module').then( m => m.ReferencesModalPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
