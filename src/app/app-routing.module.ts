import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { combineLatest } from 'rxjs';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { registerDispatcher } from '@angular/core/primitives/event-dispatch';
import { RegisterComponent } from './components/register/register.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminDashBoardComponent } from './components/Admin/admin-dash-board/admin-dash-board.component';
import { BookTableComponent } from './components/Admin/book-table/book-table.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { BookGalleryComponent } from './components/Member/book-gallery/book-gallery.component';
import { RequestComponent } from './components/Admin/request/request.component';
import { RecordsComponent } from './components/Admin/records/records.component';
import { ReturnComponent } from './components/Admin/return/return.component';
import { MemberRecordsComponent } from './components/Admin/member-records/member-records.component';
import { AddBookComponent } from './components/Admin/add-book/add-book.component';
import { NevBarComponent } from './components/Admin/nev-bar/nev-bar.component';
import { BorrowedHistoryComponent } from './components/Member/borrowed-history/borrowed-history.component';
import { MemberDashBoardComponent } from './components/Member/member-dash-board/member-dash-board.component';
import { ReservedBooksComponent } from './components/Member/reserved-books/reserved-books.component';
import { authGuard } from './auth.guard';
import { BooksComponent } from './components/Admin/books/books.component';
import { UnittBookComponent } from './components/Member/unitt-book/unitt-book.component';
import { AuthorBooksComponent } from './components/Member/author-books/author-books.component';
import { UserProfilComponent } from './components/Member/user-profil/user-profil.component';
import { EbookComponent } from './components/Member/ebook/ebook.component';
import { BookfavoriteComponent } from './components/Member/bookfavorite/bookfavorite.component';




const routes: Routes = [
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      { path: '', component: AdminDashBoardComponent },
      {
        path: 'book', component: BooksComponent, children: [
          {path:'addBook',component:AddBookComponent},
          { path: 'addBook/:id', component: AddBookComponent },
          { path: 'booktable', component: BookTableComponent },
          { path: 'request', component: RequestComponent },
          { path: 'record', component: RecordsComponent },
          { path: 'return', component: ReturnComponent },
          { path: 'memberRecords', component: MemberRecordsComponent }
        ]
      }
    ]
  },
  {
    path: 'member',
    component: UserLayoutComponent,
    children: [
      { path: 'book-gallery', component: BookGalleryComponent },
      { path: 'book-gallery/viewbook/:id', component: UnittBookComponent },

      { path: 'member-dash-board', component: MemberDashBoardComponent },
      {
        path: 'profile',
        component: UserProfilComponent,
        children: [
          { path: 'reserved-books', component: ReservedBooksComponent },
          { path: 'borrowed-history', component: BorrowedHistoryComponent },
          {path:'favorite',component:BookfavoriteComponent}
        ]
      },
      { path: 'book-gallery/authorBooks/:id', component: AuthorBooksComponent },
      { path: 'EBook', component: EbookComponent }
    ]
  },

  { path: 'home', component: BlankLayoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
