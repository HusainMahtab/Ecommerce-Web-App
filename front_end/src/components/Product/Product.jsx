// import axios from "axios"
// import { useEffect, useState } from "react"

// const Product = () => {
//     const [products, setProducts] = useState([])

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const allProducts = await axios.get(`http://localhost:8000/api/v1/products`)
//                 console.log(allProducts.data.data)
//                 setProducts(allProducts.data.data)
//             } catch (error) {
//                 console.error("Error while fetching all products", error)
//             }
//         }
//         fetchProducts()
//     }, [])

//     return (
//         <>
//             {products.map((i) => (
//                 <Cart key={i._id} name={i.name} description={i.description} price={i.price} />
//             ))}
//         </>
//     )
// }

// const Cart = ({ name, description, price }) => {
//     return (
//         <>
//             <h3>{name}</h3>
//             <p>{description}</p>
//             <h1>{price}</h1>
//         </>
//     )
// }

// export default Product
