export async function userSignIn (user) {
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }

      const data = await response.json();
      return data; // Return the data obtained from the response
    } catch (error) {
      throw new Error("Failed to sign in: " + error.message); // Propagate the error
    }
  }

export async function getAllCategory (){
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories')
        if (!response.ok) {
          throw new Error("Service unavailable");
        }
        const data = await response.json();
        return data; // Return the data obtained from the response
      } catch (error) {
        throw new Error("Error occured : " + error.message); // Propagate the error
      }
}


export async function getProducts(category){
  try {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`)
    if (!response.ok) {
      throw new Error("Service unavailable");
    }
    const data = await response.json();
    return data; // Return the data obtained from the response
  } catch (error) {
    throw new Error("Error occured : " + error.message); // Propagate the error
  }
}