import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { getUserOrderApi } from '../../Services/appAPI'
import { baseUrl } from '../../Services/baseUrl'

function OrderDetails() {

    const [orders,setOrders] = useState([])

    useEffect(()=>{
       display()
    },[])
 
      const display=async()=>{
        const user = JSON.parse(sessionStorage.getItem('user'))
       const token = sessionStorage.getItem('token')
       if(token){
       const result = await getUserOrderApi(user._id)
       if(result.status == 200){
         setOrders(result.data)
         console.log(result);
         
       }else{
         alert('no orders')
       }
     }else{
       alert('error')
     }
      }
      console.log(orders);

  return (
    <div>
      {orders.length>0 ?
      <div>
         <h3 style={{fontWeight:"bolder", margin:"10px"}}>Order Details</h3>
        <div style={{width:"90%", margin:"20px"}}>
             <Table variant='dark' className='bg-primary' responsive="sm" border={'bool'} hover>
              <thead>
                <tr>
                  <th>Product Name</th>   
                  <th>Image</th>
                  <th>Price</th>
                  
                </tr>
              </thead>
              <tbody>
                { orders ?
                  orders.map((item,index)=>(
                  item.order.map((items)=>(
                <tr key={index}>
                  <td>{items.pid.pname}</td>
                  <td style={{width:"30%"}}><img src={items?`${baseUrl}/uploads/${items.pid.pimage}`:'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg'} alt="" style={{width:"30%"}}/></td>
  
                  <td>{items.pid.pprice}</td>
              
                  </tr>
                  ))
                )):""
              }
                
                </tbody>
                </Table>
        </div>
      </div>
      :
    <div style={{ width:"100%",height:"65vh", display:'flex',justifyContent:"center",alignItems:'center'}}>
       <div style={{ width:"50%",height:"65vh", display:'flex',justifyContent:"center",alignItems:'center'}}>
          {/* <img src='https://cdn.dribbble.com/users/429792/screenshots/3649946/media/bb28392f6e913c06c56495260d0204a6.png' style={{width:'70%', height:'20vh'}}>
          </img> */}
          <h2 style={{color:"grey", fontWeight:'bolder'}}>No Orders</h2>
       </div>
    </div>
      }
    </div>
  )
}

export default OrderDetails
