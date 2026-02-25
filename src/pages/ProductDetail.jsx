import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Loading product...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="detail-container">
      <Link to="/" className="back-btn">← Back to Products</Link>

      <div className="detail-grid">
        <div className="image-section">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="info-section">
          <h2>{product.title}</h2>
          <h3 className="price">₹ {product.price}</h3>
          <p className="category">{product.category}</p>
          <p className="description">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;