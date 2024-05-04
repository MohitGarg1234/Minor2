import React ,{useState , useContext} from 'react';


const DataContext = createContext();
export const useData = () => useContext(DataContext);



  export const DataProvider = ({ children }) => {
    const [connectedPeople, setConnectedPeople] = useState([]);
  const [userDetails,setUserDetails] =useState([]);
  
  


  
  

const token = localStorage.getItem("token");

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
// Extract user ID from decoded token
const decodedToken = parseJwt(token);
const currentUserId = decodedToken.userId;
const fetchUserDetails = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/${currentUserId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }
    const data = await response.json();
    setUserDetails(data);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};
useEffect(() => {
  fetchUserDetails(currentUserId);
  // eslint-disable-next-line 
}, [currentUserId]);
useEffect(() => {
    const fetchConnectedPeople = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/connected-people',{
          headers: {
            'Authorization': `${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setConnectedPeople(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchConnectedPeople();
  }, [token]);


  return (
    <DataContext.Provider value={{ userDetails,connectedPeople }}>
      {children}
    </DataContext.Provider>
  );
};