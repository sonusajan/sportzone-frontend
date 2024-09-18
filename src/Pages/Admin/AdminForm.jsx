import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { getProduct, productAPI } from '../../Services/appAPI'

function AdminForm() {
  const [products,setProducts] = useState({
        pid:'',
        pname:'',
        pdescription:'',
        pprice:'',
        pimage:'',
        pcategory:''
  })
  const [preview, setPreview] = useState(null)

  const [token,setToken] = useState('')

  const navigate = useNavigate()

 useEffect(()=>{
  if(products.pimage){
    setPreview(URL.createObjectURL(products.pimage))
  }
 },[products.pimage]) 

  // console.log(products);

  useEffect(()=>{
    const usertoken = sessionStorage.getItem('token')
    setToken(usertoken)
  },[])
  
  const handleAdd = async(e)=>{
    e.preventDefault()
     const{pid,pname,pdescription,pprice,pimage,pcategory}=products
     if(!pid || !pname || !pdescription || !pprice || !pimage || !pcategory){
      alert("please fill all the data")
     }else{
      const reqBody = new FormData()
      reqBody.append("pid",pid)
      reqBody.append("pname",pname)
      reqBody.append("pdescription",pdescription)
      reqBody.append("pprice",pprice)
      reqBody.append("pimage",pimage)
      reqBody.append("pcategory",pcategory)
      
      if(token){
        var reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization" : `Bearer ${token}`
          
        }
      }
    
      const result = await productAPI(reqBody,reqHeader)
      if(result.status==200){
        setProducts(' ')
        alert('product added successfully')
        navigate('/productdetails')
      }
      else{
        alert('incorrect data entry')
      }
      console.log(result);
      
     }
 }





 
  return (
    <div id='adminform'>
      <div style={{width:"50%", marginTop:"20px"}}>
        <InputGroup className='mb-3' style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", fontWeight:"bolder"}}><h3>Add Products</h3></InputGroup>
        <label style={{width:"50%"}}>
          <input type="file"  style={{display:'none'}} onChange={(e)=>setProducts({...products,pimage:e.target.files[0]})}/>
          <img src={preview?preview:'https://haryana.gov.in/wp-content/themes/sdo-theme/images/default/image-gallery.jpg'} alt="image" style={{width:"50%"}}  />
        </label>
      <InputGroup className="mb-3">
      <Form.Select aria-label="Category" value={products.pcategory}
          onChange={(e)=>setProducts({...products,pcategory:e.target.value})}>
      <option hidden>Category</option>
      <option value="All">All</option>
      <option value="Badminton">Badminton</option>
      <option value="BaseBall">BaseBall</option>
      <option value="BasketBall">BasketBall</option>
      <option value="Cricket">Cricket</option>
      <option value="FootBall">FootBall</option>
      <option value="Golf">Golf</option>
      <option value="Hockey">Hockey</option>
      <option value="Table Tennis">Table Tennis</option>
      <option value="Tennis">Tennis</option>
    </Form.Select>
      </InputGroup>
      <InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='Product Id'
          value={products.pid}
          onChange={(e)=>setProducts({...products,pid:e.target.value})}
        /></InputGroup>
       <InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='Product Name'
          value={products.pname}
          onChange={(e)=>setProducts({...products,pname:e.target.value})}
        /></InputGroup>
        <InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='Product Description'
          value={products.pdescription}
          onChange={(e)=>setProducts({...products,pdescription:e.target.value})}
        /></InputGroup>
        <InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='Product Price'
          value={products.pprice}
          onChange={(e)=>setProducts({...products,pprice:e.target.value})}
        /></InputGroup>

        <InputGroup className='mb-3' style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <Button variant='outline' className='bg-primary mb-2 w-50' style={{color:"wheat"}} onClick={(e)=>handleAdd(e)}>Add Product</Button>
        </InputGroup>
        <Link to={'/productdetails'} style={{textDecoration:"none"}}><InputGroup className='mb-3' style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}><Button variant='outline' className='bg-primary w-50' style={{color:"wheat"}} >Show Products</Button></InputGroup></Link>
      </div>
    </div>
  )
}

export default AdminForm
