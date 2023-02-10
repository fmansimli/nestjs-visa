import * as fs from 'fs/promises';
import * as fs2 from 'fs';

import { join } from 'path';
import * as PDFKit from 'pdfkit';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async getFile(path: string) {
    const file = await fs.readFile(join(process.cwd(), 'public', path));
    return file;
  }

  async createPDF(title: string, author: string, desc: string) {
    const pdf = new PDFKit();

    pdf.info.Author = author;
    pdf.info.Title = title;
    pdf.info.CreationDate = new Date();

    pdf.fontSize(14).text(desc, { wordSpacing: 5, align: 'center' });

    pdf.addContent(new Date());

    pdf.addPage({
      margins: {
        top: 50,
        bottom: 50,
        left: 72,
        right: 72,
      },
    });

    pdf.circle(150, 150, 34).stroke('red');

    const pdfpath = join(process.cwd(), 'public', 'pdf', `${Date.now()}.pdf`);

    pdf.pipe(fs2.createWriteStream(pdfpath));

    pdf.end();

    return pdf;
  }
}
