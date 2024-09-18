import React from 'react'
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'

function Users() {
  
  return (
    <div id='users'>
        <h3 style={{fontWeight:"bolder", margin:"10px"}}>User Details</h3>
      <div style={{width:"90%", margin:"20px"}}>
           <Table variant='dark' className='bg-primary' responsive="sm" border={'bool'} hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>E-Mail</th>
                <th>Address</th>
                
                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                
                
              </tr>
              </tbody>
              </Table>
      </div>
    </div>
  )
}

export default Users
