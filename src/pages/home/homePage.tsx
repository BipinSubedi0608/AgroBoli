import { ProductCard } from "../../components/home/productCard";
import { ProductCardPropModel } from "../../models/propModels";

const products: ProductCardPropModel[] = [
    {
        imageString: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv16mQSx3cF7qBs4FbJKowZc0BnvzdtAtFfQ&s",
        title: "15 kg Cabbage, 12 kg potato at low price in Itahari buy now sale sale",
        deadlineUnixTime: 170000,
        highestBid: 1500,
        location: "Itahari, Sunsari"
    },
    {
        imageString: "https://cdn.britannica.com/17/196817-159-9E487F15/vegetables.jpg",
        title: "15 kg Cabbage, 12 kg potato at low price in Itahari buy now sale sale",
        deadlineUnixTime: 170000,
        highestBid: 1500,
        location: "Itahari, Sunsari"
    },
    {
        imageString: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv16mQSx3cF7qBs4FbJKowZc0BnvzdtAtFfQ&s",
        title: "15 kg Cabbage, 12 kg potato at low price in Itahari buy now sale sale",
        deadlineUnixTime: 170000,
        highestBid: 1500,
        location: "Itahari, Sunsari"
    },
    {
        imageString: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv16mQSx3cF7qBs4FbJKowZc0BnvzdtAtFfQ&s",
        title: "15 kg Cabbage, 12 kg potato at low price in Itahari buy now sale sale",
        deadlineUnixTime: 170000,
        highestBid: 1500,
        location: "Itahari, Sunsari"
    },
    {
        imageString: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv16mQSx3cF7qBs4FbJKowZc0BnvzdtAtFfQ&s",
        title: "15 kg Cabbage, 12 kg potato at low price in Itahari buy now sale sale",
        deadlineUnixTime: 170000,
        highestBid: 1500,
        location: "Itahari, Sunsari"
    },
    {
        imageString: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv16mQSx3cF7qBs4FbJKowZc0BnvzdtAtFfQ&s",
        title: "15 kg Cabbage, 12 kg potato at low price in Itahari buy now sale sale",
        deadlineUnixTime: 170000,
        highestBid: 1500,
        location: "Itahari, Sunsari"
    },
    {
        imageString: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv16mQSx3cF7qBs4FbJKowZc0BnvzdtAtFfQ&s",
        title: "15 kg Cabbage, 12 kg potato at low price in Itahari buy now sale sale",
        deadlineUnixTime: 170000,
        highestBid: 1500,
        location: "Itahari, Sunsari"
    },
]

export default function HomePage() {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-4">
                {products.map((item, index) => (
                    <ProductCard
                        key={index}
                        imageString={item.imageString}
                        title={item.title}
                        highestBid={item.highestBid}
                        location={item.location}
                        deadlineUnixTime={item.deadlineUnixTime}
                    />
                ))}
            </div>
        </div>
    );
}