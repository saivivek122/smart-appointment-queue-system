async function getActiveServices() {
    const token = localStorage.getItem("token");
    console.log("Function called");
    const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/services/active",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    let data=await response.json()
    if(!response.ok){
        throw new Error(data.message)
    }
    return data
   
}
export default getActiveServices;
