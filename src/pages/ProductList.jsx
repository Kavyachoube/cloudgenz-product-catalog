import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = [
          "All",
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter logic
  useEffect(() => {
    let updatedProducts = [...products];

    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm.trim() !== "") {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, selectedCategory, products]);

  if (loading) return <h2>Loading products...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="container">
      <h1>Product Catalog</h1>
      <p>Browse our curated collection of products</p>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="card"
            >
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>₹ {product.price}</p>
              <p>{product.category}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;