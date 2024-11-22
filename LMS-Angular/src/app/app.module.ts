import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashBoardComponent } from './components/Admin/admin-dash-board/admin-dash-board.component';
import { RecordsComponent } from './components/Admin/records/records.component';
import { RequestComponent } from './components/Admin/request/request.component';
import { ReturnComponent } from './components/Admin/return/return.component';
import { BookGalleryComponent } from './components/Member/book-gallery/book-gallery.component';
import { BorrowedHistoryComponent } from './components/Member/borrowed-history/borrowed-history.component';
import { ReservedBooksComponent } from './components/Member/reserved-books/reserved-books.component';
import { MemberDashBoardComponent } from './components/Member/member-dash-board/member-dash-board.component';
import { AddBookComponent } from './components/Admin/add-book/add-book.component';
import { BookTableComponent } from './components/Admin/book-table/book-table.component';
import { MemberRecordsComponent } from './components/Admin/member-records/member-records.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NevBarComponent } from './components/Admin/nev-bar/nev-bar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { RouterModule, RouterOutlet } from '@angular/router';
 Afra
import { BooksComponent } from './components/Admin/books/books.component';
import { SideBarComponent } from './components/Admin/side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    BlankLayoutComponent,
    UserLayoutComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashBoardComponent,
    RecordsComponent,
    RequestComponent,
    ReturnComponent,
    BookGalleryComponent,
    BorrowedHistoryComponent,
    ReservedBooksComponent,
    MemberDashBoardComponent,
    AddBookComponent,
    BookTableComponent,
    MemberRecordsComponent,
    NevBarComponent,
Afra
    NevBarComponent,
    BooksComponent,
    SideBarComponent,

  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    RouterOutlet,
    RouterModule,
Afra
    BrowserModule,
 
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
