import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { ProductCardPropModel } from '../../models/propModels';

export function ProductCard(props: ProductCardPropModel) {
    const { imageString, title, deadlineUnixTime, highestBid, location } = props;

    return (
        <Card raised className='max-w-xs'>

            {/* Product Image */}
            <CardMedia
                component={"img"}
                className='h-60'
                image={imageString}
                title={title}
            />

            <CardContent>

                {/* Product Bidding Deadline */}
                <p className='bg-gray-200 rounded-full px-3 mb-2'>
                    <span className='me-4 font-semibold text-xl'>
                        {deadlineUnixTime}
                    </span>
                    <span className='text-slate-600'>
                        Left
                    </span>
                </p>

                {/* Product Highest Bid Amount */}
                <p className='w-full flex justify-between mb-6'>
                    <span className='text-slate-600'>
                        Highest Bid:
                    </span>
                    <span className='text-right pe-2 font-bold'>
                        Rs. {highestBid}
                    </span>
                </p>

                {/* Product Title */}
                <p className='text-xl leading-tight mb-2' >
                    {title}
                </p>

                {/* Product Location */}
                <p className='text-sm' >
                    From {" "}
                    <span className='font-semibold text-lg'>
                        {location}
                    </span>
                </p>

            </CardContent>
        </Card>
    );
}
