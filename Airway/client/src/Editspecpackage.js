import React, { useEffect, useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Editspecpackage(){
	const navigate = useNavigate()
	const location = useLocation()
	const [datapackage, setDatapackage] = useState([])
	const [datapackageid,setDatapackageId] = useState([]);
	const [specialization,setSpecialization]=useState('');
	const [price,setPrice]=useState('')
	const [image,setImage]=useState();
	const [imageView, setImageView] = useState("");


	useEffect(()=>{
		fetch('http://localhost:4000/package').then((res)=>res.json())
		.then((result)=>{
		setDatapackage(result)
		// console.log(result);
	
	})
		let params ={
			id:location.state.id
		}
		fetch('http://localhost:4000/editpackagebyid',{
			method:'post',
			headers:{
				Accept:'application/json',
				'Content-Type':'application/json'
			},
			body:JSON.stringify(params)
		}).then((res)=>res.json()).then((result)=>{
			setDatapackageId(result.SelectedPackage)
			setSpecialization(result.Specialization)
			setPrice(result.Price)
			setImage(result.Image)
			setImageView(result.Image);
			// console.log(result)		
		})
	},[location.state.id])

	const handleFormpackageedit = (e) => {
	e.preventDefault();
	let formData = new FormData();
	formData.append('selectpackage', datapackageid);
	formData.append('specialization',specialization);
	formData.append('price', price);
	formData.append('image', image);
	formData.append('id', location.state.id)

	fetch('http://localhost:4000/packageedit', {
		method: 'POST',
		body: formData
	})
	.then((res) => res.json())
	.then((result) => {
		navigate('/package')
	});
	}
	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
		setImageView(URL.createObjectURL(e.target.files[0]));
	  };
	return(
		<>
		<Navbar/>
		<div class="container-fluid">
			<div class="row flex-nowrap" >
				<Sidebar/>
				<div class="col py-3" style={{ backgroundColor: '#e0f4ff' }} >
				<br/><br/>

					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f8f8', padding: '10px' }}>
						<p style={{ fontSize: '34px', margin: '0' }}><i><b>Hi, Welcome Back!</b></i></p>
						<p style={{ fontSize: '18px', margin: '0' }}><b>Table </b>&gt; Special Package</p>
					</div>

					<br /><br />
					<div style={{width:'100%',backgroundColor:'#eeeeee',borderRadius:'10px',margin:'10px'}}>
						<form onSubmit={handleFormpackageedit}  >
						<div style={{ margin:'15px'}}>
							<select name="selectpackage"  style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',marginTop:'20px'}} value={datapackageid} onChange={(e) => setDatapackageId(e.target.value)}>
								<option>--Select_Package--</option>
								{datapackage.map((value,index)=>{
									return(
									<>
									<option value={value._id}>{value.PackageName}</option>
									</>
								)
							})}	
							</select><br /><br />

							<input type="text" name="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder='Enter Specialization' style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',marginBottom:'10px'}}/><br/>

							<input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Price' style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',marginBottom:'10px'}}/><br/>

							{/* <input type="file" name="image"  onChange={handleImageChange} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',marginBottom:'10px'}}/> */}
							<input type="file" name="image" onChange={(e) => {setImage(e.target.files[0]);setImageView(URL.createObjectURL(e.target.files[0]));}}/>
							{/* <img src={imageView} alt="Hii" width="100" height="100" />  */}
							<img src={`http://localhost:4000/public/${imageView}`} alt="Hii" width="100" height="100" />
							{/* <img src={`http://localhost:4000/public/${imageView}` || imageView} alt="Hii" width="100" height="100"/> */}
							{/* {imageView && <img src={`http://localhost:4000/public/${imageView}`} alt="Preview" width="100" height="100" />} */}
							{/* {<img src={imageView && `http://localhost:4000/public/${imageView}`} alt="Preview" width="100" height="100" />} */}
							{/* console.log(image) */}

							{/* {image ? <img src={imageView} alt="Preview" width="100" height="100" />: imageView} */}


							<br /><br />

							<button type="submit" style={{width: '15%',padding: '10px',fontSize: '16px',backgroundColor: '#4CAF50',color: 'white',border: 'none',borderRadius: '5px',cursor: 'pointer'}}>
								Update
							</button>
						</div>
						</form>
					</div>

				</div>

			</div>
		</div>
		
		
		</>
	)
}

export default Editspecpackage