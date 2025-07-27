import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  // console.log(supabase)

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("smoothies").select();
      if (error) {
        setFetchError("Could not fetch the data");
        setSmoothies(null);
        console.error(error);
      } else if (data) {
        setSmoothies(data);
        console.log(data);
        setFetchError(null);
      }
    };
    fetchSmoothies();
  }, []);

  if (fetchError)
    return (
      <div className="page home">
        <header className="main-header">
          <h1>🍓 Smoothie Recipes</h1>
        </header>
        <p className="error">{fetchError}</p>
      </div>
    );

  return (
    <div className="page home">
      <header className="main-header">
        <h1>🍓 Smoothie Recipes</h1>
        <p className="subtitle">Discover delicious blends and healthy ideas!</p>
      </header>
      <div className="smoothies-grid">
        {smoothies && smoothies.length > 0 ? (
          smoothies.map((smoothie) => (
            <div className="smoothie-card" key={smoothie.id}>
              <h2 className="smoothie-title">{smoothie.title}</h2>
              <p className="smoothie-method">{smoothie.method}</p>
            </div>
          ))
        ) : (
          <p className="no-smoothies">No smoothies found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
