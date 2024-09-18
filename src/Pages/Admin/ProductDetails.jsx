import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import EditProduct from '../../Components/EditProduct';
import { deleteProduct, getProduct } from '../../Services/appAPI';
import { baseUrl } from '../../Services/baseUrl';

function ProductDetails() {
 

  const[products,setProducts]=useState([])
useEffect(()=>{
  display()
},[])


  
  const display=async()=>{
    const result = await getProduct()
    console.log(result.data);
    setProducts(result.data)
    
   }

   const deleteProducts = async(id)=>{
    
    const token = sessionStorage.getItem('token')
    if(token){
      var reqHeader={
        "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
      }

    const result = await deleteProduct(id,reqHeader)
    console.log(result);
    if(result.status == 200){
      alert('product deletion successfull')
      display()
    }
   else{
    alert('error')
   }
  }
   }


  return (
    <div id='productdetails'>
        <h3 style={{fontWeight:"bolder", margin:"10px"}}>Product Details</h3>
      <div style={{width:"70%"}}>

          <Table bordered='bool' hover='bool' responsive="sm" className='mt-2'>
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Price</th>
                <th>Action</th>   
              </tr>
            </thead>
            <tbody>{ 
                  
                  products.map((item,index)=>(        
                  <tr key={index}>
                <td>{item?.pid}</td>
                <td>{item?.pcategory}</td>
                <td>{item?.pname}</td>
                <td>{item?.pdescription}</td>
                <td style={{width:"30%"}}><img src={item?`${baseUrl}/uploads/${item.pimage}`:'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg'} alt="" style={{width:"30%"}}/></td>
                <td>{item?.pprice}</td>
                <td style={{display:"flex"}}>
                <EditProduct products={item} display={display}/>
                <Button variant='outline' className='bg-primary' onClick={()=>deleteProducts(item._id)}><i class="fa-solid fa-trash" style={{color: "#FFD43B"}}></i></Button>
                </td>
                
              </tr>
              )) } 
              </tbody>
              </Table>
           
      </div>
      <div>
         <Link to={'/adminform'}> 
         <Button variant='outline' hover className='bg-primary mb-2' style={{}}>Add Products</Button></Link>
        </div>
    </div>
  )
}

export default ProductDetails
