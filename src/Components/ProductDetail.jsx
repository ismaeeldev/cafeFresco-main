import { useState, useEffect, useContext } from 'react';
import MoreRecepies from './MoreProduct';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import productContext from '../Context/ProductContext';
import toast from 'react-hot-toast';


const ProductDetail = () => {
    const { title: encodedTitle } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [productData, setProductData] = useState({
        id: '',
        title: '',
        price: 0,
        details: '',
        description: '',
        image: ''
    });

    const [quantity, setQuantity] = useState(1); // Manage quantity state
    const [imageProduct, setImage] = useState(''); // Manage the displayed image

    const context = useContext(productContext);
    const { addToCart, getWishlist, ringtone } = context;

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const formatPrice = (price) => {
        // Ensure the price is a number and format to 2 decimal places
        return Number(price).toFixed(2);
    };

    // Set product data if available from location state
    useEffect(() => {
        if (location.state) {
            const { title, price, details, description, image, id } = location.state;
            setProductData({ title, price, details, description, image, id });
            setImage(image); // Initialize image state
        } else {
            navigate('/'); // Redirect if there's no product data
        }
    }, [location.state, navigate]);

    const decodedTitle = decodeURIComponent(encodedTitle); // Decode title from URL params

    // Handle image change
    const handleImageChange = (img) => {
        setImage(img);
    };

    // Handle quantity change with min 1
    const handleQuantityChange = (delta) => {
        setQuantity((prevQuantity) => Math.max(prevQuantity + delta, 1));
    };


    const priceProduct = productData.price * quantity;
    const totalPrice = formatPrice(priceProduct);



    // Add to cart function
    const handleCartSubmit = () => {
        const product = {
            id: productData.id,
            quantity: quantity
        };
        addToCart(product);
    };

    const handleWishList = async () => {
        try {
            const response = await fetch(`${BASE_URL}/wishlist/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ productId: productData.id }),
            });

            if (response.status === 401) {
                toast.error('Please login to continue.');
                ringtone.play();
                navigate('/login');
                return;
            }

            const result = await response.json();

            toast.success(result.message);
            ringtone.play();

            if (response.ok) {
                navigate('/products');
                getWishlist();
            }
        } catch (error) {
            console.error("Wishlist error:", error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    // const handlePayment = () => {
    //     const product = {
    //         title: decodedTitle,
    //         price: productData.price,
    //         details: productData.details,
    //         image: imageProduct,
    //         quantity: quantity
    //     };
    //     navigate(`/address/`);
    //     addtoBuy(product)

    // }


    return (
        <div>
            <section className="py-5" style={{ marginTop: "60px" }}>
                <div className="container">
                    <div className="row gx-5">
                        <aside className="col-lg-6">
                            <div className="border rounded-5 mb-3 d-flex justify-content-center">
                                <a data-fslightbox="mygalley" className="rounded-4" rel="noreferrer" data-type="image">
                                    <img
                                        style={{ width: "41vw", height: "55vh", maxWidth: '100%', maxHeight: '65vh', margin: 'auto' }}
                                        className="rounded-4 fit Mobile-product-image"
                                        src={`${BASE_URL}/${imageProduct}`}
                                        alt={decodedTitle}
                                    />
                                </a>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <a
                                    style={{ cursor: 'pointer' }}
                                    data-fslightbox="mygalley"
                                    className="border mx-1 rounded-2"
                                    rel="noreferrer"
                                    data-type="image"
                                    onClick={() => handleImageChange(productData.image)}
                                >
                                    <img width="60" height="60" className="rounded-2" src={`${BASE_URL}/${productData.image}`} alt="Product 1" />
                                </a>
                            </div>
                        </aside>
                        <main className="col-lg-6">
                            <div className="ps-lg-3">
                                <h4 className="title text-dark">
                                    {decodedTitle} <br />
                                </h4>
                                <div className="d-flex flex-row my-3">
                                    <div className="text-warning mb-1 me-2">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                        <span className="ms-1">4.5</span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <span className="h5">Price: {totalPrice}$</span>
                                </div>
                                <p>{productData.description}</p>
                                <div className="row">
                                    <dt className="col-3">Category:</dt>
                                    <dd className="col-9">{productData.details}</dd>
                                </div>
                                <hr />
                                <div className="row mb-4">
                                    <div className="col-md-4 col-6 mb-3">
                                        <label className="mb-2 d-block">Quantity</label>
                                        <div className="input-group mb-3" style={{ width: '170px' }}>
                                            <button
                                                className="btn btn-white border border-secondary px-3"
                                                type="button"
                                                onClick={() => handleQuantityChange(-1)}
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <input
                                                type="text"
                                                className="form-control text-center border border-secondary"
                                                value={quantity}
                                                readOnly
                                            />
                                            <button
                                                className="btn btn-white border border-secondary px-3"
                                                type="button"
                                                onClick={() => handleQuantityChange(1)}
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex gap-3">
                                    {/* <a onClick={handlePayment} href="#" className="btn btn-warning shadow-0  MobileBtn">Buy now</a> */}
                                    <a
                                        style={{ padding: "8px", backgroundColor: 'red', border: 'none' }}
                                        onClick={handleCartSubmit}
                                        href="#"
                                        className="btn btn-primary shadow-0"
                                    >
                                        <i className="me-1 fa fa-shopping-basket"></i>Add to cart
                                    </a>
                                    <a
                                        onClick={handleWishList}
                                        className="btn btn-light border border-secondary py-2 icon-hover px-3"
                                    >
                                        <i className="me-1 fa fa-heart fa-lg"></i> Save
                                    </a>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            <MoreRecepies count={4} />
        </div>
    );
};

export default ProductDetail;
