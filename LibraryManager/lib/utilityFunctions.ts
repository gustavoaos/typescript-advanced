import { Category } from "./../models/enums";
import { Book, Magazine } from "./../models/interfaces";

export function CalculateLateFee(daysLate: number): number {
	return daysLate * .25;
}

export function MaxBooksAllowed(age: number): number {
	return age < 12 ? 3 : 10;
}

function privateFunc(): void {
	console.log("This is private...");
}

export function Purge<T>(inventory: Array<T>): Array<T> {
	// implement fancy logic here...
	return inventory.splice(2, inventory.length);
}

export function GetAllBooks(): Array<Book> {
	const books = [
		{ id: 1, title: "Ulysses", author: "James Joyce", available: true, category: Category.Fiction },
		{ id: 2, title: "A Farewell to Arms", author: "Ernest Hemingway", available: false, category: Category.Fiction },
		{ id: 3, title: "I Know Why the Caged Bird Sings", author: "Maya Angelou", available: true, category: Category.Poetry },
		{ id: 4, title: "Moby Dick", author: "Herman Melville", available: true, category: Category.Fiction }
	];

	return books;
}

export function GetAllMagazines(): Array<Magazine> {
	const magazines: Array<Magazine> = [
		{ title: "Python Programmer Review", publisher: "Smarty Publishing" },
		{ title: "Five Points", publisher: "Georgia State University" },
		{ title: "Poetry Quarterly", publisher: "Literary Press" },
		{ title: "Baseball News", publisher: "Sports Press" }
	];

	return magazines;
}

export function LogFirstAvailable(books = GetAllBooks()): void {
	const numberOfBooks: number = books.length;
	let firstAvailable: string = "";

	for (const currentBook of books) {
		if (currentBook.available) {
			firstAvailable = currentBook.title;
			break;
		}
	}

	console.log("Total Books: " + numberOfBooks);
	console.log("First Available: " + firstAvailable);
}

export function GetBookTitlesByCategory(categoryFilter: Category = Category.Fiction): Array<string> {
	const allBooks = GetAllBooks();
	const filteredTitles: Array<string> = [];

	console.log("Getting books in category: " + Category[categoryFilter]);

	for (const currentBook of allBooks) {
		if (currentBook.category === categoryFilter) {
			filteredTitles.push(currentBook.title);
		}
	}

	return filteredTitles;
}

export function LogBookTitles(titles: Array<string>): void {
	for (const title of titles) {
		console.log(title);
	}
}

export function GetBookByID(id: number): Book {
	const allBooks = GetAllBooks();
	return allBooks.filter(book => book.id === id)[0];
}

export function CreateCustomerID(name: string, id: number): string {
	return name + id;
}

export function CreateCustomer(name: string, age?: number, city?: string): void {
	console.log("Creating customer " + name +
		(age ? "\nAge: " + age : "") +
		(city ? "\nCity: " + city : ""));
}

export function CheckoutBooks(customer: string, ...bookIDs: Array<number>): Array<string> {
	const booksCheckedOut: Array<string> = [];

	console.log("Checking out books for " + customer);

	for (const id of bookIDs) {
		const book = GetBookByID(id);

		if (book.available) {
			booksCheckedOut.push(book.title);
		}
	}

	return booksCheckedOut;
}

export function GetTitles(bookProperty: string | boolean): Array<string> {
	const allBooks = GetAllBooks();
	const foundTitles: Array<string> = [];

	if (typeof bookProperty === "string") {
		// get all books by a particular author
		for (const book of allBooks) {
			if (book.author === bookProperty) {
				foundTitles.push(book.title);
			}
		}
	} else if (typeof bookProperty === "boolean") {
		// get all books based on specified availability
		for (const book of allBooks) {
			if (book.available === bookProperty) {
				foundTitles.push(book.title);
			}
		}
	}

	return foundTitles;
}

export function PrintBook(book: Book): void {
	console.log(book.title + " by " + book.author);
}

// Mixin
export function applyMixins(derivedCtor: any, baseCtors: Array<any>) {
	baseCtors.forEach(baseCtor => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
			derivedCtor.prototype[name] = baseCtor.prototype[name];
		});
	});
}
