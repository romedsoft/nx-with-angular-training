import { Category } from "./category.model";

export class Product {
    id?: string;
    name?:string;
    price? :number;
    countInStock? :number;
    category? :Category;
    createdAt? :Date;
    description? : string;
    richDescription? : string;
    brand? : string;
    rating? : number;
    numReviews? : number;
    isFeatured? : boolean;
    image? : string | ArrayBuffer | null | undefined ;
}