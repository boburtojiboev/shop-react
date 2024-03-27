import React, { createContext, useContext, useState } from "react";
export const CategoryContext = createContext();
export const CategoryCont = () => useContext(CategoryContext);
const CategoryItem = ({ children }) => {
  // for Category Page

  const [category, setCategory] = useState("all");

  return (
    <CategoryContext.Provider value={[category, setCategory]}>
      {children}
    </CategoryContext.Provider>
  );
};
export default CategoryItem;
