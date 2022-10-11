export class Book {
  constructor(title, author, description, pages, currentPage) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.pages = pages;
    this.currentPage = currentPage;
    this.read = false;
  }

  readBook(page) {
    if (page === this.pages) {
      this.read = true;
      return 1;
    } else if (page < 0 || page > this.pages) {
      return 0;
    } else {
      page = this.currentPage;
      return 1;
    }
  }
}

let inconsolé = new Book("L'inconsolé", "Kazuo Ishiguro", "mon livre Kafkaïen préféré", 806, 300);
let cleanCode = new Book("Clean Code", "Robert C. Martin", "How to make your code clean", 304, 304);
let myBook = new Book("My Book", "Taekyon", "My first Book", 201, 10);

export const books = [inconsolé, cleanCode, myBook];
