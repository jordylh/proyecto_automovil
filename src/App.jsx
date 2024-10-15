import { Automovil } from "./components/Automovil";
import { Header } from "./components/Header";
import { useCart } from "./hooks/useCart";  // Assuming this is where your hook is defined
import { db } from "./data/db";  // Importing `data` separately if needed

function App() {
  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    clear,
    removeFromCart,
    cartTotal
  } = useCart();

  const data = db; // Assuming data comes from db

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clear={clear}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Automóviles disponibles</h2>
        <div className="row mt-5">
          {data.map((automovil) => (
            <Automovil
              key={automovil.id}
              automovil={automovil}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="mt-5 py-5">
        <div className="container-xl">
          <p className="text-center fs-6 mt-4 m-md-0 text-muted">2024 Super Carros, Inc</p>
        </div>
      </footer>
    </>
  );
}

export default App;
