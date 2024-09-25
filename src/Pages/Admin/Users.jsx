import React, { useEffect, useState } from 'react'
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { showUsersApi } from '../../Services/appAPI'
import { baseUrl } from '../../Services/baseUrl'

function Users() {
  
    const [details,setDetails] = useState([])

   useEffect(()=>{
       userData()
   },[])

    const userData = async()=>{
      const admin = JSON.parse(sessionStorage.getItem('user'))
      const token = sessionStorage.getItem('token')
      console.log(admin);
      if(admin.role == 1){
        const user = await showUsersApi()
        if(user.status == 200){
          setDetails(user.data)
        }else{
          alert('No Registered Users')
        }
      }else{
        alert('unauthorized access')
      }
      
      
    }

    console.log(details);
     

  return (
    <div id='users'>
     
        <h3 style={{fontWeight:"bolder", margin:"10px"}}>User Details</h3>
        {
          details.length>0 ?
          details.map((items,index)=>(
          
      <div style={{width:"90%", margin:"20px"}}>
           <Table variant='dark' className='bg-primary' responsive="sm" border={'bool'} hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>E-Mail</th>
                <th>Phone</th>
                
                
                
              </tr>
            </thead>
            <tbody >
           
              <tr key={index}>
              <td style={{width:"30%"}}><img src={items.profilepicture? items.profilepicture :'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="" style={{width:"30%"}}/></td>
                <td>{items.fname}</td>
                <td>{items.lname}</td>
                <td>{items.email}</td>
                <td>{items.phone}</td>   
              </tr>
              </tbody>
              </Table>
      </div>
      )):""
}
    </div>
  )
}

export default Users
