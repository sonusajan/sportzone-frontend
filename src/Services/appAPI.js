// import { baseUrl } from "./baseUrl"
// import { commonAPI } from "./commonAPI"

// export const registerAPI = async(user)=>{
//     return await commonAPI("POST",`${baseUrl}/user/register`,user,"")
// }
import { baseUrl } from "./baseUrl";
import { commonAPI } from "./commonAPI";

//Registration
export const registerAPI = async(user)=>{
    return await commonAPI("POST",`${baseUrl}/user/register`,user,"")
}

//Login
export const loginAPI = async(user)=>{
    return await commonAPI("POST",`${baseUrl}/user/login`,user,"")
}

//AddProduct
export const productAPI = async(product,reqHeader)=>{
    return await commonAPI("POST",`${baseUrl}/admin/addproduct`,product,reqHeader)
}

//To Get All Products
export const getProduct = async()=>{
    return await commonAPI("GET",`${baseUrl}/admin/getproducts`,"","")
}

//Edit Products
export const editProduct = async(id,product,reqHeader)=>{
    return await commonAPI("PUT",`${baseUrl}/admin/editproduct/${id}`,product,reqHeader)
}

//Delete Product
export const deleteProduct = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${baseUrl}/admin/deleteproducts/${id}`,{},reqHeader)
}


//Add to Cart
export const addCartAPI = async(user,reqBody,reqHeader)=>{
    return await commonAPI("POST",`${baseUrl}/user/addtocart/${user}`,reqBody,reqHeader)
}


//Display Cart
export const displayCartAPI = async(user,pid,reqHeader)=>{
    return await commonAPI("GET",`${baseUrl}/user/getfromcart/${user}`,{},{})
}

//Remove from Cart
export const removefromCartAPI = async(users,pid,reqHeader)=>{
    return await commonAPI("POST",`${baseUrl}/user/removefromcart/${users}`,{pid},reqHeader)
}

//Google Login
export const googleLoginAPI = async(user)=>{
    return await commonAPI("POST",`${baseUrl}/user/googlelogin`,user,"")
}


//order items
export const order = async(uid,reqBody,reqHeader)=>{
    return await commonAPI("POST",`${baseUrl}/user/orderproducts/${uid}`,reqBody,reqHeader)
}


//clear cart
export const clearCartApi = async(uid,reqHeader)=>{
    return await commonAPI("DELETE",`${baseUrl}/user/clearcart/${uid}`,{},reqHeader)
}

//get orders-Admin
export const getOrderApi = async()=>{
    return await commonAPI("GET",`${baseUrl}/admin/getOrder`,"","")
}

//get orders-User
export const getUserOrderApi = async(uid)=>{
    return await commonAPI("GET",`${baseUrl}/user/getOrder/${uid}`,"","")
}

//forgetPassword
export const forgetPasswordApi = async(data)=>{
    return await commonAPI("POST",`${baseUrl}/user/forgetpassword`,data,"")
}

//Reset Password
export const resetPasswordApi = async(token,password)=>{
    return await commonAPI("POST",`${baseUrl}/user/resetpassword`,{token,password},"")
}


//show users
export const showUsersApi = async()=>{
    return await commonAPI("GET",`${baseUrl}/admin/showusers`,{},"")
}

//edit user
export const editUsers = async(id,data,reqHeader)=>{
    return await commonAPI("PUT",`${baseUrl}/user/edituser/${id}`,data,reqHeader)
}