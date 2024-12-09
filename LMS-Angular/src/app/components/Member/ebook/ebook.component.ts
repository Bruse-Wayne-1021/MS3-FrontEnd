import { Component, OnInit } from '@angular/core';
import { BookService, Booktype } from '../../../Service/book.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-ebook',
  templateUrl: './ebook.component.html',
  styleUrls: ['./ebook.component.css']
})
export class EbookComponent implements OnInit {
  Ebook: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.GetEbook();
  }

  GetEbook() {
    this.bookService.getEbook(Booktype.EBook).subscribe({
      next: (data) => {
        console.log(data);
        this.Ebook = data?.$values;
        console.log(this.Ebook);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  printEbook(book: any) {
    const doc = new jsPDF();
    console.log('Book to print:', book);
    doc.setFontSize(16);
    doc.text('EBook Details', 10, 10);
    doc.setFontSize(12);
    doc.text(`Name: ${book.name || 'N/A'}`, 10, 30);
    doc.text(`Description: ${book.description || 'N/A'}`, 10, 40);
    doc.text(`ISBN: ${book.isbn || 'N/A'}`, 10, 50);
    doc.text(`Page Count: ${book.pageCount || 'N/A'}`, 10, 60);
    doc.text(`Author: ${book.authorId || 'N/A'}`, 10, 70);
    doc.text(`Publisher: ${book.publisherId || 'N/A'}`, 10, 80);
    doc.text(`Language: ${book.languageId || 'N/A'}`, 10, 90);
    doc.text(`Genre: ${book.textContent || 'N/A'}`, 5, 100);
    doc.save(`${book.name}_Details.pdf`);
  }

}
