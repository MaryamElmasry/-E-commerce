export interface Iwishlist {
	_id: string;
	name: string;
	slug: string;
	category: string;
}

export interface Category {
	_id: string;
	name: string;
	slug: string;
	image: string;
}

export interface Brand {
	_id: string;
	name: string;
	slug: string;
	image: string;
}

export interface RootObject {
	sold: number;
	images: string[];
	subcategory: Iwishlist[];
	ratingsQuantity: number;
	_id: string;
	title: string;
	slug: string;
	description: string;
	quantity: number;
	price: number;
	imageCover: string;
	category: Category;
	brand: Brand;
	ratingsAverage: number;
	createdAt: string;
	updatedAt: string;
	__v: number;
	id: string;
}