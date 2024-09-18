import React from 'react'
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'

function Orders() {
  
  return (
    <div id='orderdetails'>
        <h3 style={{fontWeight:"bolder", margin:"10px"}}>Order Details</h3>
      <div style={{width:"90%", margin:"20px"}}>
           <Table variant='dark' className='bg-primary' responsive="sm" border={'bool'} hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Product Name</th>
                <th>User Name</th> 
                <th>E-mail</th>   
                <th>User Address</th>
                <th>Amount Paid</th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td></td>
                
              </tr>
              </tbody>
              </Table>
      </div>
    </div>
  )
}

export default Orders
