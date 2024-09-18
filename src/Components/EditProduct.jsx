import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { editProduct } from '../Services/appAPI';
import { baseUrl } from '../Services/baseUrl';

function EditProduct({products,display}) {

    const [show, setShow] = useState(false);
    const [token,setToken] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [preview,setPreview] = useState(null)

    useEffect(()=>{
      const userToken = sessionStorage.getItem('token')
      setToken(userToken)
    },[]) 

 

    const [editProducts,setEditProducts] = useState(
      {
        id:products._id,
        pid:products.pid,
        pcategory:products.pcategory,
        pname:products.pname,
        pdescription:products.pdescription,
        pprice:products.pprice,
        pimage:""
      }
    )


    useEffect(()=>{
      if(editProducts.pimage){
        setPreview(URL.createObjectURL(editProducts.pimage))
      }
    },[editProducts.pimage])


    const updateProduct=async(e)=>{
        e.preventDefault()
        const{id,pid,pname,pdescription,pprice,pimage,pcategory}=editProducts
        if(!pid || !id || !pname || !pdescription || !pprice || !pcategory)
        {
          alert("please enter the required data")
        }else{
          const reqBody = new FormData()
          reqBody.append("pid",pid)
          reqBody.append("pname",pname)
          reqBody.append("pdescription",pdescription)
          reqBody.append("pprice",pprice)
          preview?  reqBody.append("pimage",pimage): reqBody.append("pimage",products.pimage)

          reqBody.append("pcategory",pcategory)

          if(token){
            var reqHeader = {
              "Content-Type": "multipart/form-data",
              "Authorization" : `Bearer ${token}`
              
            }
          }

          const result = await editProduct(id,reqBody,reqHeader)
          console.log(result);
          
          if(result.status == 200){
            setEditProducts('')
            alert('product updated successfully')
            setShow(false)
            display()   
          }
          else{
            alert('incorrect data entry')
          }
        }
    }
   

  return (
    <div style={{width:"100%"}}>
        <>
        <Button variant='outline' className='bg-primary m-1'><i class="fa-solid fa-pen-to-square" style={{color: "#FFD43B"}} onClick={handleShow}></i></Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={editProducts?.pid}
          onChange={(e)=>setEditProducts({...editProducts,pid:e.target.value})}

        />

      </InputGroup>
        <InputGroup className="mb-3">
      <Form.Select aria-label="Category" value={editProducts?.pcategory} onChange={(e)=>setEditProducts({...editProducts,pcategory:e.target.value})}>
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
          value={editProducts?.pname}
          onChange={(e)=>setEditProducts({...editProducts,pname:e.target.value})}
        /></InputGroup>
        <InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='Product Description'
          value={editProducts?.pdescription}
          onChange={(e)=>setEditProducts({...editProducts,pdescription:e.target.value})}
        /></InputGroup>
        <InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='Product Price'
          value={editProducts?.pprice}
          onChange={(e)=>setEditProducts({...editProducts,pprice:e.target.value})}
        /></InputGroup>
        <InputGroup className='mb-3'>
       <label>
          <input type="file"  style={{display:'none'}}  onChange={(e)=>setEditProducts({...editProducts,pimage:e.target.files[0]})}/>
          <img src={preview?preview: `${baseUrl}/uploads/${products.pimage}`} alt="" style={{width:"30%"}}/>
       </label>
       </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>updateProduct(e)}>Submit</Button>
        </Modal.Footer>
      </Modal>
     
                </>
    </div>
  )
}

export default EditProduct
