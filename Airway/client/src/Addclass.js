import React, { useState } from "react";
import Navbar from "./Navbar";
import {useNavigate} from "react-router-dom";
import Sidebar from "./Sidebar";


function Addclass(){

	const [className, setClassName] = useState('');
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		let params = {
			classname: className,
		}
		fetch('http://localhost:4000/classinsert', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				"Content-Type": 'application/json'
			},
			body: JSON.stringify(params)
		}).then((res) => res.json()).then((result) => {
			navigate('/class')
		})
	}


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
							<p style={{ fontSize: '18px', margin: '0' }}><b>Table </b>&gt; Class</p>
						</div>

						<br /><br />

						<div style={{ backgroundColor: '#f8f8f8', padding: '10px' }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<h2>Class</h2>
							</div>
							<br/>
							<form onSubmit={handleSubmit} >
								<div style={{ marginBottom: '15px' }}>
									<label name="classname" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
										Class Name
									</label>
									<input type="text" value={className} onChange={(e) => setClassName(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',}}/>
								</div>
								<button type="submit" style={{width: '10%',padding: '10px',fontSize: '16px',backgroundColor: '#4CAF50',color: 'white',border: 'none',borderRadius: '5px',cursor: 'pointer',}}>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		
		</>
	)
}

export default Addclass



