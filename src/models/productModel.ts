export interface BidModel {
  bidderId: string;
  bidAmount: number;
  bidUnixTime: number;
}

export interface ProductModel {
  // Primary Key
  productId: string;

  // Foreign Key
  vendorId: string;

  title: string;
  deadlineUnixTime: number;
  highestBid: number;
  minimumBid: number;
  images: string[];
  rating: number;
  numberOfBids: number;
  numberOfRatings: number;
  bids: BidModel[];
  isOpen: boolean;
}

export interface ProductAddDto {
  vendorId: string;
  title: string;
  deadlineUnixTime: number;
  minimumBid: number;
  images: string[];
}

export interface ProductCardReadDto {
  productId: string;
  firstImage: string;
  title: string;
  highestBid: number;
  deadlineUnixTime: number;
  rating: number;
}
