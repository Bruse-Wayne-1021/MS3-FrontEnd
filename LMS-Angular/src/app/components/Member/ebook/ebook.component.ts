import { Component, OnInit } from '@angular/core';
import { BookService, Booktype } from '../../../Service/book.service';
import { jsPDF } from 'jspdf';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-ebook',
  templateUrl: './ebook.component.html',
  styleUrls: ['./ebook.component.css']
})
export class EbookComponent implements OnInit {
  Ebook: any[] = []; // List to store fetched eBooks

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.GetEbook();
  }


  GetEbook() {
    this.bookService.getEbook(Booktype.EBook).subscribe({
      next: (data) => {
        console.log(data);
        this.Ebook = data?.$values || [];
      },
      error: (error) => {
        console.error('Error fetching eBooks:', error);
      }
    });
  }


  printEbook(book: any) {
    if (!book.filePath) {
      console.error('No eBook content available.');
      return;
    }

    let base64Pdf = book.filePath;
    if (base64Pdf.startsWith('data:application/pdf;base64,')) {
      base64Pdf = base64Pdf.replace('data:application/pdf;base64,', '');
    }

    try {
      const binaryString = atob(base64Pdf);
      const byteArray = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${book.name || 'ebook'}_Details.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error decoding base64 PDF:', error);
    }
  }


  generateQRCode(book: any) {
    let dataToEncode = book.filePath || 'No eBook available';
    if (dataToEncode.length > 500) {
      console.error('Data too large for QR Code.');
      dataToEncode = 'Data is too large to encode in a QR code.';
    }
    QRCode.toCanvas(dataToEncode, { version: 10, errorCorrectionLevel: 'L' }, (error, canvas) => {
      if (error) {
        console.error('Error generating QR Code:', error);
        return;
      }

      const qrContainer = document.getElementById(`qr-code-container-${book.id}`);
      if (qrContainer) {
        qrContainer.innerHTML = '';
        qrContainer.appendChild(canvas);
      }
    });
  }

}
