import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { ShareReplayConfig } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  createNewBook(book:Ibook){
    return this.http.post("http://localhost:5255/api/Books",book)
   }

   getAllGenres(){
    return this.http.get<any>("http://localhost:5255/api/Genre/getAllGenres");
   }

   getAllLanguage(){
    return this.http.get<any>("http://localhost:5255/api/Language/AllLanguage");
   }

   postnewAuthor(author:IAuthor){
    return this.http.post("http://localhost:5255/api/Author/NewAuthor",author)
   }

   getallAuthors(){
    return this.http.get<any>("http://localhost:5255/api/Author/AllAuthors");
   }


   postNewPublisher(publisher:Ipublisher){
    return this.http.post("http://localhost:5255/api/Pubisher/NewPublisher",publisher)
   }


   getAllPublisher(){
    return this.http.get<any>("http://localhost:5255/api/Pubisher/AllPublisher")
   }

   getAllBooks(){
    return this.http.get<any>("http://localhost:5255/api/Books");
   }

   getBookByid(bookid:string){
    return this.http.get<any>("http://localhost:5255/api/Books/"+bookid)
   }


   filterBook(genre: string) {
    return this.http.get<any>("http://localhost:5255/api/Books/Genre?Genre=" + genre);
  }

  filterByLanguage(language:string){
    return this.http.get<any>("http://localhost:5255/api/Books/Languageatype?Language="+language)
  }


  getBookByAuthorId(authorID:string){
    return this.http.get<any>(`http://localhost:5255/api/Books/GetAuthorBooks?Author=${authorID}`)
  }

}



export interface Ibook{
  name:string,
  description:string,
  isbn:string,
  pageCount:number,
  isAvailable:boolean,
  quantity:number,
  authorId:string,
  publisherId:string,
  languageId:string,
  genreId:string,
  image2Path:string,
  publishDate:Date
}

export interface IAuthor{
  authorName:string,
  imageUrl:string,
  bio:string
}

export interface Ipublisher{
  publisherName:string,
  description:string,
  details:string
}


